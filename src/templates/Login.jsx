import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import { signInAction } from '../Reducks/users/Actions';
import { useForm } from "react-hook-form";

const Login = () => {
  // const dispatch = useDispatch();
  // const selector = useSelector(state => state)
  // console.log(selector.users)
  // const history = useHistory();
  // const handlePage = (path) => history.push(path);

  const { register,handleSubmit,watch,formState:{ errors } } = useForm();

  const onSubmit = data => console.log(data);
  // const mail = watch('mail')
  // console.log(mail);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>ログイン</h2>
        ・メールアドレス<input name="mail"
        {...register("mail",{
          id:"mail",
          required:true,
          pattern:{
            value:/^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            message:'メールアドレスを正しく入力してください'
          },
        })}
        />
        {errors.mail && errors.mail.message}

        ・パスワード<input name="password"
        {...register("password",{
          id:'password',
          repuired:"パスワードが入力されていません",
          minLength: {
            value:8,
          message:'8文字以上で入力してください'
          }
          })}
          />
        {errors.password && errors.password.message}

        <input type="submit" 
        onClick={(e) => {
          e.preventDefault()
        //   dispatch(signInAction({ uid:'00001'}))
        }
          } 
          /> 
    </form>
  )
}

export default Login;