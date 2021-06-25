import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Reducks/users/Operations';
import {getUserId,getUserName} from '../Reducks/users/Selectors'

const Home = () =>{
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUserName(selector);

  return (
    <div>
      <h2>ホーム画面</h2>
      <button onClick={() => dispatch(signOut())}>SIGN OUT</button>
    </div>
  )
}

export default Home;