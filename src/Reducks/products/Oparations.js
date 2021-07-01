import {db} from '../../firebase/index'
// import {FirebaseTimestamp} from '../../firebase/index'
// import { push } from "connected-react-router"
import { fetchProductsAction, fetchSumPriceAction } from './Actions';


const productsRef = db.collection('products')

export const fetchSumPrice = (sumPrice) => {
  return (dispatch) =>{
    dispatch(fetchSumPriceAction(sumPrice))
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    productsRef.orderBy('id', 'asc').get() //id、昇順
    .then((querySnapshot) => {
      const productList = [];
      querySnapshot.forEach((querySnapshot) => {
        const product = querySnapshot.data();
        productList.push(product)
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};

// export const saveProduct = (name,description, category,price) => {
//     return async (dispatch) => {
//         const timestamp = FirebaseTimestamp.now() //現在のサーバーの時刻

//         const data = {
//           category: category,
//           description: description,
//           name:name,
//           price: parseInt(price, 10), //文字列を10進数に変換
//           updated_at: timestamp
//         }

//           const ref = productsRef.doc()
//           const id = ref.id //firestoreが自動で採番してくれたIDを取得
//           data.id = id
//           data.created_at = timestamp;


//         return productsRef.doc(id).set(data)
//           .then(() => {
//             dispatch(push('/'))
//           })
          // .catch((error) => {
          //   throw new Error(error)
          // })
//     }
// }

