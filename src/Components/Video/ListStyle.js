import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import {colors} from '../../Utils/colors';

export const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
  },

  listContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    // marginBottom: moderateScale(-10),
    // elevation: 10,
    backgroundColor: colors.WHITE,
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },

  thumbnailContainer: {
    elevation: 10,
    backgroundColor: colors.WHITE,
    height: moderateScale(65),
    borderRadius: moderateScale(10),
  },

  thumbnail: {
    borderRadius: moderateScale(10),
  },

  duration: {
    top: moderateScale(-20),
    fontFamily: fonts.BOLD,
    color: colors.WHITE,
    alignSelf: 'flex-end',
    marginHorizontal: moderateScale(5),
  },

  titleContainer: {
    marginHorizontal: moderateScale(10),
    width: moderateScale(200),
    justifyContent: 'center',
  },

  titleText: {
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    fontSize: moderateScale(15),
    marginTop: moderateScale(-10),
  },

  quality: {
    borderWidth: 1,
    width: moderateScale(55),
    textAlign: 'center',
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
    borderRadius: moderateScale(5),
    fontSize: moderateScale(12),
  },

  menuContainer: {
    justifyContent: 'center',
  },
});
