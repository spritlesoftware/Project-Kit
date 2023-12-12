import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  PanResponder,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Slider from '@react-native-community/slider';
import {moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-paper';
import {styles} from './VideoPlayerStyle';
import {colors} from '../../Utils/colors';
import HeaderWithBackaction from '../../Components/Header/HeaderWithBackaction';
import Heart from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';
import Loader from '../../Components/Loader/Loader';
import {GetFirebaseData} from '../Firebase';

const VideoPlayer = () => {
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });
  const [fullScreen, setFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const route = useRoute();
  const {id, title} = route.params;

  const controlsTimeout = useRef(null);
  const ref = useRef();

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const resetControlsTimeout = () => {
    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current);
    }

    // Set a timeout to hide controls after 5000 milliseconds
    controlsTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 5000);
  };

  useEffect(() => {
    resetControlsTimeout();
  }, [controlsVisible]);

  const toggleControlsVisibility = () => {
    setControlsVisible(!controlsVisible);
    resetControlsTimeout();
  };

  // Use state to store the user data
  const [video, setVideo] = useState({
    id: null, // initialize with null
    video_url: '',
  });
  const [isLoading, setIsLoading] = useState(true); // set initial loading state to true
  const {user} = GetFirebaseData('Video-Player');

  useEffect(() => {
    // Check if the user data is available and set it in the state
    if (user?._data) {
      const targetObject = user._data.data.find(item => item.id === id);
      setVideo(targetObject || {}); // handle case where targetObject is undefined
      if (targetObject?.video_url) {
        setIsLoading(false);
      }
    }
  }, [user, route.params]);

  useEffect(() => {
    console.log('currentTime:', progress.currentTime);
    console.log('seekableDuration:', progress.seekableDuration);
  }, [progress]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const newProgress = Math.max(
        0,
        Math.min(
          progress.seekableDuration,
          progress.currentTime + gestureState.dx,
        ),
      );
      setProgress({...progress, currentTime: newProgress});
      ref.current.seek(newProgress);
    },
  });

  const handleFullScreenToggle = () => {
    if (fullScreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false); // Show the status bar when exiting full screen
    } else {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true); // Hide the status bar when entering full screen
    }
    setFullScreen(!fullScreen);
  };

  console.log(progress);

  return (
    <View style={styles.container}>
      {!fullScreen && <HeaderWithBackaction title={title} />}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TouchableOpacity
            style={[
              styles.videoContainer,
              {
                height: fullScreen ? '100%' : 200,
                padding: fullScreen ? 0 : moderateScale(5),
              },
            ]}
            onPress={() => {
              toggleControlsVisibility();
            }}>
            <Video
              paused={paused}
              source={{
                uri: video.video_url,
              }}
              ref={ref}
              onProgress={x => {
                setProgress(x);
              }}
              style={{
                width: '100%',
                height: fullScreen ? '100%' : 200,
                borderBottomWidth: 0.3,
                borderBottomColor: colors.APP_PRIMARY,
                elevation: 10,
                backgroundColor: colors.WHITE,
                borderRadius: fullScreen ? 0 : moderateScale(10),
              }}
              resizeMode="cover"
              poster={video.thumbnail_url}
              posterResizeMode="stretch"
            />
            {!controlsVisible && paused && (
              <TouchableOpacity
                style={{
                  bottom: fullScreen ? moderateScale(181) : moderateScale(101),
                  alignItems: 'center',
                }}
                onPress={() => {
                  setPaused(!paused);
                }}>
                <Image
                  source={
                    paused
                      ? require('../../Assets/images/play-button.png')
                      : require('../../Assets/images/pause.png')
                  }
                  style={styles.controlButton}
                />
              </TouchableOpacity>
            )}
            {controlsVisible && (
              <View
                style={[
                  styles.controlsContainer,
                  {
                    height: fullScreen ? '100%' : moderateScale(190),
                    marginTop: fullScreen ? 0 : moderateScale(5),
                    width: '100%',
                    marginLeft: fullScreen ? 0 : moderateScale(5),
                    borderRadius: fullScreen ? 0 : moderateScale(10),
                  },
                ]}>
                <View style={styles.fullScreenContainer}>
                  <TouchableOpacity onPress={handleFullScreenToggle}>
                    <Image
                      source={
                        fullScreen
                          ? require('../../Assets/images/minimize.png')
                          : require('../../Assets/images/full-size.png')
                      }
                      style={styles.fullScreenButton}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    toggleControlsVisibility();
                    resetControlsTimeout();
                  }}>
                  <View
                    style={[
                      styles.mainControls,
                      {marginBottom: fullScreen && moderateScale(70)},
                    ]}>
                    <TouchableOpacity
                      onPress={() => {
                        ref.current.seek(parseInt(progress.currentTime) - 10);
                      }}>
                      <Image
                        source={require('../../Assets/images/backward.png')}
                        style={styles.controlButton}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setPaused(!paused);
                      }}>
                      <Image
                        source={
                          paused
                            ? require('../../Assets/images/play-button.png')
                            : require('../../Assets/images/pause.png')
                        }
                        style={styles.controlButton}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        ref.current.seek(parseInt(progress.currentTime) + 10);
                      }}>
                      <Image
                        source={require('../../Assets/images/forward.png')}
                        style={styles.controlButton}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.sliderContainer}>
                    <Text style={styles.timerText}>
                      {format(progress.currentTime)}
                    </Text>
                    <Slider
                      style={{flex: 1}}
                      value={progress.currentTime}
                      minimumValue={0}
                      maximumValue={progress.seekableDuration}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#fff"
                      onValueChange={x => {
                        ref.current.seek(x);
                        setProgress({...progress, currentTime: x});
                      }}
                      {...panResponder.panHandlers}
                    />
                    <Text style={styles.timerText}>
                      {format(progress.seekableDuration)}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          {/* info container */}
          <ScrollView style={styles.infoContainer}>
            <Text variant="headlineSmall" style={styles.title}>
              {video.title}
            </Text>
            <View style={styles.dataContainer}>
              <Text style={styles.category}>{video.year}</Text>
              <Text style={[styles.dataText, styles.category]}>
                {video.category}
              </Text>
              <Text style={styles.category}>{video.minutes}</Text>
              <View>
                <Text
                  style={[
                    styles.category,
                    {
                      top: moderateScale(8),
                      paddingLeft: moderateScale(20),
                    },
                  ]}>
                  {'  '}
                  {video.likes}
                </Text>
                <Heart
                  name="heart"
                  color={colors.RED_HEART}
                  size={15}
                  style={styles.like}
                />
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.descriptionContainer}>
                <Text style={styles.titleText}>Storyline:</Text>
                <Text style={styles.descriptionText}>{video.description}</Text>
              </View>
              <View style={styles.cast}>
                <Text style={styles.titleText}>Starring: </Text>
                <View style={styles.castTextContainer}>
                  {video.starring.map(item => (
                    <Text key={item.id} style={styles.castText}>
                      {item.name}
                      {', '}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={styles.cast}>
                <Text style={styles.titleText}>Director: </Text>
                {video.director.map(item => (
                  <Text key={item.id} style={styles.castText}>
                    {item.name}
                  </Text>
                ))}
              </View>
              <View style={styles.cast}>
                <Text style={styles.titleText}>Genres: </Text>
                {video.genres.map(item => (
                  <Text key={item.id} style={styles.castText}>
                    {item.name}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default VideoPlayer;
