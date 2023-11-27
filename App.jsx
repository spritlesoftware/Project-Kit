
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/Navigations/StackNavigator';



function App() {
  // Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
  return ( 
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
