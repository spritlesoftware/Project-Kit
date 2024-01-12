import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {GetFirebaseData} from '../Firebase';
import Loader from '../../Components/Loader/Loader';

const Login = ({navigation}) => {
  const {
    email,
    password,
    invalidEmail,
    invalidPassword,
    apiError,
    apiErrorMessage,
    isLoading,
    setIsLoading,
    onPressSignin,
    handleEmailChange,
    handlePasswordChange,
  } = LoginLogic(navigation);

  // Use state to store the user data
  const [userData, setUserData] = useState(null);
  const {user} = GetFirebaseData('Authentications');

  useEffect(() => {
    // Check if the user data is available and set it in the state
    if (user) {
      setUserData(user._data);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if ((userData === null) | undefined) {
      setIsLoading(true);
    }
  }, []);

  console.log(userData);

  return (
    <SafeAreaView style={styles.center}>
      {isLoading ? (
        <Loader />
      ) : (
        <KeyboardAwareScrollView
          style={styles.keyboard}
          keyboardShouldPersistTaps="handled">
          <View style={{alignItems: 'center', marginTop: moderateScale(-50)}}>
            <LoginLogo width={200} height={200} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle} variant="displayMedium">
              {userData === null ? 'app name' : userData.app_name}
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
              onPress={() =>
                navigation.navigate('ForgotPassword', {
                  reset_title: userData.reset_title,
                  new_password_title: userData.new_password_title,
                  submit_btn_txt: userData.submit_btn_txt,
                })
              }>
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
              title={userData === null ? 'Login Text' : userData.login_btn_txt}
              onPress={onPressSignin}
              loading={isLoading}
            />
          </View>
          <TouchableOpacity
            style={styles.regContainer}
            onPress={() =>
              navigation.navigate('SignUp', {
                app_name: userData.app_name,
                signup_btn_txt: userData.signup_btn_txt,
              })
            }>
            <Text style={styles.regText}>Don't have an account? Register</Text>
          </TouchableOpacity>
          <Divider style={styles.divider} />
          <Text style={styles.orContainer}>Sign in with a social account</Text>
          <View style={styles.socialContainer}>
            {/* You may need to modify the SocialButton component based on your implementation */}
            <SocialButton icon={<Google width={30} height={30} />} />
          </View>
        </KeyboardAwareScrollView>
      )}
    </SafeAreaView>
  );
};

export default Login;
