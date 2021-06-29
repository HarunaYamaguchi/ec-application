import React,{ useState } from 'react';
import { useCallback } from 'react';
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import { signIn } from '../Reducks/users/Operations';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

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
}));

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePage = (path) => history.push(path);
  const classes = useStyles();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[setEmail]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[setPassword]);

  const { register,handleSubmit,formState:{ errors } } = useForm();
  const onSubmit = data => console.log(data);
  
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        ログイン
      </Typography>
      <div className={classes.form} noValidate>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={inputEmail}
            id='mail'
            label='メールアドレス'
            style={{width:300}}
            name='mail'
            {...register('mail',{
              required:'メールアドレスを入力してください',
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
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={inputPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              //e.preventDefault();
              dispatch(signIn(email, password));
            }}
          >
            ログイン
          </Button>
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

    //     ・パスワード<input name="password"
    //     {...register("password",{
    //       id:'password',
    //       required:"パスワードが入力されていません",
    //       minLength: {
    //         value:6,
    //       message:'6文字以上で入力してください'
    //       }
    //     })}
    //       />
    //     {errors.password && errors.password.message}

    //     <input type="submit" 
    //       onClick={() => {
    //         dispatch(signIn(mail,password))}
    //     }
    //       /> 
    // </form>
  // )
}

export default Login;