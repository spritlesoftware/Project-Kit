import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {colors} from '../../Utils/colors';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const PlayingTrackBottom = props => {
  const {
    onShuffle,
    currentTrack,
    favourites,
    HandleFavourites,
    handlePlayPress,
    audioStatus,
  } = props;
  const navigation = useNavigation();

  const playerState = usePlaybackState();

  const favCondition =
    favourites && favourites.some(audio => audio.id == currentTrack.id);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('AudioPlayer')}
      style={styles.controlContainer}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.coverImage}
          source={currentTrack.cover}
          width={moderateScale(10)}
          height={moderateScale(10)}
        />
        <View>
          <Text
            style={{
              ...styles.playlistItem,
            }}>
            {currentTrack.title}
          </Text>
          <Text style={styles.artistName}>{currentTrack.artist}</Text>
        </View>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => HandleFavourites(currentTrack)}>
          <Icons
            name={favCondition ? 'heart' : 'heart-outlined'}
            color={favCondition ? colors.RED_HEART : colors.WHITE}
            size={28}
          />
        </TouchableOpacity>
        <Icon.Button
          style={styles.playButton}
          name={playerState.state == State.Playing ? 'pause' : 'play'}
          size={25}
          backgroundColor={colors.BLACK}
          onPress={handlePlayPress}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PlayingTrackBottom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BLACK,
  },
  songTitle: {
    fontSize: 32,
    marginTop: 50,
    color: '#ccc',
  },
  artistName: {
    fontSize: 24,
    color: '#888',
  },
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },

  trackProgress: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    color: '#eee',
  },

  listContainer: {
    borderWidth: 1,
    padding: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  playlistItem: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
    color: colors.WHITE,
    marginLeft: moderateScale(10),
  },

  iconContainer: {
    flexDirection: 'row',
    width: moderateScale(60),
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  coverImage: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(5),
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  artistName: {
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
    fontSize: moderateScale(12),
    marginLeft: moderateScale(10),
  },

  controlContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.GREEN,
    padding: moderateScale(5),
    backgroundColor: colors.STATUS_GREEN,
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    width: moderateScale(80),
    justifyContent: 'space-between',
  },

  playButton: {
    // marginLeft: moderateScale(10),
    marginRight: moderateScale(-10),
    backgroundColor: colors.STATUS_GREEN,
  },

  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },

  controlsWrapper: {
    justifyContent: 'center',
    padding: moderateScale(10),
  },
});
