import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {firebase} from '../Firebase/firebase';
import firestore from '@react-native-firebase/firestore';

const Firebase = () => {
  const [user, setUser] = useState([]);

  const users = firestore().collection('Users');

  useEffect(async () => {
    users.onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        const {image_url, project_name} = doc.data();
        users.push({
          id: doc.id,
          image_url,
          project_name,
        });
      });
      setUser(users);
    });
    console.log(users);
  }, []);

  console.log(user);
  return (
    <View>
      <FlatList
        data={user}
        renderItem={item => {
          <View>
            <Text>{item.project_name}</Text>
          </View>;
        }}
      />
    </View>
  );
};

export default Firebase;
