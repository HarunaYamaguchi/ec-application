import { db,FirebaseTimestamp } from "../../firebase"
import { push } from "connected-react-router"

const productsRef = db.collection('products')

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