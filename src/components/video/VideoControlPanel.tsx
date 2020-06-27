import React from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  LayoutChangeEvent,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../types/store";
import {
  toggleControlPanelWithTimeout,
  seekVideoForward,
  seekVideoBackward,
} from "../../store/modules/video";
import TogglePlayButton from "../common/TogglePlayButton";
import ProgressBar from "../common/ProgressBar";
import Seek from "../common/Seek";
import MenuBar from "../common/MenuBar";

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
const DOUBLE_TAP_THRESHOLD = 300; // ms

const VideoControlPanel = () => {
  const dispatch = useDispatch();
  const isVideoControlPanelVisible = useSelector(
    (state: RootState) => state.video.isControlPanelVisible
  );
  const isSeekingForward = useSelector(
    (state: RootState) => state.video.isSeekingForward
  );
  const isSeekingBackward = useSelector(
    (state: RootState) => state.video.isSeekingBackward
  );
  const fadeOpactiyRef = React.useRef<Animated.Value>(
    new Animated.Value(isVideoControlPanelVisible ? 1 : 0)
  );
  const doubleTapTimeoutRef: React.MutableRefObject<
    number | null
  > = React.useRef<number>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>();

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

  const onSingleTap = (event: GestureResponderEvent) =>
    dispatch(toggleControlPanelWithTimeout());
  const onDoubleTap = (event: GestureResponderEvent) => {
    if (containerWidth === undefined) {
      return;
    }

    if (event.nativeEvent.locationX > 0.5 * containerWidth) {
      dispatch(seekVideoForward());
    } else {
      dispatch(seekVideoBackward());
    }
  };

  const onPress = (event: GestureResponderEvent) => {
    if (!isVideoControlPanelVisible) {
      onSingleTap(event);
    } else {
      if (doubleTapTimeoutRef.current !== null) {
        // handle double tap
        clearTimeout(doubleTapTimeoutRef.current);
        doubleTapTimeoutRef.current = null;
        onDoubleTap(event);
      } else {
        doubleTapTimeoutRef.current = setTimeout(() => {
          onSingleTap(event);
          doubleTapTimeoutRef.current = null;
        }, DOUBLE_TAP_THRESHOLD);
      }
    }
  };

  React.useEffect(() => {
    if (isVideoControlPanelVisible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [isVideoControlPanelVisible]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={{ ...styles.container, opacity: fadeOpactiyRef.current }}
        onLayout={(e: LayoutChangeEvent) =>
          setContainerWidth(e.nativeEvent.layout.width)
        }
      >
        {isVideoControlPanelVisible && (
          <React.Fragment>
            <MenuBar />
            <TogglePlayButton />
            <Seek seekDirection="right" visible={isSeekingForward} />
            <Seek seekDirection="left" visible={isSeekingBackward} />
            <ProgressBar />
          </React.Fragment>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default VideoControlPanel;
