import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
}));

export default function OutlinedTextFields(props) {
  const classes = useStyles();
  console.log(props);
  if (props.multiline) {
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="standard-multiline-flexible"
          error={props.error}
          helperText={props.helperText}
          label={props.name}
          className={classes.textField}
          multiline
          rowsMax="4"
          value={props.value}
          onChange={props.handleChange(props.name)}
          variant="outlined"
          size='small'
          margin="normal"
        />
      </form>
    );
  } else {
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-name"
          label={props.name}
          error={props.error}
          helperText={props.helperText}
          className={classes.textField}
          value={props.value}
          onChange={props.handleChange(props.name)}
          margin="normal"
          variant="outlined"
          size='small'
        />
      </form>
    );
  }
}