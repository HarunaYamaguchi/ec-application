import { signInAction } from "./Actions";
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';

export const signIn = (email,password) => {
  // const history = useHistory();
  // const handlePage = (path) => history.push(path);
    return async (dispatch, getState) => {
       const state = getState(); //現在のStateの値を取ってくる
       const isSignedIn = state.users.isSignedIn

       if(!isSignedIn){
            dispatch(signInAction({
              isSignedIn: true,
              uid: '0001',
              username: 'tanaka'
            }))
         };
    };
}