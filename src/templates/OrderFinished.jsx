import React from 'react';
import { RegisterButton } from '../UIKit';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    alignItems: 'center',
    padding: '50px 20px'
  }
}));

const OrderFinished = () => {
  const classes = useStyles()
  const handleLink = (path) => history.push(path)
  const history = useHistory();

  return (
    <div align="center">
      <h2>
        ご購入ありがとうございました！
      </h2>
      <h3>またのご利用をお待ちしております。</h3>
      <div className={classes.button}>
        <RegisterButton label={'メニューに戻る'}
          onClick={() => {handleLink('/')}} />
      </div>
    </div>
  )
}

export default OrderFinished;