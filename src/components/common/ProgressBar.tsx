import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../types/store";

const PROGRESS_BAR_SIZE = 12;
const PROGRESS_TRACK_HEIGHT = 2;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
    width: "100%",
  },
  text: {
    color: "#ffffff",
    marginBottom: 8,
    fontSize: 12,
  },
  bar: {
    width: "100%",
    height: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  track: {
    flex: 1,
    height: PROGRESS_TRACK_HEIGHT,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  rail: {
    position: "absolute",
    left: 0,
    top: (PROGRESS_BAR_SIZE - PROGRESS_TRACK_HEIGHT) * 0.5,
    height: PROGRESS_TRACK_HEIGHT,
    backgroundColor: "#81D4FA",
  },
  knob: {
    position: "absolute",
    top: 0,
    width: PROGRESS_BAR_SIZE,
    height: PROGRESS_BAR_SIZE,
    borderRadius: 0.5 * PROGRESS_BAR_SIZE,
    backgroundColor: "#81D4FA",
    transform: [{ translateX: -0.5 * PROGRESS_BAR_SIZE }],
  },
});

function padDigits(number: number, digits: number) {
  return (
    Array(Math.max(digits - String(number).length + 1, 0)).join("0") + number
  );
}

const formatTimeMillis = (time: number) => {
  const hours = Math.floor(time / (60 * 60 * 1000));
  const minutes = Math.floor(time / (60 * 1000)) % 60;
  const seconds = Math.floor(time / 1000) % 60;
  return [
    ...(hours ? [hours] : []),
    hours ? padDigits(minutes, 2) : minutes,
    padDigits(seconds, 2),
  ].join(":");
};

const ProgressBar = () => {
  const videoDuration = useSelector((state: RootState) => state.video.duration);
  const videoPosition = useSelector((state: RootState) => state.video.position);

  const percentage = videoDuration
    ? (videoPosition / videoDuration) * 100
    : null;

  const railStyle = { width: percentage ? `${percentage}%` : 0 };
  const knobStyle = { left: percentage ? `${percentage}%` : 0 };

  return (
    <View style={styles.container}>
      {videoDuration !== undefined && (
        <Text style={styles.text}>{`${formatTimeMillis(
          videoPosition
        )} / ${formatTimeMillis(videoDuration)}`}</Text>
      )}
      <View style={styles.bar}>
        <View style={styles.track} />
        <View style={{ ...styles.rail, ...railStyle }} />
        <View style={{ ...styles.knob, ...knobStyle }} />
      </View>
    </View>
  );
};

export default ProgressBar;
