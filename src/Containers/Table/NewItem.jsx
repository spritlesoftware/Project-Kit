import { Text, View,StyleSheet } from "react-native";
import InputField from "../../Components/TextInput/InputField";

export default function NewItem(){
    return(
        <View style={styles.container}>
            <Text style={styles.header}>New Item</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
    }, 
    header:{
          fontSize:25,
          textAlign:'center',
          padding:30,
          color:"black"
    }
})