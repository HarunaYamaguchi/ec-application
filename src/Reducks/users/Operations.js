import { signInAction,signOutAction,signUpAction } from "./Actions";
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import {auth,db,FirebaseTimestamp} from '../../firebase/index'
import { push } from 'connected-react-router';

export const listenAuthState = () => {
    return async (dispatch) => {
      return auth.onAuthStateChanged(user => {
        if(user) {
          const uid = user.uid

            db.collection('users').doc(uid).collection('userInfo').get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const data = doc.data()

                dispatch(signInAction({
                  isSignedIn:true,
                  uid:uid,
                  username:data.username,
                }))
              })
            })
        } else {
          dispatch(push('/login'))
        }
      })
    }
}


export const signIn = (email,password) => {
    return async (dispatch) => {
      auth.signInWithEmailAndPassword(email,password)
        .then(result => {
          const userState = result.user;
          const userId = userState.uid;

          if(userState) {
            db.collection(userId).doc('userInfo').get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const data = doc.data()

                dispatch(signInAction({
                  isSignedIn:true,
                  uid:userId,
                  username:data.username,
                }))
                dispatch(push('/'))
              })
            })
          }
        })
  };
}

export const signUp = (username,email,password) => {
  return async (dispatch) => {
       return auth.createUserWithEmailAndPassword(email,password)
       .then(result => {
        const userState = result.user;

         if(userState) {
           const uid = userState.uid
           const timestamp = FirebaseTimestamp.now();
           
           const userInitialData = {
             created_at: timestamp,
             email: email,
             uid: uid,
             updated_at: timestamp,
             username: username,
             password:password
            }

            db.collection(`users/${uid}/userInfo`).doc().set(userInitialData)
            .then(async () => {
              dispatch(push('/'))
            });
          }
            dispatch(signUpAction(username, email, password));
         });
    }
}

export const signOut = () => {
  return async (dispatch) => {
    auth
      .signOut()
        .then(() => {
          dispatch(signOutAction());
        })
      .catch(() => {
        throw new Error('ログアウトに失敗しました。');
      });
    dispatch(push('/login'));
  };
};