

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Form from './src/Containers/Form';


function App() {
 
  return (
    <SafeAreaView style={styles.container} >
      <Form/>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
 container:{
  flex:1,
 }
})
