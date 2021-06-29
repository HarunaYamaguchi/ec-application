import React from 'react';
// import { makeStyles } from '@material-ui/core';
import { RegisterButton } from '../UIKit';
import { useHistory } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import CartListItem from '../components/CartListItem';
import { TextField,Box,Button } from '@material-ui/core';

const OrderConfirm = () => {
  // const classes = useStyles()
  const history = useHistory();
  const handleLink = (path) => history.push(path)
  const { register, handleSubmit, control, formState:{ errors } } = useForm()
  const onSubmit = (data) => console.log(data)

  const paymentList = [
    { id: 0, value: 1, name:"代金引換"},
    { id: 1, value: 2, name:"クレジットカード"}
  ]

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 align='center'>注文の確認</h2>
        <div>
          <CartListItem />
        </div>
        <div className="center">
          <h2 align="center">お届け先情報入力</h2>
            <Box align="center" >
              <Box mt={2}>
                <TextField 
                  id='name'
                  label='名前'
                  style={{width:300}}
                  name='name'
                  {...register('name',{
                    required: "名前を入力してください",
                    maxLength: {
                      value: 10,
                      message: '10文字以内で名前を記述してください'
                    }
                  })}
                  helperText={errors.name && errors.name.message}
                />
              </Box>
              <Box mt={2}>
                <TextField
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
              </Box>
              <Box mt={2}>
                <TextField
                  id='zipCode'
                  label='郵便番号'
                  style={{width:300}}
                  name='zipCode'
                  {...register('zipCode',{
                    required:'郵便番号を入力してください',
                    pattern: {
                      value:/^[0-9]{3}-[0-9]{4}$/,
                      message:'XXX-XXXXの形式で入力してください'
                    }
                  })}
                  helperText={errors.zipCode && errors.zipCode.message}
                />
             </Box>
              <Box mt={2}>
                <TextField
                  id='address'
                  label='住所'
                  style={{width:300}}
                  name='address'
                  {...register('address',{
                    required:'住所を入力してください',
                  })}
                  helperText={errors.address && errors.address.message}
                />
             </Box>
              <Box mt={2}>
                <TextField
                  id='phoneNumber'
                  label='電話番号'
                  style={{width:300}}
                  name='phoneNumber'
                  {...register('phoneNumber',{
                    required:'電話番号を入力してください',
                    pattern: {
                      value: /^[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                      message: "電話番号は XXXX-XXXX-XXXX の形式で入力してください"
                    }
                  })}
                  helperText={errors.phoneNumber && errors.phoneNumber.message}
                />
             </Box>
             <Box mt={2}>
                <TextField 
                  
                />
             </Box>
            </Box>
        </div>
        <div>
          <RegisterButton label={'注文確定'} onClick={handleLink('orderconfirm')} />
          {/* <RegisterButton label={'注文確定'} onClick={handleSubmit(onSubmit)}></RegisterButton> */}
        </div>
      </form>
    </div>
  )
}

export default OrderConfirm;
