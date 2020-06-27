import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 8,
    left: 0,
    paddingHorizontal: 16,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

const MenuBar = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <MaterialIcons name="more-vert" color="#ffffff" size={24} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MenuBar;
