import {useState} from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function InputField ({label,...props}){

  return (
    <TextInput
      label={label}
      mode='outlined'
      style={styles.input}
      {...props}
      
    />
  );
}

const styles = StyleSheet.create({
  input:{
      width:"100%",
      marginBottom:25
  }

})

