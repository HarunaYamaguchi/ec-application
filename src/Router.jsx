import React from 'react';
import { Route, Switch } from 'react-router';
import {Login,SignUp,ProductList,ProductEdit,Home, ProductDetail} from './templates';
// import Auth from './Auth';

const Router = () => {
    return (
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        
          <Route exact path='/productdetail' component={ProductDetail}/>
          <Route exact path='/productlist' component={ProductList}/> 
          <Route exact path='/product/edit' component={ProductEdit}/> 
          {/* <Auth> */}
          <Route exact path='(/)?' component={Home} />
        {/* </Auth> */}
      </Switch>
    )
}

export default Router;