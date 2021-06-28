import * as Actions from './Actions';
import {initialState} from '../store/initialState';

export const ProductsReducer = (state = initialState.products, action) => {
    switch(action.type) {
        case Actions.FETCH_PRODUCTS:
            return {
                ...state,
                list:[...action.payload]
            };
        case Actions.FETCH_SUM_PRICE:
            return {
                ...state,
                sumPrice: action.payload
            };
        case Actions.ADD_ORDERS_INFO:
            return {
                ...state,
                ordersInfo: action.payload
            };
        default:
          return state;
    }
};
