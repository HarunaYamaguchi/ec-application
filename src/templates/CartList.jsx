import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getOrder } from '../Reducks/users/Selectors';
import { getProductInCart } from '../Reducks/users/Selectors';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import {makeStyles} from "@material-ui/core/styles";
import RegisterButton from '../UIKit/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getProducts } from '../Reducks/products/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  },
  table: {
    minWidth: 650,
  },
}));



const CartList = () => {
  const classes = useStyles();
  // const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const history = useHistory();
  // const productInCart = getProductInCart(selector);
  const orders = getOrder(selector);
  const products = getProducts(selector);
  // const [totalPrice, setTotalPrice] = useState('')


  return (
    <div className='cartList'>
      <h2 align='center'>ショッピングカート</h2>
        {orders === undefined ? (
          ''
         ) :  orders.filter((el) => el.status === 0).length === 0 ? (
          <div align="center">
            <h2>カートには現在何も入っていません</h2>
            <RegisterButton label={'一覧に戻る'} onClick={() => history.push('/')} />
          </div>
        ) : (  
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>商品名</TableCell>
                <TableCell align="right">数量・価格</TableCell>
                <TableCell align="right">小計</TableCell>
              </TableRow>
            </TableHead>
          {orders === undefined ? ''
          :
          orders.filter((order) => order.status === 0)
          .map((orders,index) => {
            return (
              <TableBody>
                {orders.map((order) => {
                  return (
                  <TableRow key={index}>
                    {order.itemInfo.map((itemInfos) =>{
                      return products === undefined ? ''
                      :
                      products.filter((product) => 
                        product.id === itemInfos.ItemId)
                        .map((product,index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell align='center'>
                                <img src={product.imagePath}
                                  alt='商品画像'
                                  height='100px'
                                  width='200px'
                                  align='center'
                                />
                                <div>{product.name}</div>
                              </TableCell>
                              <TableCell align="center">
                                <div>{itemInfos.ItemNum}個</div>
                                <div>
                                  {itemInfos.itemKind === 0 ? 
                                  (
                                    <div>{itemInfos.kind}</div>
                                  )
                                  : 
                                  (
                                    <div>{itemInfos.kind2}</div>
                                  )
                                  }
                                </div>
                                <div>{itemInfos.ItemPrice}円</div>
                              </TableCell>
                              <TableCell key={itemInfos.itemId}
                                align="center"
                              >
                                <div>
                                  {(product.price * itemInfos.ItemNum).toLocaleString()}円
                                </div>
                              </TableCell>
                            </TableRow>
                          )
                        })
                    })}
                  </TableRow>
                  )
                })}
              </TableBody>
              )
          })}
          </Table>
        </TableContainer>
            )
        }
      <div>
        <Button label={"レジへ進む"} />
        <Button label={"ショッピングを続ける"} />
      </div>
    </div>
  )
}

export default CartList;