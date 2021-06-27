import { createSelector } from "reselect";

const productsSelector = (state) => state.products;

export const getProducts = createSelector(
  [productsSelector],(state) => {
    return state.list;
  }
);

export const getSumPrice = createSelector(
  [productsSelector],(state) => {
    return state.sumPrice;
  }
);

export const getOrdersInfo = createSelector(
  [productsSelector],
  (state) => state.ordersInfo
);