import { AuthActionTypes } from '../reducers/authReducer';

export const setAuth = () => {
  return {
    type: AuthActionTypes.SET_AUTH,
  };
};

export const disableAuth = () => {
  return {
    type: AuthActionTypes.DISABLE_AUTH,
  };
};
