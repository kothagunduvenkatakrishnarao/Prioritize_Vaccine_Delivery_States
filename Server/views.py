from django.shortcuts import render,redirect
from rest_framework import viewsets
from .serializers import RankingSerializer
from .models import Ranking
import requests
import json
import pandas as pd
import numpy as np
import csv
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn import preprocessing
from sklearn.decomposition import PCA
from datetime import date
from datetime import timedelta


class RankingViewSet(viewsets.ModelViewSet):
    queryset = Ranking.objects.only("state")
    serializer_class = RankingSerializer

    def _get_data(self):
        print("fetching ...")
        url="https://corona-virus-world-and-india-data.p.rapidapi.com/api_india"
        headers = {
            'x-rapidapi-key': "6537bb5104mshccb9d037fdc3307p120e21jsn35631377a201",
            'x-rapidapi-host': "corona-virus-world-and-india-data.p.rapidapi.com"
        }
        response=requests.request("GET",url,headers=headers)
        try:
            response.raise_for_status()
            json_data=response.json()
            return json_data
        except:
            print("error occured in data fetching..")
            return None

    def _create_data(self):
        json_data=self._get_data()
        if json_data is not None:
            try:
                json_prety=json.dumps(json_data, sort_keys=True, indent=4)
                x=json.loads(json_prety)
                d1=dict(x["state_wise"])
                with open("data.csv", "w+", newline="") as outfile:
                    writer = csv.writer(outfile)
                    writer.writerow(["State","Active","Confirmed","Deceased","Recovered","State-Code"])
                    for j in d1:
                        if(d1[j].get('statecode') not in ['DD','LA','TT','UN','LD']):
                            writer.writerow([d1[j].get("state"),d1[j].get("active"),d1[j].get("confirmed"),d1[j].get("deaths"),d1[j].get("recovered"),d1[j].get("statecode")])
                try:
                    df=pd.read_csv('data.csv')
                except:
                    print("file creation error")
            except:
                print('error occured in create_data')
                pass
    
    def _create_full_data(self):
        self._create_data()
        try:
            df2=pd.read_csv('data.csv')
            today = date.today()
            yesterday = today - timedelta(days = 1)
            d3= yesterday.strftime("%d/%m/%Y")
            dataset=pd.read_csv("http://api.covid19india.org/csv/latest/vaccine_doses_statewise_v2.csv")
            df = dataset[dataset['Vaccinated As of'] == d3]
            temp1=df.drop(df[df['State'] == 'Miscellaneous'].index)
            temp2=temp1.drop(temp1[temp1['State'] == 'Total'].index)
            temp2.drop(['Vaccinated As of','First Dose Administered','Total Doses Administered'],axis='columns',inplace=True)
            data = pd.merge(df2,temp2,on =['State'])
            data.rename(columns = {'Second Dose Administered':'Vaccinated'}, inplace = True)
            print(data)
            return data
        except:
            print('Vaccinated error')

    def _preprocess_data(self):
        df2=self._create_full_data()
        try:
            df1=pd.read_csv('State_data.csv')
            df2['Population_density']=df1['Population']/df1['Area']
            df1.drop(['Code'], axis='columns', inplace=True)
            data = pd.merge(df2,df1,on = ['State'])
            data['Death_Rate']=(data['Deceased']/data['Confirmed'])*100
            data['Unvaccinated']=data['Population']-data['Vaccinated']
            print(data)
            for index, row in data.iterrows():
                if(data.at[index,'Unvaccinated']<0):
                    data.at[index, 'Unvaccinated'] = row['Population']-row['Active']
            print(data)
            return data
        except:
            print("error occured in Preprocess_data")

    
    def Ml_Model(self):
        data=self._preprocess_data()
        features = data[['Active','Death_Rate','Population_density','All_health_workers_percent','Senior_citizen','Children','Unvaccinated']]
        x = np.array(features).reshape(-1,7)
        x= preprocessing.StandardScaler().fit_transform(x)
        pca = PCA(n_components=4)
        pca.fit(x)
        pca_scale = pca.transform(x)

        Score = []
        labels=[]

        for no_of_clusters in range(2,34):
            KMean = KMeans(n_clusters=no_of_clusters)
            KMean.fit(pca_scale)
            label = KMean.predict(pca_scale)
            labels.append(label)
            silhouette = silhouette_score(pca_scale,label)
            Score.append(silhouette)

        Score_sort = sorted(Score)
        index = Score.index(Score_sort[len(Score_sort)-1])
        data['Clusters'] = pd.Series(labels[index], index=data.index)
        no_of_clusters = len(data.Clusters.unique())

        S = []
        Repr = []
        data['Batch_no']= ''
        data['Further_percentage_no']=''
        for i in range(no_of_clusters):
            df = data[data['Clusters']==i]
            df_mean = df[['Active','Death_Rate','Population_density','All_health_workers_percent','Senior_citizen','Children','Unvaccinated']]
            df_mean = df_mean.mean(axis=0)
            x = np.array(df_mean).reshape(-1,7)
            Repr.append(x)

        x = np.concatenate(Repr,axis=0)
        x = preprocessing.MinMaxScaler().fit_transform(x)
        for i in range(no_of_clusters):
            S.append(0.25*(x[i][0])+0.25*(x[i][1])+0.10*(x[i][2])+0.10*(x[i][3])+0.12*(x[i][4])+0.13*(x[i][5])+0.5*(x[i][6]))
        sort_S = sorted(S)
        for i in range(no_of_clusters):
            data.loc[data['Clusters'] == S.index(sort_S[i]), 'Batch_no'] = no_of_clusters-i
        data.drop(['Clusters'], axis='columns', inplace=True)
        frames=[0]*no_of_clusters
        for i in range(1,no_of_clusters+1):
            df = data[data['Batch_no']==i]
        
            if df.shape[0]<2:
                df['Further_percentage_no']= 100
                frames[i-1] = df
                continue

            x = df[['Active','Death_Rate','Population_density','All_health_workers_percent','Senior_citizen','Children','Unvaccinated']]
            x = np.array(x).reshape(-1,7)
            x = preprocessing.MinMaxScaler().fit_transform(x)

            S = []
            for j in range(df.shape[0]):
                S.append(0.25*(x[j][0])+0.25*(x[j][1])+0.10*(x[j][2])+0.10*(x[j][3])+0.12*(x[j][4])+0.13*(x[j][5])+0.5*(x[j][6]))
            j=0
            for index in df.index:
                df.at[index, 'Further_percentage_no'] = (S[j]/sum(S))*100
                j=j+1
                        
            frames[i-1] = df
        data = pd.concat(frames)
        if(self._save_data(data)):
            print('Data updated Successfully')
            pass
        else:
            print('data updation failed')
            self.Ml_Model()

    
    def _save_data(self,data):
        try:
            Ranking.objects.all().delete()
            for index, row in data.iterrows():
                r=Ranking()
                r.state=row['State']
                r.stateCode=row['State-Code']
                r.rank=row['Batch_no']
                r.save()
            return True
        except:
            print('Unable to save data')
            return False
