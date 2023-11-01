import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Containers/Authentications/Login';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
          headerShown: false,
          // presentation: 'modal',
          animationTypeForReplace: 'push',
          animation: 'slide_from_right',
        }}
    >
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  )
}

export default StackNavigator