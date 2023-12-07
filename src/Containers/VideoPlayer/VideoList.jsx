import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Utils/colors';
import List from '../../Components/Video/List';
import HeaderWithBackaction from '../../Components/Header/HeaderWithBackaction';
import {videoData} from '../../Data/VideoData';
import BottomDrawer from '../../Components/Drawer/BottomDrawer';

const VideoList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerAnimation = new Animated.Value(0);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);

    Animated.timing(drawerAnimation, {
      toValue: drawerOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <HeaderWithBackaction title="Videos" />
      <TouchableWithoutFeedback onPress={() => handleDrawerToggle()}>
        <FlatList
          data={videoData}
          renderItem={item => (
            <List
              item={item}
              handleDrawerToggle={handleDrawerToggle}
              drawerOpen={drawerOpen}
            />
          )}
        />
      </TouchableWithoutFeedback>
      <BottomDrawer
        status={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
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
