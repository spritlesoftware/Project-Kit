import { Text, View, StyleSheet } from "react-native";
import InputField from "../../Components/TextInput/InputField";
import { useState, useContext } from "react";
import CustomButton from "../../Components/Button/CustomButton";
import { AppContext } from '../../Navigations/StackNavigator';
import { fonts } from "../../Utils/fonts";

export default function NewItem({ route, navigation }) {
    const { tableData, setTableData,fonts } = useContext(AppContext);
    const [formValues, setFormValues] = useState({});

    console.log(formValues)

    const onInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };
    return (
        <View style={styles.container}>
            <View style={{width:"80%",marginRight:"auto",marginLeft:"auto"}}>
                <Text style={[styles.header,{fontFamily:fonts.BOLD}]}>New Item</Text>
                {route.params.titles.map((each, index) => {
                    return (
                            <InputField
                                key={index}
                                label={each}
                                value={formValues[each] || ''}
                                onChangeText={(text) => onInputChange(each, text)}
                            />
                    )
                })}
                <CustomButton
                    title={'Save'}
                    onPress={() => {
                        if (Object.entries(formValues).length) {
                            setTableData([...tableData, formValues])
                            setFormValues({})
                            navigation.navigate("Table")
                        }
                    }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        padding: 30,
        color: "black",
      
    }
})