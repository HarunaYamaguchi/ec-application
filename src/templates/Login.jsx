import React,{useState} from 'react';
import { useCallback } from 'react';
import { useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { signIn } from '../Reducks/users/Operations';

const Login = () => {
  const dispatch = useDispatch();

  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")

    const inputEmail = useCallback((e) => {
        setMail(e.target.value)
    },[]);

    const inputPassword = useCallback((e) => {
        setPassword(e.target.value)
    },[]);

  const { register,handleSubmit,formState:{ errors } } = useForm();
  const onSubmit = data => console.log(data);
  
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
            dispatch(signIn(mail,password))}
        }
          /> 
    </form>
  )
}

export default Login;