import { Text, View } from "react-native";
import { TableData } from "../../Data/TableData";
import { DataTable } from 'react-native-paper';

export default function Table() {
     const headings = Object.keys(TableData[0])
    console.log(headings)
    return (
        <View>
            <Text>This is a table</Text>
            <DataTable>
                <DataTable.Header>
                    {
                        headings.map((each)=>{
                            return <DataTable.Title><Text>{each}</Text></DataTable.Title>
                        })
                    }
                </DataTable.Header>
                {
                    TableData.map((each) => {
                        return (
                            <>
                                <DataTable.Row>
                                    <DataTable.Cell>{each.id}</DataTable.Cell>
                                    <DataTable.Cell>{each.name}</DataTable.Cell>
                                    <DataTable.Cell>{each.age}</DataTable.Cell>
                                    <DataTable.Cell>{each.city}</DataTable.Cell>
                                </DataTable.Row>
                            </>
                        )
                    })
                }
            </DataTable>
        </View>
    )
}