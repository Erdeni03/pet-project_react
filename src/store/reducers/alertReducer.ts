interface SetAlert {
  type: AlertActionTypes.SET_ALERT
  payload: {
    isOpen: boolean
    text: string
    variant: Color
  }
}
interface HideAlert {
  type: AlertActionTypes.HIDE_ALERT
  payload: {
    isOpen: boolean
    text: string
    variant: Color
  }
}

export type AlertActions = SetAlert | HideAlert

export enum AlertActionTypes {
  SET_ALERT = 'SET_ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
}

export interface AlertState {
  isOpen: boolean
  text: string
  variant: Color
  autoHideTime?: number
}
export type Color = 'success' | 'error' | 'warning'
// export enum Color {
//   SUCCESS = 'success',
//   ERROR = 'error',
//   WARNING = 'warning',
// }
const initialState: AlertState = {
  isOpen: false,
  text: '',
  variant: 'success',
  autoHideTime: 2000,
}

export const alertReducer = (
  state = initialState,
  action: AlertActions
): AlertState => {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT:
      return {
        ...state,
        ...action.payload,
      }
    case AlertActionTypes.HIDE_ALERT:
      return {
        ...state,
        isOpen: false,
      }
    default:
      return state
  }
}
