// Register.js
import {View, TouchableOpacity, Platform} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {moderateScale} from 'react-native-size-matters';
import {styles} from './LoginStyles'; // Assuming styles are shared
import LoginLogo from '../../Assets/images/login_logo.svg';
import CustomButton from '../../Components/Button/CustomButton';
import InputField from '../../Components/TextInput/InputField';
import {Divider, Text} from 'react-native-paper';
import SocialButton from '../../Components/Button/SocialButton';
import RegisterLogic from '../../Functions/Authentications/Register';
import Google from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/core';

const Register = ({navigation}) => {
  const {
    email,
    password,
    confirmPassword,
    invalidEmail,
    invalidPassword,
    invalidConfirmPassword,
    apiError,
    apiErrorMessage,
    isLoading,
    onPressSignUp,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
  } = RegisterLogic(navigation);

  const route = useRoute();
  const {app_name, signup_btn_txt} = route.params;

  return (
    <SafeAreaView style={styles.center}>
      <KeyboardAwareScrollView
        style={styles.keyboard}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            alignItems: 'center',
            marginTop:
              Platform.OS === 'ios' ? moderateScale(-50) : moderateScale(-20),
          }}>
          <LoginLogo width={200} height={200} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle} variant="displayMedium">
            {app_name}
          </Text>
          <Text style={styles.headerTitle} variant="headlineSmall">
            Sign Up
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
          <View style={{marginTop: moderateScale(5)}} />
          <InputField
            label={'Confirm Password'}
            placeholder={'Enter password'}
            textContentType="password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            error={invalidConfirmPassword}
            errorMsg={'Enter a password'}
          />
          <CustomButton title={signup_btn_txt} onPress={onPressSignUp} />
        </View>
        <TouchableOpacity
          style={styles.regContainer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.regText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <Text style={styles.orContainer}>Sign Up with a social account</Text>
        <View style={styles.socialContainer}>
          <SocialButton icon={<Google width={30} height={30} />} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;
