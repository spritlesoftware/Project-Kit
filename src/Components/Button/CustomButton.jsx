import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';

const CustomButton = props => {
  return (
    <Button
      mode="elevated"
      buttonColor={colors.APP_PRIMARY}
      dark
      contentStyle={styles.btnContent}
      labelStyle={styles.btnText}
      style={styles.btnContainer}
      {...props}>
      {props.icon}
      {props.title}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    borderRadius: moderateScale(30),
    marginTop: moderateScale(20),
  },
  btnContent: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.WHITE,
  },
  btnText: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
    color: colors.WHITE,
  },
});
