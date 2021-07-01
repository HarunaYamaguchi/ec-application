import React,{ useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getProducts} from '../Reducks/products/selectors';
import {getOrders} from '../Reducks/users/Selectors';
import RegisterButton from '../UIKit/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link, useHistory } from 'react-router-dom';
import { getUserId } from '../Reducks/users/Selectors';
import { fetchOrders } from '../Reducks/users/Operations';

const OrderLog = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const orders = getOrders(selector);
  const history = useHistory();
  const handleLink = (path) => history.push(path)
  const uid = getUserId(selector);

  useEffect(() => {
    if(uid){
      dispatch(fetchOrders(uid));
    }
  }, [dispatch, orders, uid]);

 

  return (
    <div>
      {orders.filter((order) => order.status !== 0) !== 0 ? (
        <TableContainer>
          <h2 align="center">
            注文履歴
          </h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">商品名</TableCell>
                  <TableCell align="center">数量</TableCell>
                </TableRow>
              </TableHead>
              {orders === undefined 
              ?
              ''
              : orders.filter((orders) => orders.status !== 0)
                .map((order) => {
                  return (
                    <TableBody key={order.itemInfo.itemId}>
                      {order.itemInfo.map((itemInfos) => {
                        // return itemInfo !== undefined
                        // ? ''
                        // : itemInfo.filter((orderItem) =>
                        //     orderItem.id === itemInfo.itemId
                        //   )
                        //   .map((item) => {
                            return (
                              <TableRow key={itemInfos.itemId}>
                                <TableCell align="center">
                                  <img 
                                    src={itemInfos.imagePath}
                                    alt="商品画像"
                                    height='100px'
                                    width='100px'
                                    align='center'
                                  />
                                </TableCell>
                                <Link to={{
                                  pathname: '/itemdetail',
                                  selectedItemId: itemInfos.itemId,
                                }} 
                                  key={itemInfos.id}>
                                  {itemInfos.name}
                                </Link>
                                <TableCell align="center"
                                  key={itemInfos.itemId}>
                                 {itemInfos.itemNum}個
                                </TableCell>
                              </TableRow>
                            );
                          // })
                      })}
                        <TableRow>
                          <TableCell>
                            <h3>合計金額:{orders.totalPrice}円</h3>
                          </TableCell>
                        </TableRow>

                    </TableBody>
                  );
                })
              }
            </Table>
        </TableContainer>
      ):(
        <div align='center'>
          <h2>注文履歴はありません。</h2>
            <RegisterButton label={'メニューに戻る'} onClick={() => {handleLink('/')}} />
        </div>
      )}
    </div>
  )
}

export default OrderLog;