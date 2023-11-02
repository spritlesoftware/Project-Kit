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
// import Google from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Utils/colors';
import {Divider, Text} from 'react-native-paper';
import SocialButton from '../../Components/Button/SocialButton';
import {fonts} from '../../Utils/fonts';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [isLoading, setisLoading] = useState(false);

  // custom user signup logic
  const userSignUp = () => {
    setisLoading(false);
    navigation.navigate('Login');
  };

  // handling signin
  const onPressSignUp = async () => {
    if (!email.trim()) {
      setInvalidEmail(true);
      return;
    } else if (!password.trim()) {
      setInvalidEmail(false);
      setInvalidPassword(true);
      return;
    } else if (!confirmPassword.trim()) {
      setInvalidEmail(false);
      setInvalidConfirmPassword(true);
      return;
    } else {
      setisLoading(true);
      setInvalidEmail(false);
      setInvalidPassword(false);
      userSignUp();
    }
  };

  console.log(email, password);

  return (
    <SafeAreaView style={styles.center}>
      <KeyboardAwareScrollView
        style={styles.keyboard}
        keyboardShouldPersistTaps="handled">
        <View style={{alignItems: 'center', marginTop: moderateScale(-20)}}>
          <LoginLogo width={200} height={200} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle} variant="displayMedium">
            Kit Box
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
            onChangeText={text => {
              setApiError(false);
              setInvalidEmail(false);
              setEmail(text);
            }}
            error={invalidEmail}
            errorMsg={'Enter a email address'}
          />
          <View style={{marginTop: moderateScale(5)}} />
          <InputField
            label={'Password'}
            placeholder={'Enter password'}
            textContentType="password"
            secureTextEntry
            value={password}
            onChangeText={text => {
              setApiError(false);
              setInvalidPassword(false);
              setPassword(text);
            }}
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
            onChangeText={text => {
              setApiError(false);
              setInvalidConfirmPassword(false);
              setConfirmPassword(text);
            }}
            error={invalidConfirmPassword}
            errorMsg={'Enter a password'}
          />
          <CustomButton title={'Register'} onPress={onPressSignUp} />
        </View>
        <TouchableOpacity
          style={styles.regContainer}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.regText}>Already have an account? Sign In</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
        <Text style={styles.orContainer}>Sign Up with social account</Text>
        <View style={styles.socialContainer}>
          <SocialButton icon={<Google width={30} height={30} />} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
