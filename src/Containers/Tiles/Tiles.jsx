import { Pressable, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { fonts } from "../../Utils/fonts";
import { colors } from "../../Utils/colors";

export default function Tiles({ navigation }) {
    const onClickAuthentication = () => {
        navigation.navigate('Login');
    };
    const onClickForm = () => {
        navigation.navigate('Form');
    };
    const onClickChat = () => {
        navigation.navigate('ChatList');
    };
    const onClickTable = () => {
        navigation.navigate('Table');
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: colors.APP_PRIMARY, fontSize: 35, fontFamily: fonts.BOLD, padding: 30, textAlign: "center" }}>Components</Text>
            <View style={{ display: "flex", flexDirection: "row", columnGap: 10, flexWrap: "wrap", rowGap: 10 }}>
                <TouchableOpacity onPress={onClickAuthentication} style={styles.tilecontainer}>
                    <Image style={{ width: "100%", height: "90%", borderWidth: 10 }} source={require("../../Assets/images/auth.png")} />
                    <Text style={styles.tiletext}>Authentication</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickForm} style={styles.tilecontainer}>
                    <Image style={{ width: "100%", height: "90%", borderWidth: 10 }} source={require("../../Assets/images/forms.png")} />
                    <Text style={styles.tiletext}>Form</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickTable} style={styles.tilecontainer}>
                    <Image style={{ width: "100%", height: "90%", borderWidth: 10 }} source={require("../../Assets/images/tables.png")} />
                    <Text style={styles.tiletext}>Table</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClickChat} style={styles.tilecontainer}>
                    <Image style={{ width: "100%", height: "90%", borderWidth: 10 }} source={require("../../Assets/images/chats.png")} />
                    <Text style={styles.tiletext}>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    },
    tilecontainer: {
        // borderRadius: 15,
        padding: 15,
        width: "48%",
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        elevation:2,
        elevation:5,
        backgroundColor:"#fff"
    },
    tiletext: {
        color: colors.BLACK,
        textAlign: "left",
        fontFamily: fonts.REGULAR,
        padding: 5,
        borderRadius: 10,
        position: "absolute",
        top: 120
    },
})