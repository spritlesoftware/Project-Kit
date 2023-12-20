import { GetFirebaseData } from '../../Containers/Firebase';
import { useState,useEffect } from 'react';

export const DatePickerTopTab= () => {
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = GetFirebaseData('Event Calendar');

  useEffect(() => {
    if (user._data) {
      setTabData(user._data.data[0].tabData);
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
};