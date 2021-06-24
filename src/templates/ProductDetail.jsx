import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getProducts } from '../Reducks/products/selectors';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const ProductDetail = () => {
  const selector = useSelector(state => state);
  const products = getProducts(selector)
  const selectedId = useLocation().selectedItemId;

  const selectedItem = 
    products === undefined ? '' : products.filter((product) => product.id === selectedId)

  const classes = useStyles();

  return (
    <>
    {products === undefined ? ''
    :(
    
      <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={selectedItem[0].name}
      />
      <CardMedia
        className={classes.media}
        image={selectedItem[0].imagePath}
        title="beauty"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {selectedItem[0].description}
        </Typography>
      </CardContent>
    </Card>
    )}
    </>
  );
}

export default ProductDetail;