import { AlertActionTypes, AlertState } from '../reducers/alertReducer'

export const setAlert = (data: AlertState) => ({
  type: AlertActionTypes.SET_ALERT,
  payload: data,
})

export const hideAlert = () => ({
  type: AlertActionTypes.HIDE_ALERT,
})
