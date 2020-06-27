import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { TouchableNativeFeedback, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/store";
import { VideoPlayState } from "../../types/video";
import { playVideo, pauseVideo } from "../../store/modules/video";

function getIconName(videoPlayState: VideoPlayState) {
  switch (videoPlayState) {
    case VideoPlayState.Paused:
      return "play-arrow";
    case VideoPlayState.Playing:
      return "pause";
    default:
      return "";
  }
}

const TogglePlayButton = () => {
  const dispatch = useDispatch();
  const videoPlayState = useSelector(
    (state: RootState) => state.video.playState
  );
  const onPress = () => {
    switch (videoPlayState) {
      case VideoPlayState.Paused:
        dispatch(playVideo());
        break;
      case VideoPlayState.Playing:
        dispatch(pauseVideo());
        break;
      default:
        break;
    }
  };
  return (
    <TouchableNativeFeedback onPress={onPress}>
      {videoPlayState === VideoPlayState.Pending ? (
        <ActivityIndicator size="large" color="#797979" />
      ) : (
        <MaterialIcons
          name={getIconName(videoPlayState)}
          color="#ffffff"
          size={48}
        />
      )}
    </TouchableNativeFeedback>
  );
};

export default TogglePlayButton;
