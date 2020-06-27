import React from "react";
import { Animated, StyleSheet, TouchableNativeFeedback } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/store";
import { toggleControlPanel } from "../../store/modules/video";
import TogglePlayButton from "../common/TogglePlayButton";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const FADE_ANIMATION_DURATION = 150; // ms

const VideoControlPanel = () => {
  const dispatch = useDispatch();
  const isVideoControlPanelVisible = useSelector(
    (state: RootState) => state.video.isControlPanelVisible
  );
  const fadeOpactiyRef = React.useRef<Animated.Value>(
    new Animated.Value(isVideoControlPanelVisible ? 1 : 0)
  );

  const fadeIn = () =>
    Animated.timing(fadeOpactiyRef.current, {
      toValue: 1,
      duration: FADE_ANIMATION_DURATION,
    }).start();

  const fadeOut = () =>
    Animated.timing(fadeOpactiyRef.current, {
      toValue: 0,
      duration: FADE_ANIMATION_DURATION,
    }).start();

  const onPress = () => dispatch(toggleControlPanel());

  React.useEffect(() => {
    if (isVideoControlPanelVisible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isVideoControlPanelVisible]);

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Animated.View
        style={{ ...styles.container, opacity: fadeOpactiyRef.current }}
      >
        {isVideoControlPanelVisible && <TogglePlayButton />}
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

export default VideoControlPanel;
