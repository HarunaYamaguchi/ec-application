import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenAuthState } from './Reducks/users/Operations';
import { getIsSignedIn } from './Reducks/users/Selectors';

const Auth = ({children}) => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);

  useEffect(() => {
    if(!isSignedIn) {
      dispatch(listenAuthState())
    }
  },[dispatch,isSignedIn]);

  return children
};

export default Auth;