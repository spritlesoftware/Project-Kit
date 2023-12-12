import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export function GetFirebaseData(docID) {
  const [data, setData] = useState([]);
  const GetData = async () => {
    const usersCollection = firestore().collection('Users').doc(docID);
    const usersSnapshot = await usersCollection.get();

    setData(usersSnapshot);
  };

  useEffect(() => {
    GetData();
  }, [docID]);

  return {data};
}
