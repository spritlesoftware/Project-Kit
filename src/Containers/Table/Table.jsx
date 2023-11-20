import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Button, DataTable } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useRef, useState, useContext } from "react";
import { AppContext } from '../../Navigations/StackNavigator';
import { fonts } from "../../Utils/fonts";
import CustomButton from "../../Components/Button/CustomButton";
import { colors } from "../../Utils/colors";

export default function Table({ navigation }) {
    const { tableData, setTableData } = useContext(AppContext);
    const headings = Object.keys(tableData[0])
    const bottomSheet = useRef();
    const [isClickedId, setIsClickedId] = useState("")
    const [isClickedItem, setIsClickedItem] = useState()

    function onClicked(each) {
        bottomSheet.current.show()
        setIsClickedId(each.id)
        setIsClickedItem(each)
    }

    function onDeleteClicked() {
        console.log(isClickedId + "is deleted")
        const data = tableData.filter((each) => {
            if (each.id !== isClickedId) {
                return each
            }
        })
        setTableData(data)
        bottomSheet.current.close()
    }

    function onEditClicked() {
        navigation.navigate("EditItem", {
            item: isClickedItem,
            id: isClickedId
        })

    }

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.flexcontainer}>
                <Text style={{ fontSize: 25, padding: 30, color:colors.APP_PRIMARY, fontFamily: fonts.BOLD, }}>Kitbox-Table</Text>
                <View style={{ marginRight: 20, marginTop: 10 }}>
                    <CustomButton
                        title={'Create'}
                        onPress={() => {
                            navigation.navigate("NewItem", {
                                titles: headings,
                            })
                        }} />
                </View>
            </View>

            <DataTable>
                <DataTable.Header>
                    {
                        headings.map((each, index) => {
                            return <DataTable.Title key={index}><Text style={[styles.header,key={index}, { fontFamily: fonts.BOLD }]}>{each}</Text></DataTable.Title>
                        })
                    }
                </DataTable.Header>
                {
                    tableData?.map((each) => {
                        return (
                            <TouchableOpacity onPress={() => onClicked(each)}>
                                <DataTable.Row key={each.id}>
                                    <DataTable.Cell key={each.id} ><Text style={[styles.row]}>{each.id}</Text></DataTable.Cell>
                                    <DataTable.Cell key={each.name} ><Text style={[styles.row]}>{each.name}</Text></DataTable.Cell>
                                    <DataTable.Cell key={each.age} ><Text style={styles.row}>{each.age}</Text></DataTable.Cell>
                                    <DataTable.Cell key={each.city} ><Text style={styles.row}>{each.city}</Text></DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        )
                    })
                }
            </DataTable>
            <BottomSheet hasDraggableIcon ref={bottomSheet} height={250}>
                <Text style={{ color: "black", fontSize: 20, textAlign: "center", padding: 15, paddingTop: 25, fontFamily: fonts.MEDIUM }}>Actions</Text>
                <View style={{ display: "flex", flexDirection: "row", padding: 20, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={styles.icon} onPress={onEditClicked}>
                        <MaterialCommunityIcons name="circle-edit-outline" size={50} color={"gray"} />
                        <Text style={{ fontFamily: fonts.LIGHT, fontSize: 15, textAlign: "center",color:"gray" }}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={onDeleteClicked}>
                        <MaterialCommunityIcons name="delete-circle-outline" color={"red"} size={50} />
                        <Text style={{ fontFamily: fonts.LIGHT, fontSize: 15, textAlign: "center",color:"gray" }}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    flexcontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    header: { fontSize: 15, textAlign: "center", padding: 10, color: "black",fontWeight:"bold" },

    row: { fontSize: 15, padding: 2, color: "black",fontFamily:'Poppins-Regular' },

    icon: { padding: 20, marginLeft: 20 },

})