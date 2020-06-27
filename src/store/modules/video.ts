import { VideoState } from "../../types/store";

enum VideoActionTypes {
  LOAD = "video/load",
  TOGGLE_CONTROL_PANEL = "video/toggleControlPanel",
}

const initialState: VideoState = {
  isControlPanelVisible: true,
};

export const load = () => ({ type: VideoActionTypes.LOAD });
export const toggleControlPanel = () => ({
  type: VideoActionTypes.TOGGLE_CONTROL_PANEL,
});

type VideoAction =
  | ReturnType<typeof load>
  | ReturnType<typeof toggleControlPanel>;

const videoReducer = (
  state: VideoState = initialState,
  action: VideoAction
) => {
  switch (action.type) {
    case VideoActionTypes.LOAD:
      return state;
    case VideoActionTypes.TOGGLE_CONTROL_PANEL:
      return { ...state, isControlPanelVisible: !state.isControlPanelVisible };
    default:
      return state;
  }
};

export default videoReducer;
