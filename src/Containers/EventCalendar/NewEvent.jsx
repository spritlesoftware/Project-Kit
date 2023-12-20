import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {useState} from 'react';
import InputField from '../../Components/TextInput/InputField';
import CustomButton from '../../Components/Button/CustomButton';
import {useAppContext} from '../../Context/ContextProvider';
import {TimePickerModal} from 'react-native-paper-dates';
import NewEventSave from '../../Functions/EventCalendar/NewEventSave';

export default function NewEvent({route, navigation}) {
  const [isTimeModuleVisible, setIsTimeModule] = useState(false);
  const {event , setEvent , description , setDescription , time ,setTime , onHandleSave} = NewEventSave(navigation)
  console.log(time);
  return (
    <View style={styles.container}>
      <View style={{width: '80%', marginRight: 'auto', marginLeft: 'auto'}}>
        <Text style={styles.header}>New Event</Text>
        <Text
          style={{
            color: colors.GRAY7,
            fontSize: 15,
            paddingBottom: 30,
            textAlign: 'center',
          }}>
          on {route.params.formattedDate}
        </Text>
        <InputField
          label={'time'}
          value={time}
          onChangeText={text => setTime(text)}
          icon={'clockcircleo'}
          onPressIcon={() => {
            setIsTimeModule(true);
          }}
        />
        <TimePickerModal
          visible={isTimeModuleVisible}
          onDismiss={() => {
            setIsTimeModule(false);
          }}
          onConfirm={({hours, minutes}) => {
            setTime(`${hours}:${minutes}`);
            setIsTimeModule(false);
          }}
          use24HourClock={true}
        />
        <InputField
          label={'event'}
          value={event}
          onChangeText={text => setEvent(text)}
        />
        <InputField
          label={'description'}
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <CustomButton
          title={'Save'}
          onPress={() => {
            event && ( onHandleSave())
           event && navigation.navigate('DatePickerHome');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    fontFamily: fonts.BOLD,
    paddingTop: 30,
  },
});
