import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import TracklList from '../../Components/Audio/TrackList';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const PlayListTracks = () => {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [favourites, setFavourites] = useState([]);

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
  return (
    <View>
      <FlatList
        data={queue}
        renderItem={({item, index}) => (
          <TracklList
            index={index}
            data={item}
            handleItemPress={handleItemPress}
            favourites={favourites}
          />
        )}
      />
    </View>
  );
};

export default PlayListTracks;
