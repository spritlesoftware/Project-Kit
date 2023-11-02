import { View, Text, StyleSheet } from "react-native";
import InputField from "../Components/InputField";
import { useState ,useRef} from "react";
import Buttons from "../Components/Buttons";
import { formData } from "../Data/FormData";
import { RadioButton } from "react-native-paper";
import { Checkbox } from "react-native-paper";
import SelectDropdown from 'react-native-select-dropdown'
import {FontAwesome} from "react-native-vector-icons"


export default function Form() {
    const [formValues, setFormValues] = useState({});
    const citiesDropdownRef = useRef();

    const onInputChange = (fieldId, value) => {
        setFormValues({ ...formValues, [fieldId]: value });
    };
    console.log("formValues", formValues)
    function renderFormFields() {
        return formData.map((field) => {
            switch (field.type) {
                case "text":
                    return (<InputField
                        key={field.id}
                        label={field.label}
                        value={formValues[field.id] || ''}
                        onChangeText={(text) => onInputChange(field.id, text)}
                    />)

                case "email":
                    return (<InputField
                        key={field.id}
                        label={field.label}
                        value={formValues[field.id] || ''}
                        onChangeText={(text) => onInputChange(field.id, text)}
                    />)

                case "radio":
                    return (
                        <View key={field.id} style={{ marginBottom: 10 }}>
                            <Text>{field.label}</Text>
                            {field.options.map((option) => {
                                return (
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <RadioButton
                                            key={option}
                                            value={option}
                                            status={formValues[field.id] === option ? 'checked' : 'unchecked'}
                                            onPress={() => onInputChange(field.id, option)}
                                        />
                                        <Text>{option}</Text>
                                    </View>
                                )
                            })}

                        </View>
                    )
                case "checkbox":
                    return (
                        <View key={field.id} style={{ marginBottom: 10 }}>
                            <Text>{field.label}</Text>
                            {
                                field.options.map((option) => {
                                    return (
                                        <View style={{ display: "flex", flexDirection: "row" }}>
                                            <Checkbox
                                                key={option}
                                                status={formValues[field.id]?.[option] ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    onInputChange(field.id, {
                                                        ...(formValues[field.id] || {}),
                                                        [option]: !formValues[field.id]?.[option],

                                                    })
                                                }
                                                }
                                            />
                                            <Text>{option}</Text>
                                        </View>
                                    )
                                })
                            }

                        </View>
                    )

                case "select":
                    return (
                        <View>
                            <Text>{field.label}</Text>
                            <SelectDropdown
                                data={field.options}
                                ref={citiesDropdownRef}
                                onSelect={(selectedItem, index) => {
                                    //console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                                // buttonStyle={styles.dropdown2BtnStyle}
                                // buttonTextStyle={styles.dropdown2BtnTxtStyle}
                                // renderDropdownIcon={isOpened => {
                                //   return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
                                // }}
                                // dropdownStyle={styles.dropdown2DropdownStyle}
                                // rowStyle={styles.dropdown2RowStyle}
                                // rowTextStyle={styles.dropdown2RowTxtStyle}
                            />
                        </View>
                    )

            }
        })
    }
    return (
        <View style={styles.container}>
            {renderFormFields()}
            <Buttons btnText={"Submit"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    dropdown2BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
      },
      dropdown2BtnTxtStyle: {color: '#444', textAlign: 'left'},
      dropdown2DropdownStyle: {backgroundColor: '#EFEFEF'},
      dropdown2RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
      dropdown2RowTxtStyle: {color: '#444', textAlign: 'left'},

})