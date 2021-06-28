import React from 'react';
// import { makeStyles } from '@material-ui/core';
import { RegisterButton } from '../UIKit';
import { useHistory } from 'react-router';
import CartListItem from '../components/CartListItem';

const OrderConfirm = () => {
  // const classes = useStyles()
  const history = useHistory();
  const handleLink = (path) => history.push(path)

  return (
    <div>
      <h2 align='center'>注文の確認</h2>
      <div>
        <CartListItem />
      </div>
      <div>
        <RegisterButton label={'注文確定'} onClick={() => {handleLink('/orderfinished')}} />
      </div>
    </div>
  )
}

export default OrderConfirm;
