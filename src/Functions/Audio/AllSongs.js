// AudioPlayerServices.js (Logic)

import {useEffect, useState} from 'react';
import TrackPlayer, {Event, State} from 'react-native-track-player';
import {GetFirebaseData} from '../../Containers/Firebase';

export const AllSongsLogic = () => {
  const [tabData, setTabData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {user} = GetFirebaseData('Audio-Player');

  useEffect(() => {
    if (user._data) {
      setTabData(user._data.data[0].tabData);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (tabData.length <= 0) {
      setIsLoading(true);
    }
  }, []);

  return {
    tabData,
    isLoading,
  };
};

export async function initPlayer() {
  const state = await TrackPlayer.getState();
  if (state === State.Playing) {
    await TrackPlayer.pause();
  }
}

export async function loadPlaylist(setQueue) {
  const queue = await TrackPlayer.getQueue();
  setQueue(queue);
}

export async function handleFavourites(item, favourites, setFavourites) {
  const updatedFavourites = new Set(favourites);

  if (updatedFavourites.has(item)) {
    // If the item is already in favorites, remove it
    updatedFavourites.delete(item);
    console.log('Removing from favorites');
  } else {
    // If the item is not in favorites, add it
    updatedFavourites.add(item);
    console.log('Adding to favorites');
  }

  setFavourites(Array.from(updatedFavourites));
}

export async function handleItemPress(index) {
  TrackPlayer.skip(index);
}

export function playbackTrackChangedListener(setCurrentTrack) {
  return TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    async event => {
      if (event.state !== State.Playing) {
        await TrackPlayer.play();
      }
      TrackPlayer.getActiveTrack().then(index => setCurrentTrack(index));
    },
  );
}
