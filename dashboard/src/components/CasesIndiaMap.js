import React, { Component } from "react";
import ReactDatamaps from "react-datamaps-india";

function get_data(data){
  var state_wise=data;
  var data1=Object.keys(state_wise);
  var s1={}
  for(var i=0;i<data1.length;i++){
      if(data1[i]==="Arunachal Pradesh"){
          s1["Arunanchal Pradesh"]={
            confirmed : state_wise[data1[i]]["confirmed"],
            active : state_wise[data1[i]]["active"],
            recovered:state_wise[data1[i]]["recovered"],
            deceased:state_wise[data1[i]]["deaths"],
            value : state_wise[data1[i]]["active"]
          }

      }
      else if(data1[i]==="Jammu and Kashmir"){
          s1["Jammu & Kashmir"]={
            confirmed : state_wise[data1[i]]["confirmed"],
            active : state_wise[data1[i]]["active"],
            recovered:state_wise[data1[i]]["recovered"],
            deceased:state_wise[data1[i]]["deaths"],
            value : state_wise[data1[i]]["active"]
          }
      }
      else if(data1[i]==="Andaman and Nicobar Islands")
      {
        s1["Andaman & Nicobar Island"]={
          confirmed : state_wise[data1[i]]["confirmed"],
            active : state_wise[data1[i]]["active"],
            recovered:state_wise[data1[i]]["recovered"],
            deceased:state_wise[data1[i]]["deaths"],
            value : state_wise[data1[i]]["active"]
      }
      }
      else if(data1[i]==="Dadra and Nagar Haveli and Daman and Diu")
      {
        s1["Dadara & Nagar Haveli"]={
          confirmed : state_wise[data1[i]]["confirmed"],
            active : state_wise[data1[i]]["active"],
            recovered:state_wise[data1[i]]["recovered"],
            deceased:state_wise[data1[i]]["deaths"],
            value : state_wise[data1[i]]["active"]
      }
      }
      else{
      s1[data1[i]]={
        confirmed : state_wise[data1[i]]["confirmed"],
            active : state_wise[data1[i]]["active"],
            recovered:state_wise[data1[i]]["recovered"],
            deceased:state_wise[data1[i]]["deaths"],
            value : state_wise[data1[i]]["active"]
      }
    }
  }
return s1;
}

export default class CasesIndiaMap extends Component {
  
  
  render() {
    const {...regionData } = get_data(this.props.data);
    return (
      <div className="container">
        <h4>State wise covid data</h4>
        <div
          style={{
            flex: 1,
            display: "inline-block",
            position: "relative",
            width: "100%",
            paddingBottom: "100%",
            verticalAlign: "top",
            overflow: "hidden",
          }}
        >
          <ReactDatamaps
            regionData={regionData}
            mapLayout={{
              startColor: '#FFDAB9',
              endColor: '#FF6347',
              noDataColor: '#f5f5f5',
              borderColor: '#8D8D8D',
              hoverBorderColor: '#8D8D8D',
              hoverColor: 'green'
            }}
            hoverComponent={({ value }) => {
              return (
                <>
                  <p>{value.name}</p>
                  <p>confirmed:{value.confirmed}</p>
                  <p>active:{value.active}</p>
                  <p>recovered:{value.recovered}</p>
                  <p>deceased:{value.deceased}</p>
                </>
              );
            }}
          />
        </div>
        
       </div>
    );
  }
  
}