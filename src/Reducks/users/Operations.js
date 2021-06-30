import { fetchCartAction, fetchOrdersAction, signInAction,signOutAction } from "./Actions";
import {auth,db} from '../../firebase/index'
import { push } from 'connected-react-router';
import firebase from 'firebase';

// export const signUp = (username,email,password) => {
//   return async (dispatch) => {

//        return auth.createUserWithEmailAndPassword(email,password)
//        .then((result) => {
//         const userState = result.user;
//         const uid = userState.uid

//          if(userState) {
//            const timestamp = FirebaseTimestamp.now();
           
//            const userInitialData = {
//              created_at: timestamp,
//              email: email,
//              uid: uid,
//              updated_at: timestamp,
//              username: username,
//              password: password
//             }

//             db.collection(`users/${uid}/userInfo`).doc().set(userInitialData)
//             .then(async () => {
//               dispatch(push('/'));
//               window.location.reload();
//             });
//           }
//             dispatch(signUpAction(username, email, password));
//          });
//     };
// };


// export const signIn = (email,password) => {
//   const browserHistory = createBrowserHistory();

//     return async (dispatch) => {
//       auth.signInWithEmailAndPassword(email,password)
//         .then((result) => {
//           const userState = result.user;
//           const userId = userState.uid;
//           console.log(userId);

//           if(userState) {
//             db.collection('users').doc(userId).collection('userInfo').get()
//             .then((querySnapshot) => {
//               querySnapshot.forEach((doc) => {
//                 const data = doc.data()

//                 dispatch(signInAction({
//                   isSignedIn: true,
//                   uid: userId,
//                   username: data.username,
//                 }));
//                 browserHistory(push('/'));
//                 window.location.reload();
//               });
//             });
//           }
//         });
//   };
// }


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
    window.location.reload();
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
              const data = doc.data();

              dispatch(signInAction({
                isSignedIn:true,
                uid: uid,
                username: data.username,
                mail: data.mail
              }));
            });
          });
      } else {
        dispatch(push('/login'));
      }
    });
  };
};

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
    ordersRef.get().then(snapshots => {
      const orderList = [];
      
      snapshots.forEach(snapshots => {
        const order = snapshots.data();
        orderList.push(order)
      });
      dispatch(fetchOrdersAction(orderList));
    })
  };
};

export const addOrdersInfo = (selectedId, uid, num, labelName, carts) => {
  return async (dispatch) => {
    const ordersRef = db.collection('users').doc(uid).collection('orders');

    if(carts.length === 0){
      const ref = ordersRef.doc();
      const id = ref.id
      
      ordersRef.doc(id).set({
        orderId: id,
        itemInfo: [
          {
            id: id,
            itemId: selectedId,
            itemNum: Number(num),
            itemKind: Number(labelName)
          },
        ],
        status: 0,
    });
  } else {
    let statusZero = [];
    const ref = ordersRef.doc();
    const id = ref.id;

    ordersRef
      .where('status', '==', 0) //配列の検索
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          statusZero.push(doc.data().orderId);
        });

        const statusZeroRef = ordersRef.doc(statusZero[0]);
        statusZeroRef.update({
            itemInfo: firebase.firestore.FieldValue.arrayUnion({ //要素の追加
              id: id,
              itemId: selectedId,
              itemNum: Number(num),
              itemKind: Number(labelName)
            }),
          });
        });
    }
  };
};

export const DeleteOrder = (uid, itemInfos, orderId) => {
  const itemInfosId = itemInfos.id;
  const ordersRef = db.collection('users').doc(uid).collection('orders');
  
  return async (dispatch) => {
    ordersRef
    .where('status', '==', 0).get()
      .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         const docId = doc.data().orderId;

         let deleteItem = doc.data()
           .itemInfo.filter((item) => item.id !== itemInfosId);
          
         let localCart = [
           {
             orderId: orderId,
             itemInfo: deleteItem,
             status: 0
           },
         ];
         
         ordersRef.doc(orderId).set(localCart[0]);
         if(doc.data().itemInfo.length === 1){
           ordersRef.doc(docId).delete();
         }
      });
    });
  };
};
