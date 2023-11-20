import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Containers/Authentications/Login';
import Register from '../Containers/Authentications/Register';
import ForgotPassword from '../Containers/Authentications/ForgotPassword';
import Logout from '../Containers/Authentications/Logout';
import { Notifications } from '../Containers/Notifications';

export const initialState = {
  isAudioEnabled: true,
  status: 'disconnected',
  participants: new Map(),
  videoTracks: new Map(),
  userName: '',
  roomName: '',
  token: '',
};

export const AppContext = React.createContext(initialState);

const dimensions = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [props, setProps] = useState(initialState);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // presentation: 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
        <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="ChatList" component={ChatList} />
    </Stack.Navigator>
  );
  // return (
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //       // presentation: 'modal',
  //       animationTypeForReplace: 'push',
  //       animation: 'slide_from_right',
  //     }}>
  //     <Stack.Screen name="Videocall" component={Videocall} />
  //     <Stack.Screen name="Login" component={Login} />
  //     <Stack.Screen name="SignUp" component={Register} />
  //     <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //     <Stack.Screen name="Logout" component={Logout} />
  //     <Stack.Screen name="ChatList" component={ChatList} />
  //   </Stack.Navigator>
  // );
};

export default StackNavigator;
