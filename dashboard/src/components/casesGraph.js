import React from 'react';
import '../App.css';
import {
	BarChart,
	XAxis,
	YAxis,
	Tooltip,
	Bar,
	ResponsiveContainer
} from "recharts";

class CasesGraph extends React.Component {
     render(){
		var state_wise=JSON.parse(localStorage.getItem('data'));
		var data1=Object.keys(state_wise);
		var state_active=[],state_confirmed=[],
		state_deaths=[],
		state_recovered=[],state_name=[];
		for(var i=0;i<data1.length;i++){
			state_active.push(state_wise[data1[i]]["active"]);
			state_confirmed.push(state_wise[data1[i]]["confirmed"]);
			state_deaths.push(state_wise[data1[i]]["deaths"]);
			state_recovered.push(state_wise[data1[i]]["recovered"]);
			state_name.push(state_wise[data1[i]]["statecode"]);

	 }
		var result =  state_active.reduce(function(result, field, index) {
			result[state_name[index]] = field;
			return result;
		  }, {});
		const active_data=Object.keys(result).map(key =>{
			return{
				key,
				value:result[key]
			};
		})
		var result1 =  state_confirmed.reduce(function(result1, field, index) {
			result1[state_name[index]] = field;
			return result1;
		  }, {});
		const confirmed_data=Object.keys(result1).map(key =>{
			return{
				key,
				value:result1[key]
			};
		})
		var result2 =  state_deaths.reduce(function(result2, field, index) {
			result2[state_name[index]] = field;
			return result2;
		  }, {});
		const deadth_data=Object.keys(result2).map(key =>{
			return{
				key,
				value:result2[key]
			};
		})
		var result3 =  state_recovered.reduce(function(result3, field, index) {
			result3[state_name[index]] = field;
			return result3;
		  }, {});
		const recovered_data=Object.keys(result3).map(key =>{
			return{
				key,
				value:result3[key]
			};
		})
		

		return(
            <div className="App">
				<div className="container">
				
			<div className ="confirmed">
				<h4>Total confirmed cases in each state</h4>
				<ResponsiveContainer width="85%" height={200}>
				<BarChart  data={confirmed_data}>
					
					<XAxis dataKey="key" />
					<YAxis domain={[0,7000000]}/>
					<Tooltip />
					<Bar dataKey="value" fill="#f8789a" />
					
				</BarChart>
				</ResponsiveContainer>
			</div>
			<div className ="active">
				<h4>Total active cases in each state</h4>
				<ResponsiveContainer width="85%" height={200}>
					<BarChart data={active_data}>
						
						<XAxis dataKey="key"/>
						<YAxis domain={[0,300000]}/>
						<Tooltip />
						<Bar dataKey="value" fill="#f8789a" />
						
					</BarChart>
				</ResponsiveContainer>
			</div>
			</div>
            <div className="container2">
			<div className ="deadth">
				<h4>Total death cases in each state</h4>
				<ResponsiveContainer width="85%" height={200}>
					<BarChart data={deadth_data}>
						
						<XAxis dataKey="key" />
						<YAxis domain={[0,100000]}/>
						<Tooltip />
						<Bar dataKey="value" fill="#f8789a" />
						
					</BarChart>
				</ResponsiveContainer>
			</div>
			<div className ="recovered">
				<h4>Total recovered cases in each state</h4>
				<ResponsiveContainer width="85%" height={200}>
					<BarChart data={recovered_data}>
						
						<XAxis dataKey="key" />
						<YAxis domain={[0,6000000]}/>
						<Tooltip />
						<Bar dataKey="value" fill="#f8789a" />
						
					</BarChart>
				</ResponsiveContainer>
			</div>
           </div>
        </div>
			);
	}

  

}


export default CasesGraph;
