import axios from 'axios';
import React from 'react';
import {
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  ComposedChart
} from "recharts";

class CumulativeData extends React.Component {
  constructor(props){
    super(props)
    this.state = {
         res: [],
         state_val:"",
         data:{}
      };
      this.updatestate=this.updatestate.bind(this);
    }
    updatestate(e){
      this.setState({
        // state:e.target.state,
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
      <h4>Cumulative Covid Report</h4>
      <div style={{textAlign:"center"}}>
        <label>Select State:</label>
        <select onChange={this.updatestate} style={{width:"200px"}}>
              <option value="" key="">Select Option</option>
              {Object.keys(this.props.data).map((d) => (
                <option value={this.props.data[`${d}`]['statecode']} key={d}>{d}</option>
              ))}
        </select>
      </div>
      <div className="App">
      <ResponsiveContainer width="90%" height={300}>
      <ComposedChart data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0,25000]}/>
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Confirmed" stroke="red" fill="aquamarine" dot={false}/>
              <Area type="monotone" dataKey="Recovered" stroke="orange" fill="aquamarine" dot={false}/> 
              <Area type="monotone" dataKey="Deceased" stroke="purple"  fill="aquamarine" dot={false}/>
              <Area type="monotone" dataKey="Active" stroke="black" fill="aquamarine" dot={false}/>
        </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
}
function result(r,state){
  var back=[];
  var conc=0;var recc=0;var decc=0;var act=0;
  var k=0;
  for(let i=0;i<r.length;i+=3)
  {
    var dic={};
    dic["name"]=r[i]["date"];
    dic[r[i]["date"]]=k
    k=k+1;
    for (let j=0;j<r.length;j+=3)
    {
      if(dic[r[j]["date"]]<=dic[r[i]["date"]])
      {
          conc=conc+parseInt(r[j][state]);
          recc=recc+parseInt(r[j+1][state]);
          decc=decc+parseInt(r[j+2][state]);
      }
    }
    dic["Confirmed"]=conc;
    dic["Recovered"]=recc;
    dic["Deceased"]=decc;
    act=conc-recc-decc;
    dic["Active"]=act;
    back.push(dic);
  }
  return back;
 }
export default CumulativeData;