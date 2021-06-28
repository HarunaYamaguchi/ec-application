import { fetchCartAction, fetchOrdersAction, signInAction,signOutAction,signUpAction } from "./Actions";
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import {auth,db,FirebaseTimestamp} from '../../firebase/index'
import { push } from 'connected-react-router';


export const signUp = (username,email,password) => {
  return async (dispatch) => {

       return auth.createUserWithEmailAndPassword(email,password)
       .then((result) => {
        const userState = result.user;
        const uid = userState.uid

         if(userState) {
           const timestamp = FirebaseTimestamp.now();
           
           const userInitialData = {
             created_at: timestamp,
             email: email,
             uid: uid,
             updated_at: timestamp,
             username: username,
             password: password
            }

            db.collection(`users/${uid}/userInfo`).doc().set(userInitialData)
            .then(async () => {
              dispatch(push('/'));
              window.location.reload();
            });
          }
            dispatch(signUpAction(username, email, password));
         });
    }
}


export const signIn = (email,password) => {
    return async (dispatch) => {
      auth.signInWithEmailAndPassword(email,password)
        .then((result) => {
          const userState = result.user;
          const userId = userState.uid;
          console.log(userId);

          if(userState) {
            db.collection('users').doc(userId).collection('userInfo').get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const data = doc.data()

                dispatch(signInAction({
                  isSignedIn: true,
                  uid: userId,
                  username: data.username,
                }))
                dispatch(push('/'))
              })
            })
          }
        })
  };
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
                uid: uid,
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

export const fetchCart = (uid) => {
  return async (dispatch) => {
    const cartList = []

    if (uid) {
      const ordersRef = db.collection('users').doc(uid).collection('orders');

      ordersRef.where('status', '==', 0)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          cartList.push(doc.data());
        });
        dispatch(fetchCartAction(cartList));
      });
    }
  };
};

export const fetchOrders = (uid) => {
  const ordersRef = db.collection('users').doc(uid).collection('orders');

  return async (dispatch) => {
    ordersRef.get().then((snapshots) => {
      const orderList = [];
      snapshots.forEach((snapshot) => {
        const order = snapshot.data();
        orderList.push(order)
      });
      dispatch(fetchOrdersAction(orderList));
    })
  }
}