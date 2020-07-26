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

function createData(name, number, time, clazz, rawTimes, car, fastestIndex) {
  return { name, number, time, clazz, rawTimes, car, fastestIndex};
}

export function AutoXTable(props) {
    const { data } = props
    const [, dispatch] = useStateValue();
    const rows = data.map(row => {
        return createData(row.name, row.number, row.time, row.clazz, row.rawTimes, row.car, row.fastestIndex)
    })

    const classes = useStyles();
    let position = 0;

    return (
        <React.Fragment>    
            <TableContainer component={Paper}>
                <div>
                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 25 }} align="left">Position</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="left">Number</TableCell>
                                <TableCell align="left">Best</TableCell>
                                <TableCell align="left">1</TableCell>
                                <TableCell align="left">2</TableCell>
                                <TableCell align="left">3</TableCell>
                                <TableCell align="left">4</TableCell>
                                <TableCell align="left">5</TableCell>
                                <TableCell align="left">6</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row,index) => {
                                position++;
                                return (
                                <TableRow key={row.name} style ={ index % 2 === 0 ? { background : "#f2f2f2" }: {}    }>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell onClick={()=>dispatch({type: "SELECTED_DRIVER", data: row})} component="th" scope="row">
                                        <div style={{color:"blue", cursor: "pointer"}}>{row.name}</div>
                                    </TableCell>
                                    <TableCell align="left">{row.number + " " + row.clazz.toUpperCase()}</TableCell>
                                    <TableCell align="left">{row.time}</TableCell>
                                    { [0,1,2,3,4,5].map(index => {
                                        if (row.fastestIndex === index){
                                            return <TableCell align="left" style={{backgroundColor:"lightgreen"}}>{row.rawTimes.length > index ? row.rawTimes[index] : ""}</TableCell>
                                        } else {
                                            return <TableCell align="left">{row.rawTimes.length > index ? row.rawTimes[index] : ""}</TableCell>
                                        }

                                    })}
                                
                                    
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
