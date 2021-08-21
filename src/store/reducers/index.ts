import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {paintToolReducer} from "./paintToolReducer";
import {paintCanvasReducer} from "./paintCanvasReducer";


export const rootReducers = combineReducers({
    user: userReducer,
    paintTool: paintToolReducer,
    paintCanvas: paintCanvasReducer
})

export type RootState = ReturnType<typeof rootReducers>