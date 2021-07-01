import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getProducts } from '../Reducks/products/selectors';
import {addOrdersInfo} from '../Reducks/users/Operations';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button'
import { getProductInCart,getUserId } from '../Reducks/users/Selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: 900,
    height: 600,
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
    width: 700,
    height: 600
  },
}));


const ProductDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const selector = useSelector((state) => state);
  const products = getProducts(selector)
  const selectedId = useLocation().selectedItemId;
  const handleLink = (path) => history.push(path)

  const [num, setNum] = useState(1)
  const [value, setValue] = useState('')
  const [labelName, setLabelName] = useState('')
  const uid = getUserId(selector);
  const carts = getProductInCart(selector);

  const selectedItem = 
    products === undefined ? '' : products.filter((product) => product.id === selectedId)

    const classes = useStyles();

    const handleChangeNum = (e) => {
      setNum(e.target.value)
    }

    const handleChangeLabel = (e) => {
      setValue(e.target.value)
      setLabelName(e.target.name)
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
          <Typography variant="subtitle2" color="textSecondary">
            {selectedItem[0].description}
          </Typography>
        </CardContent>
        <CardContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">種類</FormLabel>
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
            value={value}
            onChange={handleChangeLabel}
          >
            <FormControlLabel
              name="0"
              value={String(selectedItem[0].kind)}
              control={<Radio color="primary" />}
              label={`${selectedItem[0].kind}`}
            />
            <FormControlLabel
              name="1"
              value={String(selectedItem[0].kind2)}
              control={<Radio color="primary" />}
              label={`${selectedItem[0].kind2}`}
            />
          </RadioGroup>
        </FormControl>
        </CardContent>
        <CardContent className={classes.content}>
          <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">数量</InputLabel>
            <Select
              native
              defaultValue={1}
              onChange={handleChangeNum}
              label="数量"
              inputProps={{
                name: 'itemNum',
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
          <Button 
            variant="contained" color="primary"
            onClick={() => {
            uid ? (
            dispatch(addOrdersInfo(selectedId, uid, num, labelName, carts),
            handleLink('/cartlist')
            )
            )
            : handleLink('/login');
          }} >カートに進む</Button>
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