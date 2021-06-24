import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Search = () =>  {
  const [text, setText] = useState('')
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="search"></IconButton>
      <InputBase
        className={classes.input}
        placeholder="商品を検索"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>

      <Divider className={classes.divider} orientation="vertical" />
      <HighlightOffRoundedIcon className={classes.iconButton} 
        aria-label="directions"
        onClick = {() => {setText('')}}
        >
        <DirectionsIcon />
      </HighlightOffRoundedIcon>
    </Paper>
  );
}

export default Search;