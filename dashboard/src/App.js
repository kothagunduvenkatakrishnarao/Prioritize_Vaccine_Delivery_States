import React  from 'react';
import './App.css';
import TotalCases from './components/TotalCases';
// // import CasesGraph from './components/casesGraph';
import Bar_chart from './components/Bar_chart';
import Graph from './components/Graph';
import Pie_charts from './components/Pie_charts';
import  CasesIndiaMap from './components/CasesIndiaMap';
// import Loading from './components/Loading';
import axios from 'axios';
import PrioritizeTable from './components/PrioritizeTable'
import CumulativeData from './components/CumulativeData';
import { Spinner } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data2:{},
      states:[],
      total_values:{},
      istrue:false,
    }
}
  

componentDidMount(){  
    var options = {
    method: 'GET',
    url : 'https://corona-virus-world-and-india-data.p.rapidapi.com/api_india',
      headers: {
      'x-rapidapi-key': 'b91da9e430mshc4ca789f0b44490p139e12jsnaf65caf02492',
      'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com',
      Accept: "application/json"
      }
        
    }
      axios.request(options).then(response=>{
            this.setState({
              states:Object.keys(response.data.state_wise),
                data2:response.data.state_wise,
                total_values:response.data.total_values,
                istrue:true,
              })
      })
    }
  render(){
    return (
      <div className="main-container">
         
        {this.state.istrue===false ? 
        <div>
          <h3>Loading</h3>
          <Spinner animation="grow" size="sm" />
          <Spinner animation="grow" size="sm" />
        </div>
        : 
          <>
          <h1 style={{textAlign:"center"}}>PRIORITIZE VACCINE DELIVERY</h1> 
          <TotalCases data={this.state.data2} data1={this.state.total_values}/>
          <hr></hr>
          <CasesIndiaMap data={this.state.data2} data1={this.state.total_values} />
          <hr></hr>
          <PrioritizeTable data={this.state.data2} data1={this.state.total_values}/>
          <hr></hr>
          <Pie_charts data={this.state.data2} data1={this.state.total_values}/>
          <hr></hr>
          {/* <CasesGraph/> */}
          <Bar_chart data={this.state.data2} data1={this.state.total_values}/>
          <hr></hr>
          <Graph data={this.state.data2} data1={this.state.total_values}/>
          <hr></hr>
          <CumulativeData data={this.state.data2} data1={this.state.total_values}/>
          </>
        }
      </div>
    );
  }
}

export default App;
