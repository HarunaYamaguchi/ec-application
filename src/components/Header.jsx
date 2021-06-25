import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import ShopIcon from '@material-ui/icons/Shop';
import { useDispatch,useSelector } from 'react-redux';
import { getUserId, getUserName } from '../Reducks/users/Selectors';
import { signOut } from '../Reducks/users/Operations';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuBar: {
    backgroundColor: "pink",
    color: "white",
  },
  title: {
    flexGrow: 1,
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 20,
  },
  name:{
    flexGrow: 1,
    fontSize: 14,
    textAlign:'right',
    marginRight: 20,
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%' 
  },
  IconButton: {
    margin: '0 0 0 auto'
  }
}));

const Header = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state)
  const history = useHistory();
  const handleLink = (path) => history.push(path);
  const dispatch = useDispatch(); 

  const username = getUserName(selector);
  const uid = getUserId(selector);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography variant="h6" className={classes.title}>
              Beauty
            </Typography>
          </Link>
            <Typography variant="h6" className={classes.name}>
              {username}さん
            </Typography>
            <div>
              {/* {!uid ? (
                ''
              ):( */}
                <IconButton aria-label="shopping-cart" color="inherit"
                onClick={() => {handleLink('/cartList')}}
                >
                <ShoppingCartRoundedIcon />
                </IconButton>
              {/* )}
              {!uid ? (
                ''
              ):( */}
                <IconButton aria-label="shopping-cart" color="inherit"
                onClick={() => {handleLink('/orderLog')}}
                >
              <ShopIcon/>
                </IconButton>
              {/* )} */}
            </div>
            {/* {!uid ?  ( */}
              <div>
                <Button variant="outlined" color="secondary"
                  onClick={()=>{handleLink('/login')}}>
                  ログイン
                </Button>
              </div>
              {/* / ):( */}
              <div>
                <Button variant="outlined"
                  onClick={() => dispatch(signOut())}>
                  ログアウト
                </Button>
              </div>
             {/* )} */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;