import React from 'react';
import { RegisterButton } from '../UIKit';
import { Controller, useForm } from 'react-hook-form';
import CartListItem from '../components/CartListItem';
import { TextField,Box,Select, MenuItem } from '@material-ui/core';
import { getUserId } from '../Reducks/users/Selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {db,FirebaseTimestamp} from '../firebase/index'
import { push } from 'connected-react-router';

const OrderConfirm = () => {
  const dispatch = useDispatch()
  
  const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  const sumPrice = useLocation().state.sumPrice;

  const defaultValues = {
    TextField: '',
    Select: '',
  };
  
  const { register, handleSubmit,control, formState:{ errors } } = useForm(defaultValues)

  const onSubmit = (async(data) => {
        // console.log(data)

        const ordersRef = db.collection('users').doc(uid).collection('orders');
        const timestamp = FirebaseTimestamp.now();

        ordersRef.where('status', '==', 0).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const orderedId = doc.data().orderId;

              ordersRef.doc(orderedId).update({
                status: data.payValue,
                userId: uid,
                orderDay: timestamp,
                name: data.name,
                mail: data.mail,
                zipCode: data.zipCode,
                address: data.address,
                phoneNumber: data.phoneNumber,
                payValueId: data.payValue,
                // creditCard: data.creditCardNum,
                totalPrice: sumPrice.toLocaleString(),
              });
            });
            dispatch(push('/orderfinished'));
            window.location.reload();
          });
    })

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
                      value: 15,
                      message: '15文字以内で名前を記述してください'
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
                  <Controller
                        render={
                          ({ field }) => <Select {...field}>
                            <MenuItem id={0} value={1} >代金引き換え</MenuItem>
                            <MenuItem id={1} value={2} >クレジットカード</MenuItem>
                          </Select>
                        }
                        rules={{ required: true }}
                        control={control}
                        name="payValue"
                        defaultValue={1}
                  />
                  {/* {payValue === 2 ? (
                            <TextField 
                              id="creditCard"
                              label="クレジットカード番号"
                              name="creditCardNum"
                              style={{width:300}}
                              />
                          ) : ('')} */}
              </Box>
            </Box>
        </div>
        <div>
        <RegisterButton label={'注文を確定する'}
          onClick={handleSubmit(onSubmit)}            
           />
        </div>
      </form>
    </div>
  )
}

export default OrderConfirm;
