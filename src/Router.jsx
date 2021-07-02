import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import {
  Login, 
  SignUp, 
  ProductList, 
  // ProductEdit,
  ProductDetail,
  CartList,
  OrderConfirm,
  OrderFinished,
  OrderLog
} from './templates';
import Auth from './Auth';
import {Header} from './components/index'

const Router = () => {
    return (
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />

              <Auth>
              <Route exact path='(/)?' component={ProductList} />
                <Route exact path='/orderlog' component={OrderLog} />
                <Route exact path='/orderfinished' component={OrderFinished} />
                <Route exact path='/orderconfirm' component={OrderConfirm} />
                <Route exact path='/cartlist' component={CartList} />
                <Route exact path='/productdetail' component={ProductDetail} />
                {/* <Route exact path='/product/edit' component={ProductEdit} />  */}
              </Auth>
          </Switch>
      </BrowserRouter>
    )
}

export default Router;