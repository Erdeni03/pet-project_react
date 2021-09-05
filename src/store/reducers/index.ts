import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { paintToolReducer } from './paintToolReducer'
import { paintCanvasReducer } from './paintCanvasReducer'
import { authReducer } from './authReducer'
import { alertReducer } from './alertReducer'

export const rootReducers = combineReducers({
  user: userReducer,
  paintTool: paintToolReducer,
  paintCanvas: paintCanvasReducer,
  auth: authReducer,
  alert: alertReducer,
})

export type RootState = ReturnType<typeof rootReducers>
