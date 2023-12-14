import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator, {AppContext} from './src/Navigations/StackNavigator';
import ContextProvider from './src/Context/ContextProvider';
import {StatusBar} from 'react-native';
import {colors} from './src/Utils/colors';

function App() {
  // Used when generating any kind of tokens
  // To set up environmental variables, see http://twil.io/secure
  return (
    <ContextProvider>
      <StatusBar
        backgroundColor={colors.APP_PRIMARY}
        barStyle="light-content"
      />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
