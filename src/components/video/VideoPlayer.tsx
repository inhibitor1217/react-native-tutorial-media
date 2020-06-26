import React from "react";
import { StyleSheet } from "react-native";
import { Video } from "expo-av";

const DEMO_VIDEO_SOURCE =
  "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

const styles = StyleSheet.create({
  videoPlayer: {
    width: "100%",
    height: "100%",
  },
});

const VideoPlayer = () => {
  return (
    <Video
      source={{ uri: DEMO_VIDEO_SOURCE }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode={Video.RESIZE_MODE_CONTAIN}
      shouldPlay
      isLooping
      useNativeControls={false}
      style={styles.videoPlayer}
    />
  );
};

export default VideoPlayer;
