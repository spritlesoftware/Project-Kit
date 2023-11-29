import {View, Text, StyleSheet, ScrollView} from 'react-native';
import InputField from '../Components/TextInput/InputField';
import {useState, useRef} from 'react';
import CustomButton from '../Components/Button/CustomButton';
import {formData} from '../Data/FormData';
import {RadioButton} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {moderateScale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../Utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../Utils/fonts';
import { useAppContext } from '../Context/ContextProvider';

export default function Form() {
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});
  const {fonts} = useAppContext()

  const onInputChange = (fieldId, value) => {
    setFormValues({...formValues, [fieldId]: value});
  };

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
    console.log(errors);
  }

  function renderFormFields() {
    return formData.map(field => {
      switch (field.type) {
        case 'text':
          return (
            <InputField
              key={field.id}
              label={field.label}
              value={formValues[field.id] || ''}
              onChangeText={text => onInputChange(field.id, text)}
              error={errors[field.id]}
              errorMsg={errors[field.id]}
            />
          );

        case 'email':
          return (
            <InputField
              key={field.id}
              label={field.label}
              value={formValues[field.id] || ''}
              onChangeText={text => onInputChange(field.id, text)}
              error={errors[field.id]}
              errorMsg={errors[field.id]}
            />
          );

        case 'radio':
          return (
            <View key={field.id} style={{padding: moderateScale(10)}}>
              <Text style={styles.title}>{field.label}</Text>
              {field.options.map(option => {
                return (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginBottom: moderateScale(10),
                    }}>
                    <RadioButton
                      key={option}
                      value={option}
                      status={
                        formValues[field.id] === option
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => onInputChange(field.id, option)}
                      color={colors.APP_PRIMARY}
                    />
                    <Text style={styles.options}>{option}</Text>
                  </View>
                );
              })}
              {errors[field.id] ? (
                <Text style={styles.error}>{errors[field.id]}</Text>
              ) : null}
            </View>
          );
        case 'checkbox':
          return (
            <View key={field.id} style={{padding: moderateScale(10)}}>
              <Text style={styles.title}>{field.label}</Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  padding: 10,
                  borderRadius: 20,
                }}>
                {field.options.map(option => {
                  return (
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: moderateScale(10),
                      }}>
                      <Checkbox
                        key={option}
                        status={
                          formValues[field.id]?.[option]
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          onInputChange(field.id, {
                            ...(formValues[field.id] || {}),
                            [option]: !formValues[field.id]?.[option],
                          });
                        }}
                        color={colors.APP_PRIMARY}
                      />
                      <Text style={styles.options}>{option}</Text>
                    </View>
                  );
                })}
              </View>
              {errors[field.id] ? (
                <Text style={styles.error}>{errors[field.id]}</Text>
              ) : null}
            </View>
          );

        case 'select':
          return (
            <View style={{padding: moderateScale(10)}}>
              <Text
                style={{
                  fontSize: 19,
                  fontFamily: fonts.BOLD,
                  marginBottom: moderateScale(15),
                  marginTop: moderateScale(20),
                  color: 'black',
                }}>
                {field.label}
              </Text>
              <SelectDropdown
                data={field.options}
                onSelect={(selectedItem, index) => {
                  onInputChange(field.id, selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                buttonStyle={{
                  borderWidth: 1,
                  borderRadius: 20,
                  backgroundColor: 'white',
                }}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'black'}
                      size={18}
                    />
                  );
                }}
                dropdownIconPosition={'right'}
              />
              {errors[field.id] ? (
                <Text style={styles.error}>{errors[field.id]}</Text>
              ) : null}
            </View>
          );
      }
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <Text style={[styles.header,{fontFamily:fonts.BOLD}]}>KitBox - Form</Text>
        {renderFormFields()}
        <CustomButton title={'Submit'} onPress={onHandleSubmit} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    height: '100%',
    padding: moderateScale(20),
  },
  error: {
    color: colors.RED_BORDER,
    fontFamily: fonts.REGULAR,
    fontSize: moderateScale(12),
    width: '50%',
    alignSelf: 'flex-start',
    paddingTop: moderateScale(5),
  },
  header: {
    fontFamily: fonts.BOLD,
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
