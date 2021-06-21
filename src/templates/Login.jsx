import React from 'react';
// import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const Login = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const handlePage = (path) => history.push(path);
  return(
    <div>
      <h2>ログイン</h2>
      <button onClick={() => handlePage('/')}>ログイン</button> 
    </div>
  )
}

export default Login;