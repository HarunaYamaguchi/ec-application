import { createSelector } from 'reselect';

const usersSelector = (state) => state.users;

export const getOrder = createSelector(
  [usersSelector],
  (state) => state.orders
)

export const getCart = createSelector(
  [usersSelector],
  (state) => state.cartList
) 

export const getIsSignedIn = createSelector(
  [usersSelector],
  (state) => state.isSignedIn
)

export const getUserId = createSelector(
  [usersSelector],
  (state) => state.uid
)
export const getUserName = createSelector(
  [usersSelector],
  (state) => state.username
)
