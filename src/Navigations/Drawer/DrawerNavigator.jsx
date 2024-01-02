import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Tiles from '../../Containers/Tiles/Tiles';
import Themes from '../../Containers/Tiles/Themes';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={() => <Themes />}
      initialRouteName="Home">
      <Drawer.Screen name="Home" component={Tiles} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
