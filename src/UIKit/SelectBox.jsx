import React from 'react';
import { InputLabel,MenuItem,FormControl } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  formControl:{
    marginBottom: 16,
    minWidth: 128,
    width: '100%'
  }
})

const selectBox = (props) => {
  const classes = useStyles;

  return (
    <FormControl className={classes.formControl}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          required={props.required} value={props.value}
          onChange={(e)=> props.select(e.target.value)}
        >
          {props.options.map((value) => {
            return <MenuItem key={value.id} value={value.id}>{value.name}</MenuItem>
          })}
        </Select>
    </FormControl>
  )
}

export default selectBox;