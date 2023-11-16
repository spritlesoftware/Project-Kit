import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import TrackPlayer, {
  useTrackPlayerEvents,
  usePlaybackState,
  useProgress,
  Event,
  State,
} from 'react-native-track-player';
import {setupPlayer, addTracks} from './AudioPlayerServices';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/Entypo';
import {Text} from 'react-native-paper';
import PlayingTrackBottom from '../../Components/Audio/PlayingTrackBottom';

function Songslist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [favourite, setFavourite] = useState(false);
  const [favourites, setFavourites] = useState([]);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], event => {
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

  function PlaylistItem({index, title, cover, artist, isCurrent, data}) {
    function handleItemPress() {
      TrackPlayer.skip(index);
    }

    const favCondition =
      favourites && favourites.some(audio => audio.id == data.id);

    return (
      <TouchableOpacity style={styles.listContainer} onPress={handleItemPress}>
        <View style={styles.titleContainer}>
          <Image
            style={styles.coverImage}
            source={data.cover}
            width={moderateScale(10)}
            height={moderateScale(10)}
          />
          <View>
            <Text
              style={{
                ...styles.playlistItem,
              }}>
              {data.title}
            </Text>
            <Text style={styles.artistName}>{data.artist}</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => HandleFavourites(data)}>
            <Icons
              // name={favourite ? 'heart' : 'heart-outlined'}
              name={favCondition ? 'heart' : 'heart-outlined'}
              color={favCondition ? colors.RED_HEART : colors.WHITE}
              size={25}
            />
          </TouchableOpacity>
          <Icons name="dots-three-vertical" color={colors.WHITE} size={20} />
        </View>
      </TouchableOpacity>
    );
  }

  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist();
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.playlist}>
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistItem
              index={index}
              data={item}
              // title={item.title}
              // cover={item.cover}
              // artist={item.artist}
              isCurrent={currentTrack == index}
            />
          )}
        />
      </View>
      <View style={styles.controlsWrapper}>
        <PlayingTrackBottom
          // onShuffle={handleShuffle}
          currentTrack={currentTrack}
          favourites={favourites}
          HandleFavourites={HandleFavourites}
        />
      </View>
    </View>
  );
}

function AllSongs() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

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

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#bbb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Songslist />
    </SafeAreaView>
  );
}

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
    marginTop: moderateScale(10),
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
  },

  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  playButton: {
    marginLeft: moderateScale(10),
    marginRight: moderateScale(-10),
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

export default AllSongs;
