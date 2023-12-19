import {StyleSheet, Text, View} from 'react-native';
import {GetFirebaseData} from '../../Containers/Firebase';
import {useEffect, useState} from 'react';

function BottomTabLogic() {
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = GetFirebaseData('Bottom-Tab');

  useEffect(() => {
    if (user._data) {
      setTabData(user._data.data);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (tabData.length <= 0) {
      setIsLoading(true);
    }
  }, []);

  return {
    tabData,
    isLoading,
  };
}

export default BottomTabLogic;
