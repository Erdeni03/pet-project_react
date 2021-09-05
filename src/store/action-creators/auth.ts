import { AuthActionTypes } from '../reducers/authReducer'
import { User } from 'firebase/auth'

export const setAuth = () => {
  return {
    type: AuthActionTypes.SET_AUTH,
  }
}

export const disableAuth = () => {
  return {
    type: AuthActionTypes.DISABLE_AUTH,
  }
}

export const initialUser = (data: User | null) => {
  return {
    type: AuthActionTypes.INITIAL_USER,
    payload: data,
  }
}
