import {View, Text, StyleSheet, ScrollView} from 'react-native';
import InputField from '../../Components/TextInput/InputField';
import {useState, useRef} from 'react';
import CustomButton from '../../Components/Button/CustomButton';
import {formData} from '../../Data/FormData';
import {moderateScale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {useAppContext} from '../../Context/ContextProvider';
import { renderFormFields } from './FormFields';

export default function Form() {
  
  const {fonts,setErrors,formValues,setFormValues,errors} = useAppContext();

  function onHandleSubmit() {
    const newErrors = {};
    formData.forEach(field => {
      if (field.required === true) {
        if (!formValues[field.id]) {
          newErrors[field.id] = 'This field is required';
        }
      }
    });

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, submit or perform the desired action
      setErrors({});
      setFormValues({});
      console.log(formValues);
    } else {
      setErrors(newErrors);
    }
  }
  return (
    <View style={styles.container}>
      <View style={{padding: moderateScale(23)}}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <Text style={[styles.header, {fontFamily: fonts.BOLD}]}>
            KitBox - Form
          </Text>
          {renderFormFields()}
          <CustomButton title={'Submit'} onPress={onHandleSubmit} />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    height: '100%',
  },
  error: {
    color: colors.RED_BORDER,
    fontSize: moderateScale(12),
    width: '50%',
    alignSelf: 'flex-start',
    paddingTop: moderateScale(5),
  },
  header: {
    fontSize: 30,
    padding: 20,
    textAlign: 'center',
    color: colors.APP_PRIMARY,
  },
  title: {
    fontSize: 19,
    color: 'black',
    marginBottom: moderateScale(15),
    fontFamily: fonts.BOLD,
  },
  options: {
    fontSize: 15,
    color: 'black',
    marginTop: 7,
    fontFamily: fonts.REGULAR,
  },
});
