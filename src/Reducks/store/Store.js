import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
 
import { UserReducer } from '../users/Reducer';
import { ProductReducer } from '../products/Reducer';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users:UserReducer,
      products:ProductReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  );
}