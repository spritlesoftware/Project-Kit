import {Platform} from 'react-native';
import {typography} from '../Theme/Typography';

export const fonts = {
  REGULAR:
    Platform.OS === 'ios' ? typography.font1.regular : typography.font1.regular, //400
  MEDIUM:
    Platform.OS === 'ios' ? typography.font1.medium : typography.font1.medium, //500
  BOLD:
    Platform.OS === 'ios' ? typography.font1.bold : typography.font1.semibold, //800
  LIGHT:
    Platform.OS === 'ios' ? typography.font1.light : typography.font1.light, //300
};
