import React, { useEffect, useState, memo } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getOrders } from '../Reducks/users/Selectors';
import { useHistory,useLocation } from 'react-router';
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
import { DeleteOrder, fetchCart } from '../Reducks/users/Operations';
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
}));


const CartList = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const history = useHistory();
  const location = useLocation();
  const orders = getOrders(selector);
  const products = getProducts(selector);
  const uid = getUserId(selector);
  const [totalPrice, setTotalPrice] = useState(0)
  const handleLink = (path) => history.push(path)

 useEffect(() => {
   dispatch(fetchCart(uid))
 },[dispatch, uid])

useEffect(() => {
  dispatch(fetchProducts())
},[dispatch])

useEffect(() => {
  dispatch(fetchOrders(uid))
},[dispatch,orders,uid])

const createTotalPrice = () =>  {
  let priceTotal = 0;
  const filterOrder = orders.filter((order) => order.status === 0);

  filterOrder.forEach((item) => {
    item.itemInfo.forEach((el) => {
      if(products){
        const selectProducts = products.filter(
          (product) => product.id === el.itemId
        );
        selectProducts.forEach((select) => {
          if(el.itemId){
            priceTotal = priceTotal + select.price * el.itemNum
          }
        });
      }
    });
  });
  setTotalPrice(priceTotal);
};

useEffect(() => {
  createTotalPrice();
})

  return (
    <div className='cartList'>
      <h2 align='center'>ショッピングカート</h2>
        {orders === null ? (
          ''
         ) : orders.filter((el) => el.status === 0) === undefined
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
                    <TableCell align="center">小計</TableCell>
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
                                        {(product.price * itemInfos.itemNum).toLocaleString()}円(税抜き)
                                      </div>
                                    </TableCell>
                                    <TableCell align="center">
                                      <div>
                                        <RegisterButton 
                                          key={order.id}
                                          label={'削除'}
                                          onClick={() => {dispatch(DeleteOrder(uid, itemInfos, order.orderId))}}
                                         />
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
          <div>
            <h3 align='center'>
              消費税：{Math.round(totalPrice * 0.1).toLocaleString()}円
            </h3>
            <h3 align='center'>
              合計金額：{Math.round(totalPrice * 1.1).toLocaleString()}円
            </h3>
          </div>
          <div>
            {location.pathname === '/cartlist' ? (
              <RegisterButton label={'注文確認画面へ進む'} 
                onClick={() => history.push('/orderconfirm',{
                sumPrice: Math.round(totalPrice * 1.1)
              })}
              />
            ):(
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CartList);