import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Containers/Authentications/Login';
import Register from '../Containers/Authentications/Register';
import ForgotPassword from '../Containers/Authentications/ForgotPassword';
import Logout from '../Containers/Authentications/Logout';
import ChatList from '../Containers/Chats/ChatList';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // presentation: 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
