export enum AuthActionTypes {
  SET_AUTH = 'SET_AUTH',
  DISABLE_AUTH = 'DISABLE_AUTH',
}
interface SetAuthAction {
  type: AuthActionTypes.SET_AUTH;
}
interface DisableAuthAction {
  type: AuthActionTypes.DISABLE_AUTH;
}

export type AuthActions = SetAuthAction | DisableAuthAction;

export interface AuthState {
  isAuth: boolean | null;
}

const initialState: AuthState = {
  isAuth: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return {
        ...state,
        isAuth: true,
      };
    case AuthActionTypes.DISABLE_AUTH:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};
