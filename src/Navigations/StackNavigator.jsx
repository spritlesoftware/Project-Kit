import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Containers/Authentications/Login';
import Register from '../Containers/Authentications/Register';
import ForgotPassword from '../Containers/Authentications/ForgotPassword';
import Logout from '../Containers/Authentications/Logout';
import ChatList from '../Containers/Chats/ChatList';
import { Videocall } from '../Containers/Videocall/Videocall';
import { RegisterScreen } from '../Containers/Videocall/RegisterScreen';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';

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
    <>
      <StatusBar barStyle="dark-content" />
      <AppContext.Provider value={{ props, setProps }}>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          // presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
           <Stack.Screen name="Videocall" component={Videocall} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={Register} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Logout" component={Logout} />
          <Stack.Screen name="ChatList" component={ChatList} />
        </Stack.Navigator>
      </AppContext.Provider>
    </>
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
