// action types
import { SET_USER, LOGOUT_USER } from '../actions/user';

// types
import { UserType } from '../types';

interface UserState extends UserType {}

const initialState: UserState = {
  userName: null,
  token: null
};

export const userReducer = (state: UserState = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...action.payload
      } as UserState;
    case LOGOUT_USER:
      return initialState as UserState;
    default:
      return state as UserState;
  }
};
