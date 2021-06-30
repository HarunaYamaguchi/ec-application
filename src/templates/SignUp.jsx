import React from "react";
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import RegisterButton from "../UIKit/Button";
import { Link } from 'react-router-dom';
import {auth,db,FirebaseTimestamp} from '../firebase/index';
import { signUpAction } from "../Reducks/users/Actions";
import { useDispatch } from "react-redux";
import { push } from 'connected-react-router';

const SignUp  = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePage = (path) => history.push(path);

  const { register, handleSubmit, formState:{errors}} = useForm();

  const onSubmit = (async(data) => {
    console.log(data);

    auth.createUserWithEmailAndPassword(data.email, data.password, data.username)
       .then((result) => {
        const userState = result.user;
        const uid = userState.uid

         if(userState) {
           const timestamp = FirebaseTimestamp.now();
           
           const userInitialData = {
             created_at: timestamp,
             email: data.email,
             uid: uid,
             updated_at: timestamp,
             username: data.username,
             password: data.password
            }

            db.collection(`users/${uid}/userInfo`).doc().set(userInitialData)
            .then(async () => {
              dispatch(push('/'));
              window.location.reload();
            });
          }
            dispatch(signUpAction(data.username, data.email, data.password));
         });
    })

  return (
    <div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 align="center">アカウント登録</h2>
      <div>
      <TextField
        variant="outlined"
        fullWidth
        id='name'
        label='ユーザー名'
        type='text'
        name='name'
        margin="normal"
        {...register('name',{
          required: "名前を入力してください",
          maxLength: {
            value: 15,
            message: '15文字以内で名前を記述してください'
          }
        })}
        helperText={errors.name && errors.name.message}
       />
      <TextField 
        id='email'
        variant="outlined"
        fullWidth 
        label='メールアドレス'
        margin="normal"
        type={'email'} 
        {...register('email',{
          required:'メールアドレスを入力してください',
          pattern: {
            value:/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            message:'メールアドレスを正しく入力してください'
          }
        })}
        helperText={errors.email && errors.email.message}
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
          required:"パスワードが入力されていません",
          minLength: {
            value:6,
            message:'6文字以上で入力してください'
          }
        })}
        helperText={errors.password && errors.password.message}    
      />
      <TextField
        variant="outlined"
        fullWidth
        label='パスワード確認用'
        margin="normal" 
        type='password' 
        name="passwordConfirm"
        id="passwordConfirm"
        {...register("passwordConfirm",{
          required:"パスワードが入力されていません",
          minLength: {
            value:6,
            message:'6文字以上で入力してください'
          }
        })}
        helperText={errors.passwordConfirm && errors.passwordConfirm.message}    
       />

         <div>
            <RegisterButton align="center" label={'アカウント登録'} 
              onClick={handleSubmit(onSubmit)}>
            </RegisterButton>
         </div>
         <div>
            <Link to='/login'
              onClick={() => { handlePage('/login')}}>
              アカウントをお持ちの方はこちら
            </Link>
        </div>
      </div>
    </form>
    </div>
  )
}

export default SignUp;