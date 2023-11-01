import {Platform} from 'react-native';
import {typography} from '../Theme/Typography';

export const fonts = {
  REGULAR:
    Platform.OS === 'ios'
      ? typography.fonts.montserrat.regular
      : typography.fonts.montserrat.regular, //400
  MEDIUM:
    Platform.OS === 'ios'
      ? typography.fonts.montserrat.medium
      : typography.fonts.montserrat.medium, //500
  BOLD:
    Platform.OS === 'ios'
      ? typography.fonts.montserrat.bold
      : typography.fonts.montserrat.semiBold, //800
  LIGHT:
    Platform.OS === 'ios'
      ? typography.fonts.montserrat.light
      : typography.fonts.montserrat.light, //300
};
