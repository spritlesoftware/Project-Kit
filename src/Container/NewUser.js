import { Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useState ,useEffect} from "react";
import Radar, { Map, Autocomplete } from "react-native-radar";

export default function NewUser({ navigation }) {
    const[userId,setUserId]=useState("")
    const[description,setDescription]=useState("")
    const [invalidUserId, setInvalidUserId] = useState(false)
    const [invalidDescription, setInvalidDescription] = useState(false)

    function validateInput() {
        if (!userId) {
            setInvalidUserId(true)
        }
        if (!description) {
            setInvalidDescription(true)
        }
        if (userId && description) {
            navigation.navigate("GeoFencing",{
                userId:userId,
                description:description
            })
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
            <Text style={{ fontSize: 25, textAlign: "center", color: "black", padding: 20 }}>Create New User</Text>
            <View style={{ width: "85%", marginLeft: "auto", marginRight: "auto" }}>
                <TextInput
                    label="Enter User Id"
                    value={userId}
                    onChangeText={text => setUserId(text)}
                    placeholder="User Id"
                    mode="outlined"
                    style={{ marginBottom: 10 }}
                />
                {invalidUserId ? <Text style={{ fontSize: 12, color: "red", marginBottom: 15 }}>Please enter User Id</Text> : null}
                <TextInput
                    label="Enter Description"
                    value={description}
                    onChangeText={text => setDescription(text)}
                    placeholder="Description"
                    mode="outlined"
                    style={{ marginBottom: 10 }}
                />
                {invalidDescription ? <Text style={{ fontSize: 12, color: "red", marginBottom: 15 }}>Please enter Description</Text> : null}
                <Button mode="contained" onPress={validateInput} buttonColor="#1e90ff" style={{marginTop:25}}>Create</Button>
            </View>
        </View >
    )
}


// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import NewUser from "./src/Container/NewUser";
// import Geofencing from "./src/Container/GeoFencing";

// const UserContext = createContext()

// const Stack = createNativeStackNavigator();

// export default function App() {
//   useEffect(() => {
//     console.log("App")
//     Radar.initialize("prj_test_pk_71e82fea86d18f5b4811d07800057490f7243af0", true);
//     Radar.setUserId("New_User");
//     Radar.setDescription("Testing");
//     //fetch the API 
//     Radar.startTrackingResponsive()
//   }, [])
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{
//         headerShown: false
//       }}>
//         <Stack.Screen name="NewUser" component={NewUser} />
//         <Stack.Screen name="GeoFencing" component={Geofencing} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
