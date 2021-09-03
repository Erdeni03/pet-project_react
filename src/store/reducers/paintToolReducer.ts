interface SetToolAction {
  type: ToolActionTypes.SET_TOOL;
  payload: string;
}

interface SetFillColor {
  type: ToolActionTypes.SET_FILLCOLOR;
  payload: string;
}

interface SetLineWidth {
  type: ToolActionTypes.SET_LINEWIDTH;
  payload: number;
}

interface SetStrokeColor {
  type: ToolActionTypes.SET_STROKECOLOR;
  payload: number;
}

// interface FetchUsersErrorAction {
//     type: UserActionTypes.FETCH_USERS_ERROR;
//     payload: string;
// }
export type ToolAction =
  | SetToolAction
  | SetFillColor
  | SetLineWidth
  | SetStrokeColor;

interface ToolState {
  tool: any;
}

export enum ToolActionTypes {
  SET_TOOL = 'SET_TOOL',
  SET_FILLCOLOR = 'SET_FILLCOLOR',
  SET_LINEWIDTH = 'SET_LINEWIDTH',
  SET_STROKECOLOR = 'SET_STROKECOLOR',
}

const initialState: ToolState = {
  tool: null,
};

export const paintToolReducer = (
  state = initialState,
  action: ToolAction
): ToolState => {
  switch (action.type) {
    case ToolActionTypes.SET_TOOL:
      return { tool: action.payload };
    case ToolActionTypes.SET_FILLCOLOR:
      state.tool.ctx.fillStyle = action.payload;
      return { tool: state.tool };
    case ToolActionTypes.SET_STROKECOLOR:
      state.tool.ctx.strokeStyle = action.payload;
      return { tool: state.tool };
    case ToolActionTypes.SET_LINEWIDTH:
      state.tool.ctx.lineWidth = action.payload;
      return {
        tool: state.tool,
      };
    default:
      return state;
  }
};
