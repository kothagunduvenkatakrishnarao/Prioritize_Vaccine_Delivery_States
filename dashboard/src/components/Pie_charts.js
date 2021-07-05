import React, { Component } from 'react'
import { Chart } from "react-google-charts";

export default class Pie_charts extends Component {

  get_data_particular(state,state_data){
    if(state==="") return [];
    var confirmed=state_data[state]["confirmed"];
      return [
          ['Task',state],
          ["active",(state_data[state]["active"]/confirmed)*100],
          ["deceased",(state_data[state]["deaths"]/confirmed)*100],
          ["recovered",(state_data[state]["recovered"]/confirmed)*100]
      ]
  }

    state={
        data:{},
        pie_data:[]
      }
      updatestate(e){
        this.setState({
          pie_data:this.get_data_particular(e.target.value,this.props.data)
        })
      }
    render() {
        var piedata=this.state.pie_data;
        return (
            <div className="container">
              <h3>Piechart Representation</h3>
              <br></br>
                <select onChange={(e)=>{this.updatestate(e)}} style={{width: "200px"}}>
                  <option value="" key="">Select Option</option>
                  {Object.keys(this.props.data).map((d) => (
                    <option value={d} key={d}>{d}</option>
                  ))}
                </select>
                <Chart
                      width={"95%"}
                      height={'95%'}
                      chartType="PieChart"
                      loader={<div>Loading Chart</div>}
                      data={piedata}
                      options={{
                        layout: {
                          margin:{
                            left:'400px'
                          }
                        },
                        legend:{position:'none'},
                          pieSliceText: 'label',
                          slices: {
                          0: { 
                            color: 'red',
                              offset: 0.3 },
                          1: { 
                            
                              color:'green',
                              offset: 0.3 },
                          2: { 
                            
                             color:'yellow',
                            offset: 0.4 },
                          },
                          is3D:true,
                          backgroundColor:'none'   
                          
                      }}
                  />
            </div>
        )
    }
}
