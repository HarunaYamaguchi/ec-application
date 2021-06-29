import React,{useCallback,useState} from "react";
import TextInput from "../UIKit/textInput";
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { signUp } from "../Reducks/users/Operations";
import { useDispatch } from "react-redux";
import {push} from 'connected-react-router'
import RegisterButton from "../UIKit/Button";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const SignUp  = () => {

  const { register, handleSubmit, errors} = useForm();
  const onSubmit = data => console.log(data);
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const useStyles = makeStyles((theme) => ({
  center: {
    margin: '0 auto',
    align: 'center',
   },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

  const inputUserName = useCallback((e) => {
    setUserName(e.target.value)
  },[setUserName])

  const inputEmail = useCallback((e) => {
    setEmail(e.target.value)
  },[setEmail])

  const inputPassWord = useCallback((e) => {
    setPassWord(e.target.value)
  },[setPassWord])

  const inputConfirmPassword = useCallback((e) => {
    setConfirmPassword(e.target.value)
  },[setConfirmPassword])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 align="center">アカウント登録</h2>
      <TextField
        fullWidth={true}
        label={'ユーザー名'}
        type={'text'}
        name={'username'}
        margin="normal"
        multiline={false} required={true}
        value={username}  onChange={inputUserName}

       />
       
      <TextInput variant="outlined"
        fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
        margin="normal" value={email} type={'email'} onChange={inputEmail}
       />

      <TextInput variant="outlined"
        fullWidth={true} label={'パスワード'} multiline={false} required={true}
        margin="normal" value={password} type={'password'} onChange={inputPassWord}
       />

      <TextInput variant="outlined"
        fullWidth={true} label={'パスワード確認用'} multiline={false} required={true}
        margin="normal" value={confirmPassword} type={'password'} onChange={inputConfirmPassword}
       />

         <div>
            <RegisterButton align="center" label={'アカウント登録'} 
              onClick={() => {dispatch(signUp(username,email,password,confirmPassword))}}>
            </RegisterButton>
         </div>
         <div>
            <Link to='/login' onClick={() => dispatch(push('/login'))}>
              アカウントをお持ちの方はこちら
            </Link>
         </div>
    </form>
  )
}

export default SignUp;