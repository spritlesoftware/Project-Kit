import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const Firebase = () => {
  const [user, setUser] = useState([]);
  const GetData = async () => {
    const usersCollection = firestore().collection('Users');
    const usersSnapshot = await usersCollection.get();

    const users = usersSnapshot.docs.map(documentSnapshot => {
      const data = documentSnapshot.data();
      return {
        id: documentSnapshot.id,
        projectName: data.project_name,
      };
    });

    setUser(users);
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <View>
      {user.map(user => (
        <>
          <Text>{user.projectName}</Text>
          <Text>{user.id}</Text>
        </>
      ))}
    </View>
  );
};

export default Firebase;
