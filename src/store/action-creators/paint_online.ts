import { ToolAction, ToolActionTypes } from '../reducers/paintToolReducer';
import { Dispatch } from 'redux';
import {
  CanvasAction,
  CanvasActionTypes,
} from '../reducers/paintCanvasReducer';

export const setTool = (data: any) => {
  return (dispatch: Dispatch<ToolAction>) => {
    dispatch({ type: ToolActionTypes.SET_TOOL, payload: data });
  };
};

export const setFillColor = (data: any) => {
  return {
    type: ToolActionTypes.SET_FILLCOLOR,
    payload: data,
  };
};

export const setStrokeColor = (data: any) => {
  return {
    type: ToolActionTypes.SET_STROKECOLOR,
    payload: data,
  };
};

export const setLineWidth = (data: any) => {
  return (dispatch: Dispatch<ToolAction>) => {
    dispatch({ type: ToolActionTypes.SET_LINEWIDTH, payload: +data });
  };
};

// CANVAS ACTIONS

export const setCanvas = (data: any) => {
  return (dispatch: Dispatch<CanvasAction>) => {
    dispatch({ type: CanvasActionTypes.SET_CANVAS, payload: data });
  };
};

export const setUsername = (data: string) => {
  return {
    type: CanvasActionTypes.SET_USERNAME,
    payload: data,
  };
};

export const setSocket = (data: WebSocket) => {
  return {
    type: CanvasActionTypes.SET_SOCKET,
    payload: data,
  };
};

export const setSessionId = (data: string) => {
  return {
    type: CanvasActionTypes.SET_SESSIONID,
    payload: data,
  };
};
export const setCtx = (data: any) => {
  return {
    type: CanvasActionTypes.SET_CTX,
    payload: data,
  };
};

export const pushUndo = (data: any) => {
  return {
    type: CanvasActionTypes.SET_UNDOLIST,
    payload: data,
  };
};

export const undo = () => {
  return {
    type: CanvasActionTypes.UNDO,
  };
};

export const redo = () => {
  return {
    type: CanvasActionTypes.REDO,
  };
};
