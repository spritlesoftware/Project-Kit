import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import Loader from '../Loader/Loader';
import {Text, View} from 'react-native';
import AllSongs from '../../Containers/AudioPlayer/AllSongs';
import PlayList from '../Audio/PlayList';

const Tab = createMaterialTopTabNavigator();

const ChatsScreen = () => {
  return (
    <View>
      <Text>Chats Screen</Text>
    </View>
  );
};

const StatusScreen = () => {
  return (
    <View>
      <Text>Status Screen</Text>
    </View>
  );
};

const CallsScreen = () => {
  return (
    <View>
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
              backgroundColor:colors.WHITE,
            },
            tabBarIndicatorStyle: {
              backgroundColor:colors.APP_PRIMARY ,
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
                  color: colors.BLACK,
                  fontFamily: fonts.BOLD,
                  fontSize: moderateScale(15),
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
