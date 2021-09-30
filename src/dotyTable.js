import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useStateValue } from './context/context';

const useStyles = makeStyles({
    table: {
      minWidth: 500, 
    },
    height: "35px"
  });

function createData(name, sum, low, current) {
  return { name, sum, low, current};
}

export function DotyTable(props) {
    let { doty } = props


    let rows = doty.map(row => {
        return createData( row.name, row.score, row.low, row.current )
    })

    const classes = useStyles();
    let position = 0;

    return (
        <React.Fragment>    
            <TableContainer component={Paper}>
                <div>
                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead>
                            <TableRow style={{ background : "gray"}}>
                                <TableCell style={{width:"5%", color:"white" }} align="left">Place</TableCell>
                                <TableCell style={{ width:"20%", color : "white"}} >Name</TableCell>
                                <TableCell style={{ width:"20%",color : "white"}} align="left">Score</TableCell>
                                <TableCell style={{ width:"20%",color : "white"}} >Lowest Event</TableCell>
                                <TableCell style={{ width:"20%",color : "white"}} >Average Event</TableCell>
                                <TableCell style={{ width:"20%",color : "white"}} >Current Event</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                position++;
                                return (
                                <TableRow style ={ index % 2 ? { background : "#f2f2f2" }: {}    }>
                                    <TableCell style={{width:"5%"}}  align="left">{position}</TableCell>
                                    <TableCell style={{width:"20%"}} component="th" scope="row"><div>{row.name}</div></TableCell>
                                    <TableCell style={{width:"20%"}} align="left">{row.sum.toFixed(2)}</TableCell>
                                    <TableCell style={{width:"20%"}} align="left">{row.low.toFixed(2)}</TableCell>
                                    <TableCell style={{width:"20%"}} align="left">{(row.sum/6).toFixed(2)}</TableCell>
                                    <TableCell style={{width:"20%"}} align="left">{row.current ? row.current.toFixed(2) : ""}</TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
