import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {useState} from 'react';
import InputField from '../../Components/TextInput/InputField';
import CustomButton from '../../Components/Button/CustomButton';
import { useAppContext } from '../../Context/ContextProvider';

export default function NewEvent({route, navigation}) {
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState('');
  const {events , setEvents , setIsMarkedDate , isMarkedDate} = useAppContext()
 
  console.log(events);
  console.log(isMarkedDate)
  function onHandleSave() {
    setIsMarkedDate(()=>{if(isMarkedDate?.includes(route.params.selectedDate)){
        return[...isMarkedDate ]
    }else{
        return[...isMarkedDate , route.params.selectedDate]
    }})
    setEvents([
      ...events,
      {
        date: route.params.selectedDate,
        event: event,
        description: description,
      },
    ]);
    setEvent("")
    setDescription("")
    navigation.navigate("DatePickerHome")
  }
  return (
    <View style={styles.container}>
      <View style={{width: '80%', marginRight: 'auto', marginLeft: 'auto'}}>
        <Text style={styles.header}>New Event</Text>
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
           event &&  onHandleSave();
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
    padding: 30,
    color: 'black',
    fontFamily: fonts.BOLD,
  },
});
