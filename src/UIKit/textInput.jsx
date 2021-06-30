import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
    return (
      <TextField 
        variant="outlined"
        fullWidth={props.fullWidth}
        label={props.label}
        required={props.required}
        value={props.value}
        type={props.type}
      />
    )
}
export default TextInput;