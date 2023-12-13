import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View} from 'react-native';
import BottomTabLogic from '../../Functions/Tab/BottomTab';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

const NotificationScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

const AccountScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

function TopTabNavigator() {
  const {tabData} = BottomTabLogic();

  console.log(tabData, ' --');
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={NotificationScreen} />
      <Tab.Screen name="Settings" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default TopTabNavigator;
