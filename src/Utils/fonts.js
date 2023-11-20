import {Platform} from 'react-native';
import {typography} from '../Theme/Typography';

export const fonts = {
  REGULAR:
    Platform.OS === 'ios'
      ? typography.fonts.poppins.regular
      : typography.fonts.poppins.regular, //400
  MEDIUM:
    Platform.OS === 'ios'
      ? typography.fonts.poppins.medium
      : typography.fonts.poppins.medium, //500
  BOLD:
    Platform.OS === 'ios'
      ? typography.fonts.poppins.bold
      : typography.fonts.poppins.semiBold, //800
  LIGHT:
    Platform.OS === 'ios'
      ? typography.fonts.poppins.light
      : typography.fonts.poppins.light, //300
};
