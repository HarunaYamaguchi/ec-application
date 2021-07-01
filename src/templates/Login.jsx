import React from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import RegisterButton  from '../UIKit/Button';
import { Link } from 'react-router-dom';
import {auth,db} from '../firebase/index'
import { push } from 'connected-react-router';
import { signInAction } from "../Reducks/users/Actions";
import { TextField} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    alignItems: 'center',
    padding: '30px auto'
  }
}));

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePage = (path) => history.push(path);
  const classes = useStyles();

  const { register, handleSubmit, formState:{ errors } } = useForm();

  const onSubmit = (async(data) => {
      auth.signInWithEmailAndPassword(data.email, data.password)
        .then((result) => {
          const userState = result.user;
          const userId = userState.uid;

          if(userState) {
            db.collection('users').doc(userId).collection('userInfo').get()
            .then((querySnapshot) => {
              querySnapshot.forEach(() => {
                console.log(data);

                dispatch(signInAction({
                  isSignedIn: true,
                  uid: userId,
                  username: data.username,
                }));

                console.log(data);
                dispatch(push('/'));
                window.location.reload();
              });
            });
          }
        });
  });
  
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        ログイン
      </Typography>
      <div className={classes.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
           variant="outlined"
            margin="normal"
            fullWidth
            label='メールアドレス'
            type='text'
            name='email'
            id='email'
            {...register('email',{
              required:'メールアドレスが入力されていません',
              pattern: {
                value:/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message:'メールアドレスを正しく入力してください'
              }
            })}
            helperText={errors.mail && errors.mail.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            {...register("password",{
              id:'password',
              required:"パスワードが入力されていません",
              minLength: {
                value:6,
                message:'6文字以上で入力してください'
              }
            })}
            helperText={errors.password && errors.password.message}    
          />
          <RegisterButton label={'ログイン'} className={classes.button}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
      <Link to="/signup"
        onClick={() => { handlePage('/signup'); }}
      >
        ユーザー登録がまだの方はこちら
      </Link>
    </div>
  </Container>
);
}

export default Login;