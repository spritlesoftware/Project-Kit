import { View,Text } from 'react-native';
import { LogLevel, OneSignal } from 'react-native-onesignal';

export function Notifications(){
// Remove this method to stop OneSignal Debugging
OneSignal.Debug.setLogLevel(LogLevel.Verbose);

// OneSignal Initialization
OneSignal.initialize("0980797e-b0e1-4d3a-954d-68091221811e");

// requestPermission will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission
OneSignal.Notifications.requestPermission(true);

// Method for listening for notification clicks
OneSignal.Notifications.addEventListener('click', (event) => {
  console.log('OneSignal: notification clicked:', event);
});
 return(
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:20,color:"black"}}>Notifications</Text>
    </View>
 )
}

