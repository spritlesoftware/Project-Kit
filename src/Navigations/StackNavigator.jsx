import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Containers/Authentications/Login';
import Register from '../Containers/Authentications/Register';
import ForgotPassword from '../Containers/Authentications/ForgotPassword';
import Logout from '../Containers/Authentications/Logout';
import { Notifications } from '../Containers/Notifications';
import Form from '../Containers/Form';
import RealChat from '../Containers/Chats/RealChat';
import ChatList from '../Containers/Chats/ChatList';
import {Videocall} from '../Containers/Videocall/Videocall';
import {RegisterScreen} from '../Containers/Videocall/RegisterScreen';
import BarcodeScanner from '../Containers/BarcodeScanner/BarcodeScanner';
import BarcodeOutput from '../Containers/BarcodeScanner/BarcodeOutput';
import NewItem from '../Containers/Table/NewItem';
import {TableData} from '../Data/TableData';
import Table from '../Containers/Table/Table';
import EditItem from '../Containers/Table/EditItem';
import GroupList from '../Containers/Chats/GroupList';
import Contacts from '../Containers/Chats/Contacts';
import AudioPlayer from '../Containers/AudioPlayer/AudioPlayer';
import PlayList from '../Containers/AudioPlayer/PlayListGroup';
import AudioList from '../Containers/AudioPlayer/AudioList';
import PlayListTracks from '../Containers/AudioPlayer/PlayListTracks';


export const initialState = {
  isAudioEnabled: true,
  status: 'disconnected',
  participants: [],
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
  const [tableData, setTableData] = React.useState(TableData);

  return (
    <AppContext.Provider value={{tableData,setTableData,props, setProps}}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // presentation: 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }} initialRouteName='Tiles'>
      <Stack.Screen name="Tiles" component={Tiles} />
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="NewItem" component={NewItem} />
      <Stack.Screen name="EditItem" component={EditItem} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="SignUp" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="Groups" component={GroupList} />
      <Stack.Screen name="Contacts" component={Contacts} />
    </Stack.Navigator>
    </AppContext.Provider>
  );
};

export default StackNavigator;
