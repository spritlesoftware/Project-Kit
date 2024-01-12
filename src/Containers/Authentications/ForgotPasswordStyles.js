import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import {colors} from '../../Utils/colors';

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: moderateScale(20),
  },
  loginLogo: {
    width: scale(263),
    height: verticalScale(263),
    marginTop: moderateScale(5),
    alignSelf: 'center',
  },
  loginText: {
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    fontSize: moderateScale(20),
    marginTop: moderateScale(20),
    lineHeight: moderateScale(36),
  },
  changePasswordLogo: {
    width: '100%',
    height: verticalScale(250),
    marginTop: moderateScale(30),
    alignSelf: 'center',
  },

  checkMarkContainer: {
    marginTop: '40%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  checkImageContainer: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  emailInfoText: {
    fontSize: moderateScale(10),
    marginTop: moderateScale(10),
    fontFamily: fonts.BOLD,
    color: colors.APP_PRIMARY,
    width: moderateScale(100),
  },

  newPassword: {
    fontSize: moderateScale(20),
    marginTop: moderateScale(10),
    fontFamily: fonts.BOLD,
    color: colors.APP_PRIMARY,
  },

  successTextStyle: {
    fontSize: 12,
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
  },
  errorStyle: {
    fontFamily: fonts.REGULAR,
    fontSize: 12,
  },
  errorStyleWithLarge: {
    fontFamily: fonts.REGULAR,
    fontSize: moderateScale(10),
    alignSelf: 'flex-start',
    color: colors.RED_BORDER,
    marginHorizontal: moderateScale(10)
  },
  headerTitle: {
    fontFamily: fonts.BOLD,
    color: colors.APP_PRIMARY,
  },

  infoText: {
    fontSize: moderateScale(10),
    marginTop: moderateScale(10),
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    width: '100%',
  },

  titleContainer: {
    marginHorizontal: moderateScale(10)
  },

  inputContainer: {
    marginHorizontal: moderateScale(10)
  },

  newPassContainer: {
    marginHorizontal: moderateScale(10)
  }
});
