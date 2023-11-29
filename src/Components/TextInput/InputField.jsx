import {useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import { useAppContext } from '../../Context/ContextProvider';

export default function InputField({label, ...props}) {
  const {fonts} = useAppContext()
  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        outlineColor={colors.GRAY1}
        activeOutlineColor={colors.GREY20}
        selectionColor={colors.BLACK}
        placeholderTextColor={colors.GREY20}
        style={[styles.input,{fontFamily:fonts.MEDIUM}]}
        contentStyle={[styles.inputText,{fontFamily:fonts.REGULAR}]}
        textColor={colors.BLACK}
        {...props}
        keyboardType={props.type}
      />
      {props.error ? <Text style={[styles.error,{fontFamily:fonts.REGULAR}]}>{props.errorMsg}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginTop: moderateScale(5),
    fontFamily: fonts.MEDIUM,
    backgroundColor: colors.WHITE,
  },
  error: {
    color: colors.RED_BORDER,
    fontSize: moderateScale(12),
    width: '50%',
    alignSelf: 'flex-start',
    paddingTop: moderateScale(5),
  },
});
