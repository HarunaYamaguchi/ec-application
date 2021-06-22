import React from 'react';
import { useSelector } from 'react-redux';
import {getUserId} from '../Reducks/users/Selectors'

const Home = () =>{
  const selector = useSelector(state => state);
  const uid = getUserId(selector);
  const username = getUserId(selector);

  return (
    <div>
      <h2>ホーム画面</h2>
      <p>{uid}</p>
      <p>{username}</p>
    </div>
  )
}

export default Home;