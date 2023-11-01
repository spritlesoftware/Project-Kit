import { View, Text, StyleSheet } from "react-native";
import InputField from "../Components/InputField";
import { useState } from "react";
import Buttons from "../Components/Buttons";
import { formData } from "../Data/FormData";
import { RadioButton } from "react-native-paper";
import { Checkbox } from "react-native-paper";


export default function Form() {
    const [formValues, setFormValues] = useState({});

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
                        <View key={field.id}>
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
                        <View key={field.id}>
                            <Text>{field.label}</Text>
                            {
                                field.options.map((option)=>{
                                    return(
                                        <Checkbox
                                        key={option}
                                        status={formValues[field.id] === option ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            onInputChange(field.id, {
                                                ...(formValues[field.id] || {}),
                                                [option]: !formValues[field.id]?.[option],
                                              })
                                            }
                                        }
                                      />
                                    )
                                })
                            }
                            {/* {field.options.map((option) => (
                <CheckBox
                  key={option}
                  title={option}
                  checked={formValues[field.id] && formValues[field.id].includes(option)}
                  onPress={() =>
                    handleInputChange(field.id, {
                      ...(formValues[field.id] || {}),
                      [option]: !formValues[field.id]?.[option],
                    })
                  }
                />
              )} */}
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
    }

})