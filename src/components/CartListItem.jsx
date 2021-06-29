import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getOrders } from '../Reducks/users/Selectors';
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
import { fetchCart } from '../Reducks/users/Operations';
import { getUserId } from '../Reducks/users/Selectors';
import { fetchProducts } from '../Reducks/products/Oparations';
import { fetchOrders } from '../Reducks/users/Operations';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  },
  table: {
    minWidth: 650,
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96
  },
}));


const CartListItem = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const history = useHistory();
  const orders = getOrders(selector);
  const products = getProducts(selector);
  const uid = getUserId(selector);
  const [totalPrice, setTotalPrice] = useState('')

 useEffect(() => {
   dispatch(fetchCart(uid))
 },[dispatch, uid])

useEffect(() => {
  dispatch(fetchProducts())
},[dispatch])

useEffect(() => {
  dispatch(fetchOrders(uid))
},[dispatch,orders,uid])

  return (
    <div className='cartList'>
        {orders === undefined ? (
          ''
         ) : orders.filter((el) => el.status === 0) === 0
         ? 
         (
          <div align="center">
            <h2>カートには現在何も入っていません</h2>
            <RegisterButton label={'一覧に戻る'} onClick={() => history.push('/')} />
          </div>
        ) : ( 
        <div>
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">商品名</TableCell>
                    <TableCell align="center">数量・種類</TableCell>
                    <TableCell align="center">小計(税抜き)</TableCell>
                  </TableRow>
                </TableHead>
                {orders === undefined ? ''
                :
                orders.filter((order) => order.status === 0)
                .map((order,index) => {
                  return (
                    <TableBody key={index}>
                        {order.itemInfo.map((itemInfos) => {
                          return products === undefined ? ''
                            :
                            products.filter((product) => 
                              product.id === itemInfos.itemId)
                              .map((product,index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell align='center'>
                                      <img src={product.imagePath}
                                        alt='商品画像'
                                        height='100px'
                                        width='100px'
                                        align='center'
                                      />
                                      <div>{product.name}</div>
                                    </TableCell>
                                    <TableCell align="center">
                                      <div>{itemInfos.itemNum}個</div>
                                      <div>
                                        {itemInfos.itemKind === 0 ? 
                                          <div>{product.kind}</div>
                                        : 
                                          <div>{product.kind2}</div>
                                        }
                                      </div>
                                    </TableCell>
                                    <TableCell key={itemInfos.itemId}
                                      align="center"
                                    >
                                      <div>
                                        {(product.price * itemInfos.itemNum).toLocaleString()}円
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              });
                          })}
                    </TableBody>
                    )
                  }
                )}
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartListItem;

