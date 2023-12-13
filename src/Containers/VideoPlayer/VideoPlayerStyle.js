import {StyleSheet} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import {colors} from '../../Utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  controlsContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },

  controlButton: {
    width: 30,
    height: 30,
    tintColor: 'white',
    marginHorizontal: 10,
  },

  sliderContainer: {
    width: '100%',
    flexDirection: 'row',
    // top: moderateScale(50),
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timerText: {
    color: 'white',
  },

  fullScreenContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'flex-end',
  },

  fullScreenButton: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },

  mainControls: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: moderateScale(120),
    width: moderateScale(200),
  },

  infoContainer: {
    marginHorizontal: moderateScale(5),
  },

  title: {
    fontFamily: fonts.BOLD,
    color: colors.APP_PRIMARY,
    marginTop: moderateScale(20),
  },

  dataContainer: {
    flexDirection: 'row',
    width: moderateScale(180),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: moderateScale(8),
  },

  dataText: {
    fontFamily: fonts.MEDIUM,
  },

  category: {
    borderWidth: 1,
    paddingVertical: moderateScale(1),
    paddingHorizontal: moderateScale(8),
    textAlign: 'center',
    borderRadius: moderateScale(5),
    backgroundColor: colors.APP_PRIMARY,
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
    fontSize: moderateScale(15),
    marginRight: moderateScale(10),
  },

  descriptionContainer: {
    marginVertical: moderateScale(5),
    marginHorizontal: moderateScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: colors.APP_PRIMARY,
    padding: moderateScale(10),
  },

  descriptionText: {
    fontFamily: fonts.MEDIUM,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
    color: colors.WHITE,
  },

  cast: {
    marginHorizontal: moderateScale(8),
    borderRadius: moderateScale(8),
    padding: moderateScale(10),
    backgroundColor: colors.APP_PRIMARY,
  },

  titleText: {
    fontFamily: fonts.BOLD,
    color: colors.WHITE,
    fontSize: moderateScale(15),
  },

  castTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: moderateScale(5),
  },

  castText: {
    fontFamily: fonts.MEDIUM,
    color: colors.WHITE,
    fontSize: moderateScale(13),
    lineHeight: moderateScale(18),
  },

  like: {
    bottom: moderateScale(12),
    left: moderateScale(10),
  },

  detailsContainer: {
    backgroundColor: colors.APP_PRIMARY,
    borderRadius: moderateScale(10),
    marginBottom: moderateScale(10),
  },

  videoContainer: {
    width: '100%',
  },
});
