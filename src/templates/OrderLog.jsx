import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getProducts} from '../Reducks/products/selectors';
import {getUserId,getOrders} from '../Reducks/users/Selectors';
import RegisterButton from '../UIKit/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const OrderLog = () => {
  const dispatch = useDispatch();
  const selector = useSelector();
  const products = getProducts(selector);
  const uid = getUserId(selector);
  const orders = getOrders(selector);

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
                  <TableCell align="center">配達予定日</TableCell>
                  <TableCell align="center">商品名</TableCell>
                  <TableCell align="center">数量</TableCell>
                </TableRow>
              </TableHead>
              {orders === undefined 
              ?
              ''
              : orders.filter((order) => order.status !== 0)
                .map((order) => {
                  return (
                    <TableBody key={order.orderId}>
                      <TableRow>
                        <TableCell align="center">
                          <h3>注文した日</h3>
                        </TableCell>
                      </TableRow>
                      {order.itemInfo.map((itemInfos) => {
                        return products === undefined
                        ? ''
                        : products.filter((product) =>
                            product.id === itemInfos.id
                          ).map((product) => {
                            return (
                              <TableRow key={product.id}>
                                <TableCell align="center">
                                  <img src={product.imagePath}
                                    alt="商品画像"
                                    height='100px'
                                    width='100px'
                                    align='center'
                                  />
                                </TableCell>
                                <Link to={{
                                  pathname: '/itemdetail',
                                  selectedItemId: product.id
                                }}>
                                  {product.name}
                                </Link>
                                <TableCell align="center"
                                  key={itemInfos.itemId}>
                                 {itemInfos.itemNum}個
                                </TableCell>
                              </TableRow>
                            );
                          })
                      })}
                        <TableRow>
                          <TableCell>
                            <h3>合計金額:{order.totalPrice.toLocaleString()}</h3>
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
          <RegisterButton label={'メニューに戻る'} />
        </div>
      )}
    </div>
  )
}

export default OrderLog;