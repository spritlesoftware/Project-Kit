import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './LoginStyles';
import LoginLogo from '../../Assets/images/login_logo.svg';
import Google from '../../Assets/images/google.svg';
import Facebook from '../../Assets/images/facebook.svg';
import CustomButton from '../../Components/Button/CustomButton';
import InputField from '../../Components/TextInput/InputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, Text} from 'react-native-paper';
import SocialButton from '../../Components/Button/SocialButton';
import LoginLogic from '../../Functions/Authentications/Login';

const Login = ({navigation}) => {
  const {
    email,
    password,
    invalidEmail,
    invalidPassword,
    apiError,
    apiErrorMessage,
    isLoading,
    onPressSignin,
    handleEmailChange,
    handlePasswordChange,
  } = LoginLogic(navigation);

  return (
    <SafeAreaView style={styles.center}>
      <KeyboardAwareScrollView
        style={styles.keyboard}
        keyboardShouldPersistTaps="handled">
        <View style={{alignItems: 'center', marginTop: moderateScale(-30)}}>
          <LoginLogo width={200} height={200} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle} variant="displayMedium">
            KitBox
          </Text>
          <Text style={styles.headerTitle} variant="headlineSmall">
            Sign In
          </Text>
        </View>
        <View style={styles.inputContainer}>
          {!apiError ? (
            <Text style={styles.apiErrorStyle}>{apiErrorMessage}</Text>
          ) : null}
          <InputField
            label={'Username'}
            placeholder={'Enter username'}
            textContentType="emailAddress"
            value={email}
            onChangeText={handleEmailChange}
            error={invalidEmail}
            errorMsg={'Enter an email address'}
          />
          <View style={{marginTop: moderateScale(5)}} />
          <InputField
            label={'Password'}
            placeholder={'Enter password'}
            textContentType="password"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
            error={invalidPassword}
            errorMsg={'Enter a password'}
          />
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={[
                styles.forgotPassword,
                {
                  bottom: invalidPassword ? moderateScale(25) : '',
                },
              ]}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
          <CustomButton
            title={'Login'}
            onPress={onPressSignin}
            loading={isLoading}
          />
        </View>
        <TouchableOpacity
          style={styles.regContainer}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.regText}>Don't have an account? Register</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <Text style={styles.orContainer}>Sign in with a social account</Text>
        <View style={styles.socialContainer}>
          {/* You may need to modify the SocialButton component based on your implementation */}
          <SocialButton icon={<Google width={30} height={30} />} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
