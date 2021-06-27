import React from 'react';
import { Route, Switch } from 'react-router';
import {
  Login, 
  SignUp, 
  ProductList, 
  ProductEdit,
  ProductDetail,
  // ItemDetail
} from './templates';
import Auth from './Auth';
import CartList from './templates/CartList';

const Router = () => {
    return (
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />

          <Auth>
            <Route exact path='/cartlist' component={CartList}/>
            <Route exact path='/productdetail' component={ProductDetail}/>
            {/* <Route exact path='/product/:id' component={ItemDetail}/> */}
            <Route exact path='/product/edit' component={ProductEdit}/> 
            <Route exact path='(/)?' component={ProductList} />
          </Auth>
      </Switch>
    )
}

export default Router;