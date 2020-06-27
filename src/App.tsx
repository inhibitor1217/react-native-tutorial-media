import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { registerRootComponent } from "expo";

import VideoPlayer from "./components/video/VideoPlayer";
import VideoControlPanel from "./components/video/VideoControlPanel";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar hidden />
        <VideoPlayer />
        <VideoControlPanel />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(App);
