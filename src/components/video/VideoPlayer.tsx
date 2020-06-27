import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import {
  loadStart,
  load,
  resetVideo,
  updatePlayStatus,
} from "../../store/modules/video";
import { RootState } from "../../types/store";

const DEMO_VIDEO_SOURCE =
  "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  videoPlayer: {
    width: "100%",
    height: "100%",
  },
});

const VideoPlayer = () => {
  const videoRef = React.useRef<Video>(null);
  const dispatch = useDispatch();
  const videoUri = useSelector((state: RootState) => state.video.uri);

  const onLoadStart = () => dispatch(loadStart());
  const onLoad = () => {
    if (videoRef.current) {
      dispatch(load(videoRef.current));
    }
  };

  const onPlayBackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      if (status.didJustFinish) {
        dispatch(resetVideo());
      } else {
        dispatch(
          updatePlayStatus(status.durationMillis, status.positionMillis)
        );
      }
    }
  };

  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
        <Video
          source={{ uri: videoUri || DEMO_VIDEO_SOURCE }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay={false}
          useNativeControls={false}
          style={styles.videoPlayer}
          onLoadStart={onLoadStart}
          onLoad={onLoad}
          onPlaybackStatusUpdate={onPlayBackStatusUpdate}
          ref={videoRef}
        />
      </View>
    </TouchableNativeFeedback>
  );
};

export default VideoPlayer;
