import { View, Text } from 'react-native'
import React from 'react'
import { colors } from '../../Utils/colors'
import { fonts } from '../../Utils/fonts'

const Login = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: fonts.BOLD, fontSize: 20 }} >Login</Text>
    </View>
  )
}

export default Login