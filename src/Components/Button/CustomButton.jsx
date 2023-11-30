import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import { useAppContext } from '../../Context/ContextProvider';
const CustomButton = props => {
  const {fonts} = useAppContext()
  return (
    <Button
      mode="elevated"
      buttonColor={colors.APP_PRIMARY}
      contentStyle={styles.btnContent}
      labelStyle={[styles.btnText, {fontFamily: fonts.BOLD}]}
      style={[styles.btnContainer,{width:props.width , height:props.height}]}
      {...props}>
      {props.icon}
      {props.title}
    </Button>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: moderateScale(10),
    marginTop: moderateScale(20),
    padding:moderateScale(5)
  },
  btnContent: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.WHITE,
  },
  btnText: { 
    fontSize: moderateScale(18),
    color: colors.WHITE,
  },
});
