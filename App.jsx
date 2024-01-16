import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator, {AppContext} from './src/Navigations/StackNavigator';
import ContextProvider from './src/Context/ContextProvider';
import {Platform, StatusBar, Text, View} from 'react-native';
import {colors} from './src/Utils/colors';
import {moderateScale} from 'react-native-size-matters';

function App() {
  // Used when generating any kind of tokens
  // To set up environmental variables, see http://twil.io/secure
  return (
    <ContextProvider>
      <View
        style={{
          backgroundColor: colors.APP_PRIMARY,
          height: Platform.OS === 'ios' && moderateScale(47),
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.APP_PRIMARY}
        />
      </View>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
