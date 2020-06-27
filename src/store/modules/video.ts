import { VideoState, RootState } from "../../types/store";
import { VideoPlayState } from "../../types/video";
import { ThunkAction } from "redux-thunk";
import { Video } from "expo-av";

const LOAD_START = "video/loadStart" as const;
const LOAD = "video/load" as const;
const TOGGLE_CONTROL_PANEL = "video/toggleControlPanel" as const;
const HIDE_CONTROL_PANEL = "video/hideControlPanel" as const;
const SET_PLAY_STATE = "video/setPlayState" as const;

const initialState: VideoState = {
  videoRef: null,
  isControlPanelVisible: true,
  playState: VideoPlayState.Paused,
};

export const loadStart = () => ({ type: LOAD_START });
export const load = (videoRef: Video) => ({ type: LOAD, videoRef });
export const toggleControlPanel = () => ({
  type: TOGGLE_CONTROL_PANEL,
});
export const hideControlPanel = () => ({
  type: HIDE_CONTROL_PANEL,
});
const setPlayState = (videoPlayState: VideoPlayState) => ({
  type: SET_PLAY_STATE,
  videoPlayState,
});

type VideoAction =
  | ReturnType<typeof loadStart>
  | ReturnType<typeof load>
  | ReturnType<typeof toggleControlPanel>
  | ReturnType<typeof hideControlPanel>
  | ReturnType<typeof setPlayState>;

export const playVideo = (): ThunkAction<
  Promise<void>,
  RootState,
  null,
  VideoAction
> => {
  return async (dispatch, getState) => {
    const videoRef = getState().video.videoRef;
    if (!videoRef) {
      return;
    }
    dispatch(setPlayState(VideoPlayState.Pending));
    await videoRef.playAsync().then(() => {
      dispatch(setPlayState(VideoPlayState.Playing));
      dispatch(hideControlPanel());
    });
  };
};

export const pauseVideo = (): ThunkAction<
  Promise<void>,
  RootState,
  null,
  VideoAction
> => {
  return async (dispatch, getState) => {
    const videoRef = getState().video.videoRef;
    if (!videoRef) {
      return;
    }
    await videoRef.pauseAsync().then(() => {
      dispatch(setPlayState(VideoPlayState.Paused));
    });
  };
};

const videoReducer = (
  state: VideoState = initialState,
  action: VideoAction
) => {
  switch (action.type) {
    case LOAD_START:
      return { ...state, playState: VideoPlayState.Pending };
    case LOAD:
      return { ...initialState, videoRef: action.videoRef };
    case TOGGLE_CONTROL_PANEL:
      return { ...state, isControlPanelVisible: !state.isControlPanelVisible };
    case HIDE_CONTROL_PANEL:
      return { ...state, isControlPanelVisible: false };
    case SET_PLAY_STATE:
      return { ...state, playState: action.videoPlayState };
    default:
      return state;
  }
};

export default videoReducer;
