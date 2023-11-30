import {View, StyleSheet} from 'react-native';
import React from 'react';
import TopTab from '../../Components/Tab/TopTab';
import AllSongs from './AllSongs';
import PlayList from './PlayListGroup';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-paper';
import { useAppContext } from '../../Context/ContextProvider';

const AudioList = () => {
  const {fonts} = useAppContext()
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={[styles.headerTitle,{ fontFamily: fonts.BOLD,}]}>
        Audio Player
      </Text>
      <TopTab
        name1={'All Songs'}
        component1={AllSongs}
        name2={'PlayList'}
        component2={PlayList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  headerTitle: {
    color: colors.APP_PRIMARY,
    marginLeft: moderateScale(10),
    marginTop: moderateScale(5),
    paddingVertical: moderateScale(25),
    fontSize: moderateScale(25),
    alignSelf: 'center',
  },
});

export default AudioList;
