import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { Video } from "expo-av";

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
  return (
    <TouchableNativeFeedback>
      <View style={styles.container}>
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
      </View>
    </TouchableNativeFeedback>
  );
};

export default VideoPlayer;
