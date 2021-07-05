import React,{ Component }from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Loading from './Loading';

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default class PrioritizeTable extends Component {
   
  state={
    tabledata:undefined,
  }

  componentDidMount(){
    var data;
    var tabledata;
    axios.get('http://127.0.0.1:8000/rank/').then(response=>{
      data=response.data;
    }).then(()=>
    {
      this.get_data(data,this.props.data);
    })
  }
  createData(name,code,active,confirmed,death_rate,recovered) {
    return {name,code,active,confirmed,death_rate,recovered};
  }
  get_data(data,state_wise_data){
    var state_wise=state_wise_data;
    var data1=Object.keys(state_wise);
    var tabledata=[];
    for(var i=0;i<5;i++){
      for(var j=0;j<data1.length;j++){
            if(data[i].state===data1[j]){
              var deadth_rate=(state_wise[data1[j]]["deaths"]/state_wise[data1[j]]["confirmed"])*100;
          tabledata.push(this.createData(
              data[i].state,
              state_wise[data1[j]]["statecode"],
              state_wise[data1[j]]["active"],
              state_wise[data1[j]]["confirmed"],
              parseFloat(deadth_rate).toFixed(2),
              state_wise[data1[j]]["recovered"]
  
          )); 
          }
        }
      }
      this.setState({tabledata});
  }
  
  render(){
  return (
    <div className="container">
    <h4>Top 5 prioritized states for Vaccine Delivery</h4>
    {
      this.state.tabledata===undefined ?
      <Loading/>
      : 
      <>
        <TableContainer component={Paper}>
        <Table className="table"  aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>state Name</StyledTableCell>
              <StyledTableCell align="right">State Code</StyledTableCell>
              <StyledTableCell align="right">Active Cases</StyledTableCell>
              <StyledTableCell align="right">Confirmed Cases</StyledTableCell>
              <StyledTableCell align="right">Recovered</StyledTableCell>
              <StyledTableCell align="right">Death_Rate</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {this.state.tabledata.map((row) => (
              <StyledTableRow   key={row.name}>
                <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.code}</StyledTableCell>
                <StyledTableCell align="right">{row.active}</StyledTableCell>
                <StyledTableCell align="right">{row.confirmed}</StyledTableCell>
                <StyledTableCell align="right">{row.recovered}</StyledTableCell>
                <StyledTableCell align="right">{row.death_rate}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    }
    
    </div>
  );
  }
}

    

