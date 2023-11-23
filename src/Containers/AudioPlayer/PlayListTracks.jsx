import {View, FlatList, StyleSheet} from 'react-native';
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
import Menu from 'react-native-vector-icons/Entypo';
import PlayingTrackBottom from '../../Components/Audio/PlayingTrackBottom';

const PlayListTracks = ({navigation}) => {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [audioStatus, setAudioStatus] = useState();

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
    // Create a new Set with the existing groupContact values
    const updatedFavourites = new Set(favourites);

    // Toggle the presence of the item in the Set
    if (updatedFavourites.has(item)) {
      updatedFavourites.delete(item);
      console.log('deleting');
    } else {
      updatedFavourites.add(item);
      console.log('Adding');
    }

    // Convert the Set back to an array and update the state
    setFavourites(Array.from(updatedFavourites));
  }

  function handleItemPress(index) {
    TrackPlayer.skip(index);
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
      <View style={styles.headerContainer}>
        <Back.Button
          name="left"
          color={colors.WHITE}
          size={moderateScale(20)}
          style={styles.button}
          onPress={() => navigation.goBack()}
        />
        <Text variant="headlineSmall" style={styles.headerTitle}>
          TRACKit
        </Text>
        <Menu.Button
          name="dots-three-vertical"
          color={colors.WHITE}
          size={moderateScale(20)}
          style={styles.button}
        />
      </View>
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
    paddingVertical: moderateScale(10),
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: colors.BLACK,
  },

  button: {
    backgroundColor: colors.BLACK,
    paddingBottom: moderateScale(20),
  },
});

export default PlayListTracks;
