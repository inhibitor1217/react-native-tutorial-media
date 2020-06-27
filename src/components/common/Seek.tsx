import React from "react";
import { Animated, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../types/store";
import { USE_LONG_INTERVAL_THRESHOLD } from "../../store/modules/video";

interface SeekProps {
  visible: boolean;
  seekDirection: "left" | "right";
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transform: [{ translateY: 8 }],
  },
  left: {
    left: "25%",
  },
  right: {
    right: "25%",
  },
  text: {
    color: "#ffffff",
  },
});

const FADE_ANIMATION_DURATION = 150;

const Seek = (props: SeekProps) => {
  const duration = useSelector((state: RootState) => state.video.duration);
  const isUsingLongJump = duration > USE_LONG_INTERVAL_THRESHOLD;

  const fadeOpactiyRef = React.useRef<Animated.Value>(
    new Animated.Value(props.visible ? 1 : 0)
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

  React.useEffect(() => {
    if (props.visible) {
      fadeIn();
    } else {
      fadeOut();
    }
  }, [props.visible]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...(props.seekDirection === "left" ? styles.left : styles.right),
        opacity: fadeOpactiyRef.current,
      }}
    >
      <MaterialIcons
        name={props.seekDirection === "left" ? "fast-rewind" : "fast-forward"}
        color="#ffffff"
        size={36}
      />
      <Text style={styles.text}>{isUsingLongJump ? "10초" : "5초"}</Text>
    </Animated.View>
  );
};

export default Seek;
