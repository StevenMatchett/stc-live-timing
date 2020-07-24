

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Dropdown = ({clazzes,clazz, callback}) => {
  const classes = useStyles();



  return (
      <FormControl className={classes.formControl}>
        <InputLabel>Class</InputLabel>
        <Select value={clazz} onChange={callback}>
            {clazzes.map(cl => {
                return <MenuItem value={cl}>{cl.toUpperCase()}</MenuItem>
            })}
        </Select>
        <FormHelperText>Select view</FormHelperText>
      </FormControl>
  );
};