import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import VideoPlayer from 'react-native-video-controls';
import {useNavigation, useRoute} from '@react-navigation/native';

const ChatVideoPlayer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{uri: route?.params?.url}}
        onBack={() => navigation.goBack()}
      />
    </View>
  );
};

export default ChatVideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
