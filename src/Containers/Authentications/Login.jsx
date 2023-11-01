import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './LoginStyles'
import LoginLogo from '../../Assets/images/login_logo.svg';

const Login = () => {
  return (
    <View style={styles.center}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <LoginLogo width={300} height={300} />
      </View>
    </View>  
  )
}

export default Login