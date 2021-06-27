export const FETCH_PRODUCTS = "FETCH_PRODUCTS";

export const fetchProductsAction= (products) => {
  return {
    type:"FETCH_PRODUCTS",
    payload: products
  };
};

export const FETCH_SUM_PRICE = "FETCH_SUM_PRICE";

export const fetchSumPriceAction = (sumPrice) => {
  return {
    type: "FETCH_SUM_PRICE",
    payload: sumPrice
  };
};

export const ADD_ORDERS_INFO = "ADD_ORDERS_INFO";

export const addOrdersInfo = (selectedId,labelName,num) => {
  return {
    type: "ADD_ORDERS_INFO",
    payload: [selectedId,labelName,num]
  }
}