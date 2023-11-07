import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewUser from "./src/Container/NewUser";
import Geofencing from "./src/Container/GeoFencing";
import { useEffect } from 'react';
import Radar, { Map, Autocomplete } from "react-native-radar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="GeoFencing" component={Geofencing} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
