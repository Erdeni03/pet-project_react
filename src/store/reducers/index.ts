import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { paintToolReducer } from './paintToolReducer';
import { paintCanvasReducer } from './paintCanvasReducer';
import { authReducer } from './authReducer';

export const rootReducers = combineReducers({
  user: userReducer,
  paintTool: paintToolReducer,
  paintCanvas: paintCanvasReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
