import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {setupPlayer, addTracks} from './AudioPlayerServices';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import SongsList from '../../Components/Audio/SongsList';

function AllSongs() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [favouriteCondition, setFavouriteCondition] = useState(false);

  useEffect(() => {
    async function setup() {
      let isSetup = await setupPlayer();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await addTracks();
      }

      setIsPlayerReady(isSetup);
    }

    setup();
  }, []);

  useEffect(() => {
    const initPlayer = async () => {
      const state = await TrackPlayer.getState();
      if (state === State.Playing) {
        await TrackPlayer.pause();
      }
    };

    initPlayer();
  }, []);

  useEffect(() => {
    const playbackTrackChangedListener = TrackPlayer.addEventListener(
      Event.PlaybackActiveTrackChanged,
      async event => {
        if (event.state !== State.Playing) {
          await TrackPlayer.play(); // Start playing the newly added track
        }
      },
    );

    return () => {
      playbackTrackChangedListener.remove(); // Remove the listener on component unmount
    };
  }, []);

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
    const updatedFavourites = new Set(favourites);

    if (updatedFavourites.has(item)) {
      updatedFavourites.delete(item);
      console.log('deleting');
    } else {
      updatedFavourites.add(item);
      console.log('Adding');
    }

    setFavourites(Array.from(updatedFavourites));
  }

  function handleItemPress(index) {
    TrackPlayer.skip(index);
  }

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SongsList
        queue={queue}
        currentTrack={currentTrack}
        favourites={favourites}
        loadPlaylist={loadPlaylist}
        HandleFavourites={HandleFavourites}
        handleItemPress={handleItemPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
});

export default AllSongs;
