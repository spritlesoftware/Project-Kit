import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import Loader from '../Loader/Loader';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import AllSongs from '../../Containers/AudioPlayer/AllSongs';
import PlayList from '../Audio/PlayList';
import EventList from '../../Containers/EventCalendar/EventList'
import CalendarComponent from '../../Containers/EventCalendar/Calendar';
const Tab = createMaterialTopTabNavigator();

const ChatsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Chats Screen</Text>
    </View>
  );
};

const StatusScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Status Screen</Text>
    </View>
  );
};

const CallsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Calls Screen</Text>
    </View>
  );
};

const TopTab = props => {
  const {data, isLoading} = props;

  // Function to map component_name to actual screen component
  const mapComponentToScreen = componentName => {
    switch (componentName) {
      case 'ChatsScreen':
        return ChatsScreen;
      case 'StatusScreen':
        return StatusScreen;
      case 'CallsScreen':
        return CallsScreen;
      case 'AllSongs':
        return AllSongs;
      case 'PlayList':
        return PlayList;
      case 'CalendarComponent':
        return CalendarComponent
      case 'EventList':
        return EventList;    
      default:
        return ChatsScreen;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor:colors.APP_PRIMARY,
              paddingTop: moderateScale(-30)
            },
            tabBarIndicatorStyle: {
              backgroundColor:colors.WHITE ,
            },
          }}
          tabBarPosition="top">
          {data.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={mapComponentToScreen(tab.component_name)}
              options={{
                tabBarShowLabel: true,
                tabBarLabel: tab.name,
                tabBarLabelStyle: {
                  color: colors.WHITE,
                  fontFamily: fonts.BOLD,
                  fontSize: moderateScale(18),
                  fontWeight: 'bold',
                  textTransform: 'none',
                },
                tabBarBadgeStyle: {backgroundColor: colors.APP_PRIMARY},
              }}
            />
          ))}
        </Tab.Navigator>
      )}
    </>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusBar: {
    backgroundColor: colors.APP_PRIMARY,
    width: '100%',
    height: moderateScale(47),
  }
})
