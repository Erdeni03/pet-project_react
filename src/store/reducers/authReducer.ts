import firebase from 'firebase/compat/app'

export enum AuthActionTypes {
  SET_AUTH = 'SET_AUTH',
  DISABLE_AUTH = 'DISABLE_AUTH',
  INITIAL_USER = 'INITIAL_USER',
}

interface SetAuthAction {
  type: AuthActionTypes.SET_AUTH
}

interface DisableAuthAction {
  type: AuthActionTypes.DISABLE_AUTH
}

interface InitialCurrentUser {
  type: AuthActionTypes.INITIAL_USER
  payload: null | firebase.User
}

export type AuthActions = SetAuthAction | DisableAuthAction | InitialCurrentUser

export interface AuthState {
  isAuth: boolean | null
  currentUser: null | firebase.User
  loading: boolean
}

const initialState: AuthState = {
  isAuth: null,
  currentUser: null,
  loading: true,
}

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return {
        ...state,
        isAuth: true,
      }
    case AuthActionTypes.DISABLE_AUTH:
      return {
        ...state,
        isAuth: false,
      }
    case AuthActionTypes.INITIAL_USER:
      console.log(action.payload, 'payloadpayloadpayloadpayload')
      return {
        ...state,
        currentUser: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
