import {db,FirebaseTimestamp} from '../../firebase/index'
import { push } from "connected-react-router"
import { fetchProductsAction, fetchSumPriceAction } from './Actions';
import firebase from 'firebase';

const productsRef = db.collection('products')

export const fetchSumPrice = (sumPrice) => {
  return (dispatch) =>{
    dispatch(fetchSumPriceAction(sumPrice))
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.orderBy('id', 'asc').get() //id、昇順
    .then((snapshots) => {
      const productList = [];
      snapshots.forEach((snapshots) => {
        const product = snapshots.data();
        productList.push(product)
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

export const saveProduct = (name,description, category,price) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now() //現在のサーバーの時刻

        const data = {
          category: category,
          description: description,
          name:name,
          price: parseInt(price, 10), //文字列を10進数に変換
          updated_at: timestamp
        }

          const ref = productsRef.doc()
          const id = ref.id //firestoreが自動で採番してくれたIDを取得
          data.id = id
          data.created_at = timestamp;


        return productsRef.doc(id).set(data)
          .then(() => {
            dispatch(push('/'))
          })
          // .catch((error) => {
          //   throw new Error(error)
          // })
    }
}

export const addOrdersInfo = (selectedId, uid, num, labelName, carts) => {
  return async (dispatch) => {
    const ordersRef = db.collection('users').doc('userId').collection('orders');
    console.log(uid)

    if(carts === undefined){
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
    console.log(num)
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