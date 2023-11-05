import * as React from 'react';
import { Button } from 'react-native-paper';

export default function Buttons({btnText}) {
    return (
        <Button mode="contained" onPress={() => console.log('Pressed')} style={{padding:5}}>
         {btnText}
        </Button>
    )
}