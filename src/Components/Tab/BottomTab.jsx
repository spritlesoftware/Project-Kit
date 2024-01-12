import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomTabLogic from '../../Functions/Tab/BottomTab';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import Loader from '../Loader/Loader';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Notification Screen</Text>
    </View>
  );
};

const AccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
    </View>
  );
};

function BottomTab() {
  const {tabData, isLoading} = BottomTabLogic();

  // Function to map component_name to actual screen component
  const mapComponentToScreen = componentName => {
    switch (componentName) {
      case 'HomeScreen':
        return HomeScreen;
      case 'NotificationScreen':
        return NotificationScreen;
      case NotificationScreen:
        return AccountScreen;
      default:
        return AccountScreen;
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              height: Platform.OS === 'ios' ? moderateScale(80) : moderateScale(60),
              backgroundColor: colors.APP_PRIMARY,
              borderTopLeftRadius: moderateScale(30),
              borderTopRightRadius: moderateScale(30),
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.WHITE,
            },
          }}
          tabBarPosition="bottom">
          {tabData.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={mapComponentToScreen(tab.component_name)}
              options={{
                tabBarShowLabel: true,
                tabBarIcon: ({focused}) => (
                  <View
                    style={{
                      width: 50,
                      backgroundColor: focused ? colors.APP_PRIMARY : '',
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <Icon
                      name={focused ? tab.icon_active : tab.icon_inactive}
                      color={colors.WHITE}
                      size={25}
                    />
                  </View>
                ),
                tabBarLabel: tab.name,
                tabBarLabelStyle: {
                  color: colors.WHITE,
                  fontFamily: fonts.REGULAR,
                  fontSize: moderateScale(10),
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
}

export default BottomTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
