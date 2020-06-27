import React from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ChooseVideoPopupDialog from "./ChooseVideoPopupDialog";
import {
  clearControlPanelTimeout,
  pauseVideo,
} from "../../store/modules/video";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const [
    isChooseVideoPopupVisible,
    setIsChooseVideoPopupVisible,
  ] = React.useState<boolean>(false);
  const onPressMoreMenu = () => {
    dispatch(pauseVideo());
    setIsChooseVideoPopupVisible(true);
    clearControlPanelTimeout();
  };
  const onDismissChooseVideoPopup = () => setIsChooseVideoPopupVisible(false);
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPressMoreMenu}>
        <MaterialIcons name="more-vert" color="#ffffff" size={24} />
      </TouchableWithoutFeedback>
      <ChooseVideoPopupDialog
        visible={isChooseVideoPopupVisible}
        dismiss={onDismissChooseVideoPopup}
      />
    </View>
  );
};

export default MenuBar;
