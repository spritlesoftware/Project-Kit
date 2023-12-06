import {Text, View, StyleSheet} from 'react-native';
import InputField from '../../Components/TextInput/InputField';
import {useState, useContext} from 'react';
import CustomButton from '../../Components/Button/CustomButton';
import {AppContext} from '../../Navigations/StackNavigator';
import {useAppContext} from '../../Context/ContextProvider';
import {colors} from '../../Utils/colors';

export default function EditItem({route, navigation}) {
  const {tableData, fonts, setTableData} = useAppContext();
  const [formValues, setFormValues] = useState({});

  // console.log(formValues)
  const onInputChange = (name, value) => {
    setFormValues({...formValues, [name]: value});
  };

  function onSave() {
    const updatedTable = tableData.map(each =>
      each.id === route.params.id ? {...each, ...formValues} : each,
    );
    setTableData(updatedTable);
    setFormValues({});
    navigation.navigate('Table');
  }

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={[styles.header, {fontFamily: fonts.BOLD}]}>Edit Item</Text>
        {Object.entries(route.params.item).map(([key, value]) => {
          return (
            <InputField
              type={typeof value == 'number' ? 'numeric' : null}
              key={key}
              label={key}
              value={
                formValues[key] !== undefined
                  ? formValues[key]
                  : typeof value == 'number'
                  ? JSON.stringify(value)
                  : value
              }
              onChangeText={text => onInputChange(key, text)}
            />
          );
        })}
        <CustomButton title={'Save'} onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innercontainer: {
    width: '80%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    padding: 30,
    color: colors.BLACK,
  },
});
