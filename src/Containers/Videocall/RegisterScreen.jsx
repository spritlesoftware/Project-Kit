import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  checkMultiple,
  request,
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import {AppContext} from '../../Navigations/StackNavigator';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import {colors} from '../../Utils/colors';
import {useAppContext} from '../../Context/ContextProvider';

export const RegisterScreen = ({navigation}) => {
  useEffect(() => {
    _checkPermissions();
  }, []);
  const {props, setProps, fonts} = useAppContext();
  const _checkPermissions = callback => {
    const iosPermissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
    const androidPermissions = [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
    ];
    checkMultiple(
      Platform.OS === 'ios' ? iosPermissions : androidPermissions,
    ).then(statuses => {
      const [CAMERA, AUDIO] =
        Platform.OS === 'ios' ? iosPermissions : androidPermissions;
      if (
        statuses[CAMERA] === RESULTS.UNAVAILABLE ||
        statuses[AUDIO] === RESULTS.UNAVAILABLE
      ) {
        Alert.alert(
          'Error',
          'Hardware to support video calls is not available',
        );
      } else if (
        statuses[CAMERA] === RESULTS.BLOCKED ||
        statuses[AUDIO] === RESULTS.BLOCKED
      ) {
        Alert.alert(
          'Error',
          'Permission to access hardware was blocked, please grant manually',
        );
      } else {
        if (
          statuses[CAMERA] === RESULTS.DENIED &&
          statuses[AUDIO] === RESULTS.DENIED
        ) {
          requestMultiple(
            Platform.OS === 'ios' ? iosPermissions : androidPermissions,
          ).then(newStatuses => {
            if (
              newStatuses[CAMERA] === RESULTS.GRANTED &&
              newStatuses[AUDIO] === RESULTS.GRANTED
            ) {
              callback && callback();
            } else {
              Alert.alert('Error', 'One of the permissions was not granted');
            }
          });
        } else if (
          statuses[CAMERA] === RESULTS.DENIED ||
          statuses[AUDIO] === RESULTS.DENIED
        ) {
          request(statuses[CAMERA] === RESULTS.DENIED ? CAMERA : AUDIO).then(
            result => {
              if (result === RESULTS.GRANTED) {
                callback && callback();
              } else {
                Alert.alert('Error', 'Permission not granted');
              }
            },
          );
        } else if (
          statuses[CAMERA] === RESULTS.GRANTED ||
          statuses[AUDIO] === RESULTS.GRANTED
        ) {
          callback && callback();
        }
      }
    });
  };
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{width: '80%', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 35,
            padding: 20,
            fontFamily: fonts.BOLD,
            color: colors.APP_PRIMARY,
          }}>
          Video chat
        </Text>
        <View style={{width: '100%'}}>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              fontFamily: fonts.REGULAR,
            }}>
            Enter your Name
          </Text>
          <TextInput
            style={{
              color: 'black',
              borderColor: '#363737',
              borderRadius: 15,
              borderWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            autoCapitalize="none"
            value={props.userName}
            onChangeText={text => setProps({...props, userName: text})}
          />
        </View>
        <View style={{width: '100%'}}>
          <Text
            style={{
              color: 'black',
              textAlign: 'left',
              fontFamily: fonts.REGULAR,
            }}>
            Enter your Room Name
          </Text>
          <TextInput
            style={{
              color: 'black',
              borderColor: '#363737',
              borderRadius: 15,
              borderWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
            autoCapitalize="none"
            value={props.roomName}
            onChangeText={text => setProps({...props, roomName: text})}
          />
        </View>
        <View style={{width: '100%', margin: 30}}>
          <TouchableOpacity
            disabled={false}
            style={{
              padding: 15,
              backgroundColor: colors.APP_PRIMARY,
              borderRadius: 15,
            }}
            onPress={() => {
              _checkPermissions(() => {
                fetch(
                  `https://4240-113-193-25-170.ngrok-free.app/getToken?userName=${props.userName}`,
                )
                  .then(response => {
                    if (response.ok) {
                      response.text().then(jwt => {
                        setProps({...props, token: jwt});
                        navigation.navigate('Videocall');
                        return true;
                      });
                    } else {
                      response.text().then(error => {
                        console.log(error);
                        Alert.alert(error);
                      });
                    }
                  })
                  .catch(error => {
                    console.log('error', error);
                    Alert.alert('API not available');
                  });
              });
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: fonts.MEDIUM,
              }}>
              Connect to Video Call
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: colors.GRAY2,
              padding: 20,
              textAlign: 'center',
              fontFamily: fonts.REGULAR,
            }}>
            Twilio Video
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
