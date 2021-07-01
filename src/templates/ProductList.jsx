import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchProducts } from '../Reducks/products/Oparations';
import { getProducts } from '../Reducks/products/selectors';
import { getUserId,getOrders } from '../Reducks/users/Selectors';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Search from '../components/Search';
import { fetchCart } from '../Reducks/users/Operations';

const useStyles = makeStyles(((theme) => ({
  root: {
    maxWidth: 370,
    margin: 20,
  },
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height:150
  }
})
))

const ProductList = () => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);
  const uid = getUserId(selector);
  const orders = getOrders(selector);
  const classes = useStyles();

  let showProducts = [];

   useEffect(() => {
     dispatch(fetchProducts())
   },[dispatch]);

   const filterAlert = () => {
     alert('該当の商品はありません');
     setInputText('');
   }

   if(products !== undefined){
     showProducts = products.filter((product) => 
       product.name.indexOf(inputText) !== -1
     );
   }

   useEffect(() => {
    dispatch(fetchCart(uid));
  }, [dispatch, orders, uid]);
  
    return (
      <>
      <Search setText={setInputText} />
        <div className={classes.flex}>
          {products === undefined 
          ? ''
          : showProducts.length !== 0 
          ? showProducts.map((product) => {
            return (
              <Link
                  to={{ pathname: '/productdetail', selectedItemId: product.id }}
                  key={product.id}
                >
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia 
                    component="img"
                    alt='Contemplative Reptile'
                    image={product.imagePath}
                    title="Contemplative Reptile"
                    width='500'
                    height='300'
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <span>¥{product.price.toLocaleString()}</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              </Link>
            );
          })
          : filterAlert()}
        </div>
      </>
    );
}

export default ProductList;