import {useCameraDevice, useCodeScanner} from 'react-native-vision-camera';
import { Linking } from 'react-native';
export default function BarcodeScannerFunction(navigation){
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

      return{
        codeScanner
      }
    
}