import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { registerRootComponent } from "expo";

import store from "./store";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Hello, world!</Text>
        </View>
      </Provider>
    </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default registerRootComponent(App);
