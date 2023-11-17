import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { TableData } from "../../Data/TableData";
import { Button, DataTable } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useRef, useState } from "react";

export default function Table({navigation}) {
    const [tableData, setTableData] = useState(TableData)
    const headings = Object.keys(tableData[0])
    const bottomSheet = useRef();
    const [isClickedId, setIsClickedId] = useState("")

    function onClicked(each) {
        bottomSheet.current.show()
        setIsClickedId(each.id)
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

    function onEditClicked(){

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.flexcontainer}>
                <Text style={{ fontSize: 25, padding: 30, color: "black" }}>Table</Text>
                <Button style={{ margin: 20 }} onPress={()=>{
                    navigation.navigate("NewItem")
                }}><Text style={{ fontSize: 15, padding: 10, color: "black", borderWidth: 1, borderRadius: 15 }}>Create</Text></Button>
            </View>

            <DataTable>
                <DataTable.Header>
                    {
                        headings.map((each, index) => {
                            return <DataTable.Title key={index}><Text style={styles.header}>{each}</Text></DataTable.Title>
                        })
                    }
                </DataTable.Header>
                {
                    tableData?.map((each) => {
                        return (
                            <TouchableOpacity onPress={() => onClicked(each)}>
                                <DataTable.Row key={each.id}>
                                    <DataTable.Cell style={styles.row}>{each.id}</DataTable.Cell>
                                    <DataTable.Cell style={styles.row}>{each.name}</DataTable.Cell>
                                    <DataTable.Cell style={styles.row}>{each.age}</DataTable.Cell>
                                    <DataTable.Cell style={styles.row}>{each.city}</DataTable.Cell>
                                </DataTable.Row>
                            </TouchableOpacity>
                        )
                    })
                }
            </DataTable>
            <BottomSheet hasDraggableIcon ref={bottomSheet} height={250}>
                <Text style={{ color: "black", fontSize: 20, textAlign: "center", padding: 15, paddingTop: 25 }}>Actions</Text>
                <View style={{ display: "flex", flexDirection: "row", padding: 50, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity style={styles.icon} onPress={onEditClicked}>
                        <MaterialCommunityIcons name="circle-edit-outline" size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={onDeleteClicked}>
                        <MaterialCommunityIcons name="delete-circle-outline" color={"red"} size={50} />
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
    
    header:{ fontSize: 15, textAlign: "center", padding: 10, color: "black",fontWeight:"bold" },

    row:{ fontSize: 15, padding: 2, color: "black" },

    icon:{ padding: 20, marginLeft: 20 },
          
})