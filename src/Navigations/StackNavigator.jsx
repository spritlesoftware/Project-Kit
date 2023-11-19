import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Containers/Authentications/Login';
import Register from '../Containers/Authentications/Register';
import ForgotPassword from '../Containers/Authentications/ForgotPassword';
import Logout from '../Containers/Authentications/Logout';
import Form from '../Containers/Form';
import ChatList from '../Containers/Chats/ChatList';
import NewItem from '../Containers/Table/NewItem';
import { TableData } from '../Data/TableData';
import Table from '../Containers/Table/Table'
import EditItem from '../Containers/Table/EditItem';
import GroupList from '../Containers/Chats/GroupList';
import Contacts from '../Containers/Chats/Contacts';


const Stack = createNativeStackNavigator();

export const AppContext = React.createContext();

const StackNavigator = () => {
  const [tableData, setTableData] = React.useState(TableData)
  return (
    <AppContext.Provider value={{tableData,setTableData}}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // presentation: 'modal',
        animationTypeForReplace: 'push',
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Table" component={Table} />
      <Stack.Screen name="NewItem" component={NewItem} />
      <Stack.Screen name="EditItem" component={EditItem} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Login" component={Login} />
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
