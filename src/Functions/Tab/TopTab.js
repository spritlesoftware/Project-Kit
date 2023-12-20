import {GetFirebaseData} from '../../Containers/Firebase';
import {useEffect, useState} from 'react';

function TopTabLogic() {
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = GetFirebaseData('Top Tab');

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

export default TopTabLogic;
