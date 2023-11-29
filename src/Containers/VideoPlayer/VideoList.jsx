import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {colors} from '../../Utils/colors';
import List from '../../Components/Video/List';
import HeaderWithBackaction from '../../Components/Header/HeaderWithBackaction';
import {videoData} from '../../Data/VideoData';

const VideoList = () => {
  return (
    <View style={styles.container}>
      <HeaderWithBackaction title="Videos" />
      <FlatList data={videoData} renderItem={item => <List item={item} />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default VideoList;
