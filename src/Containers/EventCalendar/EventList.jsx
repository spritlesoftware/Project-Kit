import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useAppContext} from '../../Context/ContextProvider';
import {colors} from '../../Utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from '../../Utils/fonts';
import EventDelete from '../../Functions/EventCalendar/EventDelete';
export default function EventList({navigation}) {
  const {events, setEvents, setIsMarkedDate, isMarkedDate, fonts} =
    useAppContext();
  console.log(events, 'events');
  const {onHandleDelete} = EventDelete(navigation);

  return (
    <ScrollView style={styles.container}>
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
              <View style={styles.eventcontainer}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.eventtext}>{each_event.event}</Text>
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
                <Text style={styles.descriptiontext}>
                  {each_event.description
                    ? each_event.description
                    : 'No description'}
                </Text>
                <View style={styles.flexcontainer}>
                  <View>
                    {each_event.time && (
                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        <AntDesign
                          name="clockcircleo"
                          color={colors.GRAY2}
                          size={15}
                          style={{marginLeft: 5, marginTop: 2}}
                        />
                        <Text style={styles.timetext}>{each_event.time}</Text>
                      </View>
                    )}
                  </View>

                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <AntDesign
                      name="calendar"
                      color={colors.GRAY2}
                      size={15}
                      style={{marginRight: 5, marginTop: 2}}
                    />
                    <Text style={styles.datetext}>{formattedDate}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.noeventcontainer}>
          <Text style={styles.noeventtext}>No Events</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: colors.WHITE, flex: 1},
  eventcontainer: {
    borderBottomWidth: 0.4,
    padding: 3,
    borderColor: colors.GRAY3,
    borderRadius: 15,
  },
  flexcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datetext: {
    color: colors.GRAY2,
    textAlign: 'right',
    marginRight: 10,
    fontFamily: fonts.BOLD,
  },
  timetext: {
    color: colors.GRAY2,
    textAlign: 'right',
    marginLeft: 5,
    fontFamily: fonts.BOLD,
  },
  noeventcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  noeventtext: {
    color: colors.GRAY7,
    fontSize: 25,
    fontFamily: fonts.MEDIUM,
  },
  eventtext: {
    color: colors.BLACK,
    fontSize: 20,
    padding: 5,
    fontFamily: fonts.MEDIUM,
  },
  descriptiontext: {
    color: colors.GRAY7,
    padding: 7,
    fontSize: 15,
    fontFamily: fonts.REGULAR,
  },
});
