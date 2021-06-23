import React,{useCallback,useState} from 'react';
import { useDispatch } from 'react-redux';
import {TextInput,SelectBox} from '../UIKit';
import RegisterButton from '../UIKit/Button';
import { saveProduct } from '../Reducks/products/Oparations';

const ProductEdit = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const inputName = useCallback((e) => {
    setName(e.target.value)
  },[setName])

  const inputDescription = useCallback((e) => {
    setDescription(e.target.value)
  },[setDescription])

  const inputPrice = useCallback((e) => {
    setPrice(e.target.value)
  },[setPrice])

  const categories = [
     {id:'lips', name:'リップ'},
     {id:'eyeshadow', name:'アイシャドウ'},
     {id:'mascara', name:'マスカラ'},
     {id:'powder', name:'パウダー'},
     {id:'foundation', name:'ファンデーション'}
  ]

  return(
    <section>
      <h2>商品の登録・編集</h2>
      <div>
        <TextInput
          fullWidth={true} label={'商品名'} multiline={false} required={true}
          value={name} type={'text'} onChange={inputName} />

        <TextInput
          fullWidth={true} label={'商品説明'} multiline={false} required={true}
          row="5" value={description} type={'text'} onChange={inputDescription} />

        <SelectBox
          label={"カテゴリー"} required={true} value={category} options={categories} select={setCategory}
        />
        <TextInput
          fullWidth={true} label={'価格'} multiline={false} required={true}
          value={price} type={'number'} onChange={inputPrice} />
         <div>
           <RegisterButton 
             label={'商品登録'}
             onClick={() => dispatch(saveProduct(name,description,category,price))}
           />
         </div>
      </div>
    </section>
  )
}

export default ProductEdit;