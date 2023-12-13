import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import {colors} from '../../Utils/colors';
import List from '../../Components/Video/List';
import HeaderWithBackaction from '../../Components/Header/HeaderWithBackaction';
import Loader from '../../Components/Loader/Loader';
import BottomSheetModal from '../../Components/Drawer/BottomSheetModal';
import VideoListLogic from '../../Functions/Video/VideoList';

const VideoList = ({navigation}) => {
  const {
    videoData,
    isLoading,
    current,
    setCurrent,
    drawerOpen,
    handleDrawerToggle,
  } = VideoListLogic();

  return (
    <View style={styles.container}>
      <HeaderWithBackaction title="Videos" />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TouchableWithoutFeedback onPress={handleDrawerToggle}>
            <FlatList
              data={videoData}
              renderItem={({item, index}) => (
                <List
                  item={{item, index}}
                  handleDrawerToggle={handleDrawerToggle}
                  navigation={navigation}
                  setCurrent={setCurrent}
                />
              )}
            />
          </TouchableWithoutFeedback>
          <BottomSheetModal
            title={current}
            isVisible={drawerOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </>
      )}
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
