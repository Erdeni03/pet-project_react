interface SetCanvasAction {
    type: CanvasActionTypes.SET_CANVAS;
    payload: string
}

interface SetSocket {
    type: CanvasActionTypes.SET_SOCKET;
    payload: WebSocket
}

interface SetSessionId {
    type: CanvasActionTypes.SET_SESSIONID;
    payload: string
}

interface SetCtxAction {
    type: CanvasActionTypes.SET_CTX;
    payload: any
}

interface UndoListAction {
    type: CanvasActionTypes.SET_UNDOLIST;
    payload: string[]
}

interface RedoListAction {
    type: CanvasActionTypes.SET_REDOLIST;
    payload: any[]
}


interface UndoHandler {
    type: CanvasActionTypes.UNDO;
}

interface RedoHandler {
    type: CanvasActionTypes.REDO;
}

interface SetUserName {
    type: CanvasActionTypes.SET_USERNAME;
    payload: string
}

export type CanvasAction =
    SetCanvasAction
    | UndoListAction
    | RedoListAction
    | UndoHandler
    | SetCtxAction
    | RedoHandler
    | SetUserName
    | SetSocket
    | SetSessionId


interface CanvasState {
    canvas: any,
    ctx: any,
    undoList: any[]
    redoList: any[]
    userName: string,
    sessionId: null | string,
    socket: null | WebSocket
}

export enum CanvasActionTypes {
    SET_CANVAS = 'SET_CANVAS',
    SET_CTX = 'SET_CTX',
    SET_UNDOLIST = 'SET_UNDOLIST',
    SET_REDOLIST = 'SET_REDOLIST',
    UNDO = 'UNDO',
    REDO = "REDO",
    SET_USERNAME = 'SET_USERNAME',
    SET_SESSIONID = 'SET_SESSIONID',
    SET_SOCKET = 'SET_SOCKET'

}


const initialState: CanvasState = {
    canvas: null,
    ctx: null,
    undoList: [],
    redoList: [],
    userName: '',
    sessionId: null,
    socket: null
}

export const paintCanvasReducer = (state = initialState, action: CanvasAction): CanvasState => {

    switch (action.type) {
        case CanvasActionTypes.SET_CANVAS:
            return {
                ...state,
                canvas: action.payload
            }
        case CanvasActionTypes.SET_SOCKET:
            return {
                ...state,
                socket: action.payload
            }
        case CanvasActionTypes.SET_SESSIONID:
            return {
                ...state,
                sessionId: action.payload
            }
        case CanvasActionTypes.SET_CTX:
            return {
                ...state,
                ctx: action.payload
            }
        case CanvasActionTypes.SET_UNDOLIST:
            return {
                ...state,
                undoList: [...state.undoList, action.payload]
            }
        case CanvasActionTypes.SET_USERNAME:

            return {
                ...state,
                userName: action.payload
            }
        case CanvasActionTypes.SET_REDOLIST:
            return {
                ...state,
                redoList: action.payload
            }
        case CanvasActionTypes.UNDO:
            let ctx = state.canvas.getContext('2d')
            if (state.undoList.length > 0) {
                let dataUrl = state.undoList.pop()
                state.redoList.push(state.canvas.toDataURL())
                let img = new Image()
                img.src = dataUrl
                img.onload = () => {
                    ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
                    ctx.drawImage(img, 0, 0, state.canvas.width, state.canvas.height)
                }
            } else {
                ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
            }

            return {
                ...state,
                undoList: state.undoList,
                canvas: state.canvas,
                redoList: state.redoList
            }
        case CanvasActionTypes.REDO:

            let ctx2 = state.canvas.getContext('2d')
            if (state.redoList.length > 0) {
                let dataUrl2 = state.redoList.pop()
                state.undoList.push(state.canvas.toDataURL())
                let img = new Image()
                img.src = dataUrl2
                img.onload = () => {
                    ctx2.clearRect(0, 0, state.canvas.width, state.canvas.height)
                    ctx2.drawImage(img, 0, 0, state.canvas.width, state.canvas.height)
                }
            }

            return {
                ...state,
                undoList: state.undoList,
                canvas: state.canvas,
                redoList: state.redoList
            }
        default:
            return state
    }
}