import {useState} from 'react';
import {Text, TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';

export default function InputField({label, ...props}) {
  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        outlineColor={colors.GRAY1}
        activeOutlineColor={colors.GREY20}
        selectionColor={colors.BLACK}
        placeholderTextColor={colors.GREY20}
        style={styles.input}
        contentStyle={styles.inputText}
        textColor={colors.BLACK}
        {...props}
      />
      {props.error ? <Text style={styles.error}>{props.errorMsg}</Text> : null}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginTop: moderateScale(10),
    fontFamily: fonts.MEDIUM,
    backgroundColor: colors.WHITE,

  },

  inputText: {
    fontFamily: fonts.MEDIUM,
  },

  error: {
    color: colors.RED_BORDER,
    fontFamily: fonts.REGULAR,
    fontSize: moderateScale(12),
    width: '50%',
    alignSelf: 'flex-start',
    paddingTop: moderateScale(5),
  },
});
