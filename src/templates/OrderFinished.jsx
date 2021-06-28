import React from 'react';
import { RegisterButton } from '../UIKit';
import { useHistory } from 'react-router';

const OrderFinished = () => {
  const history = useHistory();
  const handleLink = (path) => history.push(path)

  return (
    <div>
      <h2 align="center">
        ご購入ありがとうございました！
      </h2>
      <RegisterButton label={'メニューに戻る'} onClick={() => {handleLink('/')}} />
    </div>
  )
}

export default OrderFinished;