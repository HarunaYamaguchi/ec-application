import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getOrderLog = createSelector(
  [usersSelector],
  (state) => state.orderLog
)

export const getOrdersInfo = createSelector(
  [usersSelector],
  (state) => state.ordersInfo
);

export const getOrders = createSelector(
  [usersSelector],
  (state) => state.orders
);

export const getProductInCart = createSelector(
  [usersSelector],
  (state) => state.cartList
);

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
);

export const getUserId = createSelector(
  [usersSelector],
  (state) => state.uid
);

export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username ? state.username : 'ゲスト'
);
