import {StyleSheet, Text, View} from 'react-native';
import {GetFirebaseData} from '../../Containers/Firebase';

function BottomTabLogic() {
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = GetFirebaseData('Video-Player');

  useEffect(() => {
    if (user._data) {
      setTabData(user._data.data);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (tabData === null || tabData === undefined) {
      setIsLoading(true);
    }
  }, []);

  return {
    tabData,
  };
}

export default BottomTabLogic;

const styles = StyleSheet.create({});
