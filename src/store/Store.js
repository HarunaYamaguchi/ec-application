import {
  createStore as reduxCreateStore,
  combineReducers
} from 'redux';

import { UserReducer } from '../Reducks/Reducer';

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      users:UserReducer
    })
  )
}