import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import TrackPlayer, {State} from 'react-native-track-player';
import {moderateScale} from 'react-native-size-matters';
import PlayingTrackBottom from '../../Components/Audio/PlayingTrackBottom';
import TrackList from '../../Components/Audio/TrackList';
import PlayList from './PlayList';
import {useNavigation} from '@react-navigation/native';

function SongsList({
  queue,
  currentTrack,
  favourites,
  loadPlaylist,
  HandleFavourites,
  handleItemPress,
  ConditionChecker,
}) {
  const navigation = useNavigation();
  const [audioStatus, setAudioStatus] = useState();
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
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <View
        style={{marginTop: moderateScale(10), marginBottom: moderateScale(40)}}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <TrackList
              index={index}
              data={item}
              handleItemPress={handleItemPress}
              HandleFavourites={HandleFavourites}
              favourites={favourites}
              currentTrack={currentTrack}
              handlePlayPress={handlePlayPress}
              audioStatus={audioStatus}
            />
          )}
        />
      </View>
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
            ConditionChecker={ConditionChecker}
            handlePlayPress={handlePlayPress}
            audioStatus={audioStatus}
          />
        </View>
      )}
    </View>
  );
}

export default SongsList;
