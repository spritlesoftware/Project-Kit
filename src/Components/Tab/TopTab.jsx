import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllSongs from '../../Containers/AudioPlayer/AllSongs';
import PlayList from '../../Containers/AudioPlayer/PlayListGroup';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';

const Tab = createMaterialTopTabNavigator();

const TopTab = props => {
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
          backgroundColor: colors.GREEN,
        },
      }}>
      <Tab.Screen name={props.name1} component={props.component1} />
      <Tab.Screen name={props.name2} component={props.component2} />
    </Tab.Navigator>
  );
};

export default TopTab;
