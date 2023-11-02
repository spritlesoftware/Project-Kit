import { StyleSheet } from "react-native";
import { colors } from "../../Utils/colors";
import { moderateScale } from "react-native-size-matters";
import { fonts } from "../../Utils/fonts";

const styles = StyleSheet.create({
  center: {
    backgroundColor: colors.WHITE,
    height: "100%",
  },

  inputContainer: {
    alignItems: "center",
  },

  orContainer: {
    textAlign: "center",
    marginTop: moderateScale(20),
    fontSize: moderateScale(14),
    color: colors.GRAY_TEXT,
    fontFamily: fonts.MEDIUM,
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    fontFamily: fonts.BOLD,
  },

  divider: {
    width: "90%",
    alignSelf: "center",
    marginTop: moderateScale(20),
    borderWidth: 0.1,
    borderColor: colors.GREY20,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: moderateScale(20),
  },

  socialLogo: {
    margin: moderateScale(20),
    borderWidth: 1,
    padding: moderateScale(10),
    borderRadius: moderateScale(50),
    borderColor: colors.GREY19,
  },

  apiErrorStyle: {
    color: colors.RED_BORDER,
    fontFamily: fonts.REGULAR,
    fontSize: moderateScale(14),
    width: "90%",
    marginTop: moderateScale(10),
  },

  forgotPasswordContainer: {
    alignSelf: "flex-end",
    position: "absolute",
    top: moderateScale(140),
    right: moderateScale(20),
  },

  forgotPassword: {
    color: colors.BLACK,
    fontFamily: fonts.REGULAR,
    marginTop: moderateScale(10),
    alignSelf: "flex-end",
    fontSize: moderateScale(12),
  },

  regContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: moderateScale(15),
  },

  regText: {
    fontFamily: fonts.REGULAR,
    color: colors.BLACK,
  },
});

export { styles };
