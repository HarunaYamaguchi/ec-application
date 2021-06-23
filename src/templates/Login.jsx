import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
// import { signInAction } from '../Reducks/users/Actions';
import { useForm } from "react-hook-form";
import {push} from 'connected-react-router'

const Login = () => {
  const dispatch = useDispatch();
  // const selector = useSelector(state => state)
  // console.log(selector.users)
  // const history = useHistory();
  // const handlePage = (path) => history.push(path);

  const { register,handleSubmit,watch,formState:{ errors } } = useForm();
  const onSubmit = data => console.log(data);

  const mail = watch("mail");
  console.log(mail)
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>ログイン</h2>
        ・メールアドレス<input name="mail"
        {...register("mail",{
          id:"mail",
          required: "メールアドレスが入力されていません",
          pattern:{
            value:/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            message:'メールアドレスを正しく入力してください'
          },
        })}
        />
        {errors.mail && "メールアドレスが入力されていません"}

        ・パスワード<input name="password"
        {...register("password",{
          id:'password',
          required:"パスワードが入力されていません",
          minLength: {
            value:6,
          message:'6文字以上で入力してください'
          }
        })}
          />
        {errors.password && errors.password.message}

        <input type="submit" 
          onClick={() => {
            // dispatch(signInAction({ uid:'00001'}))
            dispatch(push('/'))
          }
        } 
          /> 
    </form>
  )
}

export default Login;