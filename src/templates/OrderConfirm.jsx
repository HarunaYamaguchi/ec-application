import React,{useMemo} from 'react';
import { getProductInCart } from '../Reducks/users/Selectors';
// import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';


const OrderConfirm = () => {
  // const classes = useStyles()
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const productInCart = getProductInCart(selector)

  // const shoppingPostage = useMemo(() => ()) 

  // const subtotal = useMemo(() => {
  //   return productInCart.reduce((sum, product) => sum += product.price, 0)
  // }, [productInCart])

  return (
    <h2>注文の確認</h2>
  )
}

export default OrderConfirm;
