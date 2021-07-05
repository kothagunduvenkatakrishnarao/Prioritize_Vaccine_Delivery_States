import React from 'react';
import '../App.css';

class TotalCases extends React.Component {
	
	render(){
		  var total_cases=this.props.data1;
          return(
              <div className="container">
				  <h4>Total covid cases data</h4>
				  <div className="row">
					<div className="col totalcases">
							<h4>Active<span>&nbsp; &nbsp;</span>Cases</h4>
							<h5>{total_cases["active"]}</h5>
					</div>
					<div className="col totalcases">
							<h4> Confirmed Cases</h4>
							<h5>{total_cases["confirmed"]}</h5>
					</div>
					<div className="col totalcases">
							<h4>Deceased Cases</h4>
							<h5>{total_cases["deaths"]}</h5>
					</div>
					<div className="col totalcases">
							<h4>Recovered Cases</h4>
							<h5>{total_cases["recovered"]}</h5>
					</div>
				</div>
			  </div>
          
		);
      };
	

}


export default TotalCases;