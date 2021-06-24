import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { getProducts, getSumPrice } from '../Reducks/products/selectors';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 500,
    height: 300,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width:300
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 350,
  },
}));

const ProductDetail = () => {
  const selector = useSelector(state => state);
  const products = getProducts(selector)
  const selectedId = useLocation().selectedItemId;
  const [num, setNum] = useState(1);
  const sumPrice = getSumPrice(selector)

  const selectedItem = 
    products === undefined ? '' : products.filter((product) => product.id === selectedId)

    const classes = useStyles();
    const theme = useTheme();

    const handleChangeNum = (e) => {
      setNum(e.target.value)
    }

  return (
    <>
    {products === undefined ? ''
    :(
    
      <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
          {selectedItem[0].name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {selectedItem[0].price}円
          </Typography>
          <Typography variant="subtitle" color="textSecondary">
            {selectedItem[0].description}
          </Typography>
        </CardContent>
        <CardContent className={classes.content}>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">数量</InputLabel>
            <Select
              native
              defaultvalue={1}
              onChange={handleChangeNum}
              label="数量"
              inputProps={{
                name: 'productNum',
                id: 'outlined-age-native-simple',
              }}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Select>
          </FormControl>
        </CardContent>
        <CardContent>
            <FormControl component="fieldset">
              <FormLabel component="legend" className="sum-money">
                合計金額&nbsp;
                {sumPrice}
                円（税抜き）
              </FormLabel>
            </FormControl>
          </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={selectedItem[0].imagePath}
        title="beauty"
      />
    </Card>
    )}
    </>
  );
}

export default ProductDetail;