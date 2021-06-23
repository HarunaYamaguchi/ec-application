import React,{useCallback,useState} from "react";
// import TextInput from "../UIKit/textInput";
import { useForm,Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { signUp } from "../Reducks/users/Operations";
import { useDispatch } from "react-redux";

const SignUp  = () => {

  // const { register, handleSubmit, errors} = useForm();
  const { handleSubmit} = useForm();
  const onSubmit = data => console.log(data);
  const dispatch = useDispatch();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      <h2>アカウント登録</h2>
      <TextField
        label={'ユーザー名'}
        type={'text'}
        name={'username'}
        fullWidth={true} 
        margin="normal"
        multiline={false} required={true}
        value={username}  onChange={inputUserName}
        // inputRef={register({
        //   required:'入力をしてください',
        //   mixLength: {
        //     value:15,
        //     message: '15文字以内で入力してください'
        //   }
        // })}
        // error={Boolean(errors.username)}
        // helperText={errors.username && 'ユーザー名を入力してください'}
       />
{/* 
      <TextField
        label="タイトル(必須)"
        type="text"
        name="title"
        fullWidth
        margin="normal"
        inputRef={register({ required: true, maxLength: 20 })}
        error={Boolean(errors.title)}
        helperText={errors.title && "タイトルは20文字以内にして下さい。"}
      />  */}

      <TextField
        fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
        value={email} type={'email'} onChange={inputEmail}
       />

      <TextField
        fullWidth={true} label={'パスワード'} multiline={false} required={true}
        value={password} type={'password'} onChange={inputPassWord}
       />

      <TextField
        fullWidth={true} label={'パスワード確認用'} multiline={false} required={true}
        value={confirmPassword} type={'password'} onChange={inputConfirmPassword}
       />

         <div>
         <button type="submit" onClick={() => dispatch(signUp(username,email,password,confirmPassword))}>アカウント登録</button>
       </div>
    </form>
  )
}

export default SignUp;