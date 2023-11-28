import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Linking,
} from 'react-native';
import {useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {RNHole, RNHoleView} from 'react-native-hole-view';
import BarcodeScannerFunction from '../../Functions/BarcodeScanner/BarcodeScanner';

export default function BarcodeScanner({navigation}) {
  const {codeScanner} = BarcodeScannerFunction(navigation);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [hasPermission, setHasPermission] = React.useState(false);
  const device = useCameraDevice('back');

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
          style={styles.rnhole}
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
            style={[
              styles.topcontainer,
              {top: windowHeight / 3.2, left: windowWidth / 5.5},
            ]}>
            <View style={styles.flexrow}>
              <View style={styles.topleft} />
              <View style={styles.topright} />
            </View>
            <View style={styles.flexrow}>
              <View style={styles.bottomleft} />
              <View style={styles.bottomright} />
            </View>
          </View>
        </RNHoleView>
      </>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topcontainer: {
    width: 260,
    height: 260,
    overflow: 'hidden',
    rowGap: 100,
    position: 'absolute',
  },
  flexrow: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 100,
  },
  topleft: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopWidth: 6,
    borderTopColor: '#00A1F1',
    borderLeftWidth: 6,
    borderLeftColor: '#00A1F1',
  },
  topright: {
    flex: 1,
    borderTopRightRadius: 35,
    borderTopWidth: 6,
    borderTopColor: '#7CBB00',
    borderRightWidth: 6,
    borderRightColor: '#7CBB00',
  },
  bottomleft: {
    flex: 1,
    borderBottomLeftRadius: 35,
    borderBottomWidth: 6,
    borderBottomColor: '#FFBB00',
    borderLeftWidth: 6,
    borderLeftColor: '#FFBB00',
  },
  bottomright: {
    flex: 1,
    borderBottomRightRadius: 35,
    borderBottomWidth: 6,
    borderBottomColor: '#F65314',
    borderRightWidth: 6,
    borderRightColor: '#F65314',
  },
  rnhole: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(1,1,1,.7)',
  },
});
