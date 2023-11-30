import {formData} from '../../Data/FormData';
import {View, Text, StyleSheet} from 'react-native';
import InputField from '../../Components/TextInput/InputField';
import {RadioButton} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {useAppContext} from '../../Context/ContextProvider';
import {colors} from '../../Utils/colors';

export function renderFormFields() {
  const {fonts, formValues, setFormValues, errors, setErrors} = useAppContext();
  const onInputChange = (fieldId, value) => {
    setFormValues({...formValues, [fieldId]: value});
  };
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
            <Text style={[styles.title, {fontFamily: fonts.BOLD}]}>
              {field.label}
            </Text>
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
                      formValues[field.id] === option ? 'checked' : 'unchecked'
                    }
                    onPress={() => onInputChange(field.id, option)}
                    color={colors.APP_PRIMARY}
                  />
                  <Text style={[styles.options, {fontFamily: fonts.REGULAR}]}>
                    {option}
                  </Text>
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
            <Text style={[styles.title, {fontFamily: fonts.BOLD}]}>
              {field.label}
            </Text>
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
                        formValues[field.id]?.[option] ? 'checked' : 'unchecked'
                      }
                      onPress={() => {
                        onInputChange(field.id, {
                          ...(formValues[field.id] || {}),
                          [option]: !formValues[field.id]?.[option],
                        });
                      }}
                      color={colors.APP_PRIMARY}
                    />
                    <Text style={[styles.options, {fontFamily: fonts.REGULAR}]}>
                      {option}
                    </Text>
                  </View>
                );
              })}
            </View>
            {errors[field.id] ? (
              <Text style={[styles.error, {fontFamily: fonts.REGULAR}]}>
                {errors[field.id]}
              </Text>
            ) : null}
          </View>
        );

      case 'select':
        return (
          <View style={{padding:10,paddingTop:moderateScale(20)}}>
            <Text style={[styles.title, {fontFamily: fonts.BOLD}]}>
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
              buttonTextStyle={{fontFamily:fonts.REGULAR,fontSize:15}}
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
              <Text style={[styles.error, {fontFamily: fonts.REGULAR}]}>
                {errors[field.id]}
              </Text>
            ) : null}
          </View>
        );
    }
  });
}
const styles = StyleSheet.create({
  error: {
    color: colors.RED_BORDER,
    fontSize: moderateScale(12),
    width: '50%',
    alignSelf: 'flex-start',
    paddingTop: moderateScale(5),
  },
  title: {
    fontSize: 17,
    color: 'black',
    marginBottom: moderateScale(15),
  },
  options: {
    fontSize: 15,
    color: 'black',
    marginTop: 7,
  },
});
