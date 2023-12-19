import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import {useAppContext} from '../../Context/ContextProvider';
import {colors} from '../../Utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function EventList() {
  const {events, setEvents, setIsMarkedDate, isMarkedDate} = useAppContext();
  console.log(events, 'events');
  function onHandleDelete(event) {
    Alert.alert(
      'Delete an event',
      `You sure want to delete this event on ${event.date}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            const eventsAfterDeletion = events.filter(each => {
              if (each.event != event.event) {
                return each;
              }
            });

            const markedDatesAfterDeletion = isMarkedDate.filter(each => {
              if (each != event.date) {
                return each;
              }
            });
            setIsMarkedDate(markedDatesAfterDeletion);
            setEvents(eventsAfterDeletion);

            console.log(markedDatesAfterDeletion, eventsAfterDeletion);
          },
        },
      ],
    );
  }
  return (
    <ScrollView style={{backgroundColor: colors.WHITE, flex: 1}}>
        {events.length > 0 ? (
          events.map((each_event, index) => {
            const dateObject = new Date(each_event.date);
            const formattedDate = dateObject.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
            return (
              <View style={{marginTop: 5, margin: 8}} key={index}>
                <View
                  style={{
                    borderBottomWidth: 0.4,
                    padding: 3,
                    borderColor: colors.GRAY3,
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{color: colors.BLACK, fontSize: 20, padding: 5}}>
                      {each_event.event}
                    </Text>
                    <TouchableOpacity
                      style={{
                        top: 20,
                        right: 10,
                      }}
                      onPress={() => {
                        onHandleDelete(each_event);
                      }}>
                      <AntDesign name="delete" color={'#0C2461'} size={20} />
                    </TouchableOpacity>
                  </View>
                  <Text style={{color: colors.GRAY7, padding: 7}}>
                    {each_event.description
                      ? each_event.description
                      : 'No description'}
                  </Text>
                  <Text
                    style={{
                      color: colors.GRAY2,
                      textAlign: 'right',
                      marginRight: 10,
                    }}>
                    {formattedDate}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 50,
            }}>
            <Text style={{color: colors.GRAY7, fontSize: 25}}>No Events</Text>
          </View>
        )}
    </ScrollView>
  );
}
