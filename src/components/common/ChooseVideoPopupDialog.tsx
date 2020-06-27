import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Dialog, {
  DialogContent,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";

interface ChooseVideoPopupDialogProps {
  visible: boolean;
  dismiss(): void;
}

const styles = StyleSheet.create({
  container: {
    width: 240,
  },
  content: {
    paddingTop: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 20,
    color: "#0277BD",
  },
  footerButton: {
    height: 40,
  },
  footerButtonText: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.5)",
  },
});

const ChooseVideoPopupDialog = (props: ChooseVideoPopupDialogProps) => {
  return (
    <Dialog
      visible={props.visible}
      onTouchOutside={props.dismiss}
      footer={
        <DialogFooter>
          <DialogButton
            style={styles.footerButton}
            textStyle={styles.footerButtonText}
            text="취소"
            onPress={props.dismiss}
          />
        </DialogFooter>
      }
    >
      <DialogContent style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.content}>
            <Text style={styles.contentText}>새 영상 불러오기</Text>
          </View>
        </TouchableWithoutFeedback>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseVideoPopupDialog;
