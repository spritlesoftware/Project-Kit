import { Pressable, Text, TouchableOpacity, View,StyleSheet } from "react-native";
import { fonts } from "../../Utils/fonts";
import { colors } from "../../Utils/colors";

export default function Tiles({ navigation }) {
    const onAuthentication = () => {
        navigation.navigate('Login');
    };
    const onForm = () => {
        navigation.navigate('Form');
    };
    const onChat = () => {
        navigation.navigate('ChatList');
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff",padding:20}}>
            <Text style={{ color:colors.APP_PRIMARY, fontSize: 25, fontFamily: fonts.BOLD, padding: 20, textAlign: "center" }}>Components</Text>
            <View style={{ display: "flex", flexDirection: "row", columnGap: 10,flexWrap:"wrap",rowGap:10 }}>
                <TouchableOpacity onPress={onAuthentication} style={{ borderWidth: 1, borderRadius: 15, padding: 20, width: "48%" }}>
                    <Text style={{ color: "black", textAlign: "center", fontFamily: fonts.MEDIUM }}>Authentication</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onForm} style={{ borderWidth: 1, borderRadius: 15, padding: 20, width: "48%" }}>
                    <Text style={{ color: "black", textAlign: "center", fontFamily: fonts.MEDIUM }}>Form</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onChat} style={{ borderWidth: 1, borderRadius: 15, padding: 20, width: "48%" }}>
                    <Text style={{ color: "black", textAlign: "center", fontFamily: fonts.MEDIUM }}>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}