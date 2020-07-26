import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStateValue } from './context/context'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Dropdown = ({clazzes,clazz}) => {
  const classes = useStyles();

  const classNames = ["PAX", "RAW", ...Object.keys(clazzes)];
  const [{dropdown}, dispatch] = useStateValue();



  return (
      <FormControl className={classes.formControl}>
        <InputLabel>Class</InputLabel>
        <Select value={dropdown} onChange={(data,a)=>{dispatch({type:"UPDATE_DROPDOWN", data:data.target.value})}}>
            {classNames.map(cl => {
                console.log(cl)
                return <MenuItem value={cl}>{cl.toUpperCase()}</MenuItem>
            })}
        </Select>
      </FormControl>
  );
};