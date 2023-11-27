import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Linking,
  ToastAndroid
} from 'react-native';
import {useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {RNHole, RNHoleView} from 'react-native-hole-view';

export default function BarcodeScanner({navigation}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [hasPermission, setHasPermission] = React.useState(false);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      const res = codes[0].value;
      if (res.startsWith('http')) {
        console.log("QRcode")
        console.log(res)
        Linking.openURL(res);
      } else {
        console.log("Barcode")
        navigation.navigate('BarcodeOutput', {
          output: res,
        });
      }
    },
  });

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      console.log(status);
      setHasPermission(status === 'granted');
    })();
  }, []);
  console.log('hasPermission', hasPermission);
  return (
    hasPermission && (
      <>
        <Camera
          style={{width: '100%', height: '100%'}}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />

        {/* Back Button */}
        <RNHoleView
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(1,1,1,.7)',
          }}
          holes={[
            {
              x: windowWidth / 4.5,
              y: windowHeight / 3,
              width: 230,
              height: 230,
              borderRadius: 25,
            },
          ]}>
          <View
            style={{
              width: 260,
              height: 260,
              // borderRadius: 20,
              overflow: 'hidden',
              rowGap: 100,
              position: 'absolute',
              top: windowHeight / 3.2,
              left: windowWidth / 5.5,
              // This is important to clip the border at the corners
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                columnGap: 100,
              }}>
              <View
                style={{
                  flex: 1,
                  borderTopLeftRadius: 35,
                  borderTopWidth: 6,
                  borderTopColor: '#00A1F1',
                  borderLeftWidth: 6,
                  borderLeftColor: '#00A1F1',
                }}
              />
              <View
                style={{
                  flex: 1,
                  borderTopRightRadius: 35,
                  borderTopWidth: 6,
                  borderTopColor: '#7CBB00',
                  borderRightWidth: 6,
                  borderRightColor: '#7CBB00',
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                columnGap: 100,
              }}>
              <View
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 35,
                  borderBottomWidth: 6,
                  borderBottomColor: '#FFBB00',
                  borderLeftWidth: 6,
                  borderLeftColor: '#FFBB00',
                }}
              />
              <View
                style={{
                  flex: 1,
                  borderBottomRightRadius: 35,
                  borderBottomWidth: 6,
                  borderBottomColor: '#F65314',
                  borderRightWidth: 6,
                  borderRightColor: '#F65314',
                }}
              />
            </View>
          </View>
        </RNHoleView>
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  button: {
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: 100,
    top: 200,
  },
  backButton: {
    position: 'absolute',
    left: 100,
    top: 200,
  },
});
