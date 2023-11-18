import React from 'react';
import {View, FlatList} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {moderateScale} from 'react-native-size-matters';
import PlayingTrackBottom from '../../Components/Audio/PlayingTrackBottom';
import TrackList from '../../Components/Audio/TrackList';

function SongsList({
  queue,
  currentTrack,
  favourites,
  loadPlaylist,
  handleFavourites,
  handleItemPress,
}) {
  console.log(queue);
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
            handleFavourites={handleFavourites}
          />
        </View>
      )}
    </View>
  );
}

export default SongsList;
