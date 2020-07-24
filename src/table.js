import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    maxWidth: 500,
    width: 500
    
  },
  height: "35px"
});

function createData(name, number, time, clazz) {
  return { name, number, time, clazz };
}



export function AutoXTable({data, name}) {

    const rows = data.map(row => {
        return createData(row.name, row.number, row.time, row.clazz)
    })

    const classes = useStyles();
    let position = 0;

    return (
        <React.Fragment>    
            <TableContainer component={Paper}>
                <div style={{ overflow: 'auto', height: '350px', borderStyle: "solid" }}>
                    <h2 style={{ marginLeft: "15px" }}>{name.toUpperCase()}</h2>
                    <Table className={classes.table} aria-label="simple table" style={{tableLayout: 'fixed'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Position</TableCell>
                                <TableCell align="left">Number</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                position++;
                                return (
                                <TableRow key={row.name}>
                                    <TableCell align="left">{position}</TableCell>
                                    <TableCell align="left">{row.number + " " + row.clazz.toUpperCase()}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.time}</TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
        </React.Fragment>
    );
}
