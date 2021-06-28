import * as Actions from './Actions';
import {initialState} from '../store/initialState';

export const UserReducer = (state = initialState.users,action) => {
    switch(action.type) {
      case Actions.FETCH_ORDERS :
        return {
          ...state,
          orders:[...action.payload]
        };
      case Actions.FETCH_CART:
        return {
         ...state,
         cartList:[...action.payload]
        };
      case Actions.SIGN_UP :
        return {
          ...state,
          userInfo:action.payload,
        };
      case Actions.SIGN_IN :
        return {
          ...state,
          ...action.payload,
        };
      case Actions.SIGN_OUT:
        return {
          ...initialState.users,
        }
        default:
          return state
    }
}