import {View,Text,StyleSheet} from "react-native"
import { colors } from "../../Utils/colors"
export default function BarcodeOutput({route}){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>{route?.params?.output}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
   text:{
      color:colors.APP_PRIMARY,
      fontSize:25
   }
})