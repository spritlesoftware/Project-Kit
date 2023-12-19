import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {useState} from 'react';
import InputField from '../../Components/TextInput/InputField';
import CustomButton from '../../Components/Button/CustomButton';
import {useAppContext} from '../../Context/ContextProvider';
import {TimePickerModal} from 'react-native-paper-dates';

export default function NewEvent({route, navigation}) {
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [isTimeModuleVisible, setIsTimeModule] = useState(false);
  const {events, setEvents, setIsMarkedDate, isMarkedDate} = useAppContext();

  function onHandleSave() {
    setIsMarkedDate(() => {
      if (isMarkedDate?.includes(route.params.selectedDate)) {
        return [...isMarkedDate];
      } else {
        return [...isMarkedDate, route.params.selectedDate];
      }
    });
    setEvents([
      ...events,
      {
        date: route.params.selectedDate,
        event: event,
        description: description,
        time: time,
      },
    ]);
    setEvent('');
    setDescription('');
    setTime('');
    navigation.navigate('DatePickerHome');
  }
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
             setTime(`${hours}:${minutes}`)
            setIsTimeModule(false)
          }}
          use24HourClock={true}
        />
        <InputField
          label={'event'}
          value={event}
          onChangeText={text => setEvent(text)}
        />
        <InputField
          //key={}
          label={'description'}
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <CustomButton
          title={'Save'}
          onPress={() => {
            event && onHandleSave();
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
