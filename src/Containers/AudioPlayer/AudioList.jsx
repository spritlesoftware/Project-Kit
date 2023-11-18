import {View, StyleSheet} from 'react-native';
import React from 'react';
import TopTab from '../../Components/Tab/TopTab';
import AllSongs from './AllSongs';
import PlayList from './PlayListGroup';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-paper';

const AudioList = () => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.headerTitle}>
        TRACKit
      </Text>
      <TopTab
        name1={'AllSongs'}
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
    backgroundColor: colors.BLACK,
  },

  headerTitle: {
    color: colors.WHITE,
    fontFamily: fonts.BOLD,
    marginLeft: moderateScale(10),
    marginTop: moderateScale(5),
    paddingVertical: moderateScale(10),
    fontSize: moderateScale(25),
  },
});

export default AudioList;
