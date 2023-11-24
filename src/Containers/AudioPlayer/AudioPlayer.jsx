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
import Icon from 'react-native-vector-icons/FontAwesome';
import ControlsIcon from 'react-native-vector-icons/AntDesign';
import {setupPlayer, addTracks} from './AudioPlayerServices';
import {colors} from '../../Utils/colors';
import {moderateScale, scale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import {Text} from 'react-native-paper';
import Slider from 'react-native-slider';
import {useNavigation} from '@react-navigation/native';

function Header(info) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.headerContainer}
      onPress={() => navigation.goBack()}>
      <Icon name="angle-left" color={colors.WHITE} size={scale(30)} />
      <Text style={styles.songTitle}>{info.title}</Text>
    </TouchableOpacity>
  );
}

function AlbumImage(info) {
  return (
    <>
      <Image
        style={styles.albumImage}
        source={require('../../Assets/images/album2.jpeg')}
      />
    </>
  );
}

const TrackProgress = ({info, position, duration}) => {
  const [sliderValue, setSliderValue] = useState(position);

  useEffect(() => {
    setSliderValue(position);
  }, [position]);

  function format(seconds) {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }

  function onSlidingStart() {
    // You can add any logic you want when the user starts sliding
  }

  function onSlidingComplete(value) {
    TrackPlayer.seekTo(value);
  }

  function onValueChange(value) {
    setSliderValue(value);
  }

  return (
    <View>
      <Text variant="headlineSmall" style={styles.trackName}>
        {info.title}
      </Text>
      <Text style={styles.trackArtist}>{info.artist}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={sliderValue}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSlidingComplete}
        onValueChange={onValueChange}
      />
      <View style={styles.duration}>
        <Text style={styles.trackProgress}>{format(position)}</Text>
        <Text style={styles.trackProgress}>{format(duration)}</Text>
      </View>
    </View>
  );
};

function Playlist() {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(0);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      TrackPlayer.getCurrentTrack().then(index => setCurrentTrack(index));
    }
  });

  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);

    loadPlaylist();
  }

  return (
    <View>
      <Controls onShuffle={handleShuffle} />
    </View>
  );
}

function Controls({onShuffle}) {
  const playerState = usePlaybackState();

  async function handlePlayPress() {
    if ((await TrackPlayer.getState()) == State.Playing) {
      TrackPlayer.pause();
    } else {
      TrackPlayer.play();
    }
  }

  return (
    <View style={styles.controlsContainer}>
      <View style={styles.mainControls}>
        <ControlsIcon.Button
          name="stepbackward"
          size={28}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToPrevious()}
        />
        <Icon
          name={
            playerState.state == State.Playing ? 'pause-circle' : 'play-circle'
          }
          size={60}
          color={colors.WHITE}
          backgroundColor="transparent"
          onPress={handlePlayPress}
          style={styles.PlayPauseButton}
        />
        <ControlsIcon.Button
          name="stepforward"
          size={28}
          backgroundColor="transparent"
          onPress={() => TrackPlayer.skipToNext()}
        />
      </View>
      <View style={styles.shuffle}>
        <Icon.Button
          name="random"
          size={28}
          backgroundColor="transparent"
          onPress={onShuffle}
        />
      </View>
    </View>
  );
}

function App() {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [info, setInfo] = useState({});
  const {position, duration} = useProgress(200);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  async function handleShuffle() {
    let queue = await TrackPlayer.getQueue();
    await TrackPlayer.reset();
    queue.sort(() => Math.random() - 0.5);
    await TrackPlayer.add(queue);
  }

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
      {Header(info)}
      {AlbumImage(info)}
      <TrackProgress info={info} position={position} duration={duration} />
      <View style={styles.controlsWrapper}>
        <Controls onShuffle={handleShuffle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#112',
  },
  songTitle: {
    fontSize: scale(20),
    fontFamily: fonts.BOLD,
    color: colors.WHITE,
    marginHorizontal: moderateScale(10),
  },
  artistName: {
    fontSize: 24,
    color: '#888',
  },
  playlist: {
    marginTop: 40,
    marginBottom: 40,
  },
  playlistItem: {
    fontSize: 16,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  trackProgress: {
    marginTop: moderateScale(-10),
    fontSize: scale(12),
    color: '#eee',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    width: '73.2%',
  },

  controlsWrapper: {
    justifyContent: 'flex-end',
  },

  albumImage: {
    alignSelf: 'center',
    marginTop: moderateScale(40),
    width: '105%',
    height: '60%',
    borderRadius: moderateScale(10),
    resizeMode: 'cover',
  },

  trackName: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(18),
    color: colors.WHITE,
    marginTop: moderateScale(20),
  },

  trackArtist: {
    fontFamily: fonts.REGULAR,
    fontSize: moderateScale(15),
    color: colors.WHITE,
  },

  mainControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shuffle: {
    marginLeft: moderateScale(26),
  },

  duration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  PlayPauseButton: {
    borderWidth: 1,
    borderColor: colors.TRANSPARENT,
    // marginRight: moderateScale(10),
    // width: moderateScale(90),
    // paddingHorizontal: moderateScale(10),
  },
});

export default App;
