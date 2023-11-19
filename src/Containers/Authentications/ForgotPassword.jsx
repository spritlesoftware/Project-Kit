// ForgotPassword.js
import {View, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './ForgotPasswordStyles';
import ForgotPassSVG from '../../Assets/images/forgot_password.svg';
import InputField from '../../Components/TextInput/InputField';
import {moderateScale} from 'react-native-size-matters';
import CustomButton from '../../Components/Button/CustomButton';
import {colors} from '../../Utils/colors';
import {ActivityIndicator, Text} from 'react-native-paper';
import useForgotPasswordLogic from '../../Functions/ForgotPassword';

const ForgotPassword = ({navigation}) => {
  const {
    email,
    setEmail,
    token,
    setToken,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    isTokenSent,
    isLoading,
    resendClicked,
    success,
    invalidToken,
    setInvalidToken,
    invalidPassword,
    setInvalidPassword,
    passwordMismatch,
    setPasswordMismatch,
    error,
    setError,
    errorMessage,
    submitEmailAddress,
    sendToken,
    verifyPassword,
  } = useForgotPasswordLogic(navigation);

  const renderHeader = title => {
    return (
      <>
        <View style={{alignItems: 'center'}}>
          <ForgotPassSVG width={200} height={200} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle} variant="headlineMedium">
            {title}
          </Text>
        </View>
      </>
    );
  };

  const renderEmailScreen = () => {
    return (
      <>
        {renderHeader('Password Reset')}
        <View style={{alignItems: 'center'}}>
          {error ? (
            <Text style={styles.errorStyleWithLarge}>{errorMessage}</Text>
          ) : null}

          <InputField
            label={'Email'}
            placeholder={'Enter email addeess'}
            textContentType="emailAddress"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Text style={styles.infoText}>
            Enter your registered email address
          </Text>
          <CustomButton
            title={'Submit'}
            onPress={submitEmailAddress}
            loading={isLoading}
          />
        </View>
      </>
    );
  };

  const renderTokenScreen = () => {
    return (
      <>
        {renderHeader('Password Reset')}
        {error ? (
          <Text
            style={[
              styles.errorStyleWithLarge,
              {
                color:
                  errorMessage === 'We have send you another code.'
                    ? colors.LIGHT_GREEN
                    : colors.RED_BORDER,
              },
            ]}>
            {errorMessage}
          </Text>
        ) : (
          <Text
            style={[
              styles.errorStyleWithLarge,
              {
                color: colors.BLACK,
              },
            ]}>
            Enter the verification code send to your email address.
          </Text>
        )}
        <InputField
          label={''}
          placeholder={'Enter the code'}
          textContentType="password"
          value={token}
          onChangeText={text =>
            setInvalidToken(false) || setError(false) || setToken(text)
          }
          keyboardType={'numeric'}
        />
        {invalidToken ? (
          <Text
            style={[
              styles.errorStyle,
              {
                color: colors.RED_BORDER,
              },
            ]}>
            {'Please Enter the token'}
          </Text>
        ) : null}
        {resendClicked ? (
          <ActivityIndicator
            style={{alignSelf: 'flex-start', marginTop: moderateScale(5)}}
            animating={true}
            color={colors.APP_PRIMARY}
          />
        ) : (
          <TouchableOpacity
            onPress={async () => {
              setResendClicked(true);
              await sendToken();
            }}>
            <Text style={[styles.emailInfoText, {marginLeft: 0, fontSize: 14}]}>
              Resend
            </Text>
          </TouchableOpacity>
        )}
        <View style={{marginTop: moderateScale(10)}} />
        <Text style={styles.newPassword}>Create a new password</Text>
        <InputField
          placeholder={'New Password'}
          value={newPassword}
          onChangeText={text =>
            setError(false) ||
            setInvalidPassword(false) ||
            setPasswordMismatch(false) ||
            setNewPassword(text)
          }
          keyboardType={'default'}
        />
        {invalidPassword ? (
          <Text
            style={[
              styles.errorStyle,
              {
                color: colors.RED_BORDER,
              },
            ]}>
            {'Too Short'}
          </Text>
        ) : null}
        <View style={{marginTop: moderateScale(10)}} />
        <InputField
          placeholder={'Confirm Password'}
          value={confirmPassword}
          onChangeText={text =>
            setError(false) ||
            setPasswordMismatch(false) ||
            setInvalidPassword(false) ||
            setConfirmPassword(text)
          }
          onSubmitEditing={verifyPassword}
          keyboardType={'default'}
        />
        {passwordMismatch ? (
          <Text
            style={[
              styles.errorStyle,
              {
                color: colors.RED_BORDER,
              },
            ]}>
            {'Password do not match'}
          </Text>
        ) : null}
        {resendClicked ? null : (
          <CustomButton
            style={{alignSelf: 'center', marginTop: moderateScale(40)}}
            title={'Submit'}
            onPress={verifyPassword}
            isLoading={isLoading}
          />
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.center}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        {!success && !isTokenSent
          ? renderEmailScreen()
          : !success && isTokenSent
          ? renderTokenScreen()
          : ''}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
