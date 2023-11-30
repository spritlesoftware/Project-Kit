import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllSongs from '../../Containers/AudioPlayer/AllSongs';
import PlayList from '../../Containers/AudioPlayer/PlayListGroup';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import { useAppContext } from '../../Context/ContextProvider';

const Tab = createMaterialTopTabNavigator();

const TopTab = props => {
  const {fonts} = useAppContext()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.WHITE,
        },
        tabBarLabelStyle: {
          color: colors.BLACK,
          fontFamily: fonts.BOLD,
          fontSize: moderateScale(15),
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.APP_PRIMARY,
        },
      }}>
      <Tab.Screen name={props.name1} component={props.component1} />
      <Tab.Screen name={props.name2} component={props.component2} />
    </Tab.Navigator>
  );
};

export default TopTab;
