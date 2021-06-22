import * as Actions from './Actions';
import {initialState} from '../store/initialState';

export const UserReducer = (state = initialState.users,action) => {
    switch(action.type) {
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