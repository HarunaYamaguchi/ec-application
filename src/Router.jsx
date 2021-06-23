import React from 'react';
import { Route, Switch } from 'react-router';
import {Login,SignUp,ProductEdit,Home} from './templates';
import Auth from './Auth';

const Router = () => {
    return (
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        
          <Route exact path='/product/edit' component={ProductEdit}/> 
          <Auth>
          <Route exact path='(/)?' component={Home} />
        </Auth>
      </Switch>
    )
}

export default Router;