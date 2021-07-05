import axios from 'axios';
import React from 'react';
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer
} from "recharts";

class Bar_chart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        con:0,
        rec:0,
        dec:0,
         res: [],
         state_val:"",
         day:"",
         month:"",
         year:"",
         days:['01','02','03','04','05','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        years:[20,21,22]
      };
    }
    updateDay(e){
      this.setState({
        day:e.target.value
      })
    }
    updateMonth(e){
      this.setState({
        month:e.target.value
      })
    }
    updateYear(e){
      this.setState({
        year:e.target.value
      })
    }
    updatestate(e){
      this.setState({
        state_val:e.target.value.toLowerCase()
      })
    }
    componentDidMount(){
    axios
    .get("https://api.covid19india.org/states_daily.json")
    .then(response=>{this.setState({
        res:response.data.states_daily
    })
    })
  };
render(){
  var date=""+this.state.day+"-"+this.state.month+"-"+this.state.year;
  var ans=result(this.state.res,this.state.state_val,date);
  const data = [
    { name: "Confirmed", users: ans[0] },
    { name: "Recovered", users: ans[1] },
    { name: "Deceased", users: ans[2] },
  ];
  return (
    <div>
      <div className="container">
        <h4>Covid Report of a Particular Date</h4>
        <div style={{textAlign:"center"}}>
        <label>Select State:</label>
        <select onChange={(e)=>{this.updatestate(e)}} style={{width: "200px"}}>
            <option value="" key="">Select Option</option>
            {Object.keys(this.props.data).map((d) => (
              <option value={this.props.data[`${d}`]['statecode']} key={d}>{d}</option>
            ))}
          </select>
          <br/>

          <label>Select Date:</label>
        <select onChange={(e)=>{this.updateDay(e)}}>
            <option value="" key="">Day</option>
            {this.state.days.map((d) => (
              <option value={d} key={d}>{d}</option>
            ))}
          </select>
          <select onChange={(e)=>{this.updateMonth(e)}}>
            <option value="" key="">Month</option>
            {this.state.months.map((d) => (
              <option value={d} key={d}>{d}</option>
            ))}
          </select>
          <select onChange={(e)=>{this.updateYear(e)}}>
            <option value="" key="">Year</option>
            {this.state.years.map((d) => (
              <option value={d} key={d}>{d}</option>
            ))}
          </select>
          </div>
      </div>
      <div className="App">
      <ResponsiveContainer width="90%" height={300}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users"  fill="turquoise" background={{ fill: "white" }} />
        </BarChart> 
        </ResponsiveContainer>
      </div>
    </div>
  );
};
}
function result(r,state,date){
  var back=[];
  for(let i=0;i<r.length;i++)
  {
     if(r[i]["date"]===date){
       for(const [key, value] of Object.entries(r[i])){
         if(key===state){
           if(r[i]["status"]==="Confirmed"){
           back.push(parseInt(value));
           }
           else if(r[i]["status"]==="Recovered"){
             back.push(parseInt(value));
           }
           else if(r[i]["status"]==="Deceased"){
             back.push(parseInt(value));
           }
         }
       }
     }
 }
 return back;
}
export default Bar_chart;