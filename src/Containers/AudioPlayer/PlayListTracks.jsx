import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import TracklList from '../../Components/Audio/TrackList';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import {Text} from 'react-native-paper';
import Back from 'react-native-vector-icons/AntDesign';
import PlayingTrackBottom from '../../Components/Audio/PlayingTrackBottom';
import {
  handleFavourites,
  handleItemPress,
} from '../../Functions/Audio/AudioMethods';
import {useAppContext} from '../../Context/ContextProvider';

const PlayListTracks = ({navigation}) => {
  const [audioStatus, setAudioStatus] = useState();

  const {
    queue,
    setQueue,
    favourites,
    setFavourites,
    currentTrack,
    setCurrentTrack,
  } = useAppContext();

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      TrackPlayer.getActiveTrack().then(index => setCurrentTrack(index));
    }
  });

  function HandleFavourites(item) {
    handleFavourites(item, favourites, setFavourites);
  }

  function HandlePress(index) {
    handleItemPress(index);
  }

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
      setAudioStatus('Pause');
    } else {
      TrackPlayer.play();
      setAudioStatus('Playing');
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.headerContainer}>
        <Back
          name="left"
          color={colors.WHITE}
          size={moderateScale(20)}
          style={styles.button}
        />
        <Text variant="headlineSmall" style={styles.headerTitle}>
          Your Playlist
        </Text>
      </TouchableOpacity>
      <FlatList
        data={queue}
        renderItem={({item, index}) => (
          <TracklList
            index={index}
            data={item}
            handleItemPress={handleItemPress}
            favourites={favourites}
            currentTrack={currentTrack}
            audioStatus={audioStatus}
            HandleFavourites={HandleFavourites}
            HandlePress={HandlePress}
          />
        )}
      />
      {currentTrack.length !== 0 && (
        <View
          style={{
            justifyContent: 'center',
            padding: moderateScale(10),
          }}>
          <PlayingTrackBottom
            currentTrack={currentTrack}
            favourites={favourites}
            HandleFavourites={HandleFavourites}
            handleItemPress={handleItemPress}
            audioStatus={audioStatus}
            handlePlayPress={handlePlayPress}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
    paddingVertical: moderateScale(10),
  },

  headerTitle: {
    color: colors.WHITE,
    fontFamily: fonts.BOLD,
    paddingLeft: moderateScale(10),
    paddingTop: moderateScale(-10),
    marginVertical: moderateScale(10),
  },

  headerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BLACK,
  },

  button: {
    backgroundColor: colors.BLACK,
  },
});

export default PlayListTracks;
