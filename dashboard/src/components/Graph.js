import axios from 'axios';
import React from 'react';
import {
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Area,
  ComposedChart,
  ResponsiveContainer
} from "recharts";

class Graph extends React.Component {
  constructor(props){
    super(props)
    this.state = {
         res: [],
         state_val:"Telangana",
      };
      this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
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
  var data=result(this.state.res,this.state.state_val);
  return (
    <div className="container">
      <h4>Covid Daily Report of a State</h4>
      <div style={{textAlign:"center"}}>
        <label>Select State:</label>
        <select onChange={this.handleChange} style={{width:"200px"}}>
              <option value="" key="">Select Option</option>
              {Object.keys(this.props.data).map((d) => (
                <option value={this.props.data[`${d}`]['statecode']} key={d}>{d}</option>
              ))}
        </select>
      </div>
      <ResponsiveContainer width="90%" height={300}>
        <ComposedChart data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0,41000]}/>
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Confirmed" stroke="red" fill="aquamarine"  dot={false}/>
              <Area type="monotone" dataKey="Recovered" stroke="black"  fill="aquamarine" dot={false}/> 
              <Area type="monotone" dataKey="Deceased" stroke="yellow" fill="aquamarine" dot={false}/>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
  );
};
}
function result(r,state){
  var back=[];
  for(let i=0;i<r.length;i+=3)
  {
    var dic={};
    dic["name"]=r[i]["date"];
    dic["Confirmed"]=r[i][state];
    dic["Recovered"]=r[i+1][state];
    dic["Deceased"]=r[i+2][state];
    back.push(dic);
  }
  return back;
 }
export default Graph;