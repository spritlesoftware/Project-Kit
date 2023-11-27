import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Chat from './Chat'
import { colors } from '../../Utils/colors'
import {moderateScale} from 'react-native-size-matters';

const RealChat = () => {
  return (
    <View style={styles.center} >
      <Chat />
    </View>
  )
}

export default RealChat

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});