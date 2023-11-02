import { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { colors } from "../../Utils/colors";
import { moderateScale } from "react-native-size-matters";
import { fonts } from "../../Utils/fonts";

export default function InputField({ label, ...props }) {
  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        outlineColor={colors.GRAY1}
        activeOutlineColor={colors.GREY20}
        selectionColor={colors.BLACK}
        placeholderTextColor={colors.BLUE1}
        style={styles.input}
        contentStyle={styles.inputText}
        {...props}
      />
      {props.error ? (
        <Text style={styles.error}>Enter an email address</Text>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginTop: moderateScale(5),
    fontFamily: fonts.MEDIUM,
  },

  inputText: {
    fontFamily: fonts.MEDIUM,
  },

  error: {
    color: colors.RED_BORDER,
    fontFamily: fonts.REGULAR,
    fontSize: moderateScale(12),
    width: "40%",
    alignSelf: "flex-start",
    paddingTop: moderateScale(5),
    marginLeft: moderateScale(20),
  },
});
