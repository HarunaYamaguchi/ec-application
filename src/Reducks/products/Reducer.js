import * as Actions from './Actions';
import {initialState} from '../store/initialState';

export const ProductReducer = (state = initialState.products,action) => {
    switch(action.type) {
        default:
          return state
    }
}