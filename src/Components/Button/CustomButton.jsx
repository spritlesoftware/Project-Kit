import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import { useAppContext } from '../../Context/ContextProvider';
const CustomButton = props => {
  const {fonts} = useAppContext()
  return (
    <Button
      mode="elevated"
      buttonColor={colors.APP_PRIMARY}
      dark
      contentStyle={styles.btnContent}
      labelStyle={styles.btnText}
      style={[styles.btnContainer, {fontFamily: fonts.BOLD}]}
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
    borderRadius: moderateScale(15),
    marginTop: moderateScale(20),
    padding:moderateScale(1)
  },
  btnContent: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.WHITE,
  },
  btnText: {
   
    fontSize: moderateScale(15),
    color: colors.WHITE,
  },
});
