import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Slider from '@react-native-community/slider';
import {moderateScale} from 'react-native-size-matters';
import {Text} from 'react-native-paper';
import {styles} from './VideoCarouselStyle';
import {colors} from '../../Utils/colors';
import {Director, Directors, Genres, Starring} from '../../Data/VideoData';
import HeaderWithBackaction from '../Header/HeaderWithBackaction';
import Heart from 'react-native-vector-icons/AntDesign';

const App = () => {
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState({
    currentTime: 0,
    seekableDuration: 0,
  });
  const [fullScreen, setFullScreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

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

  return (
    <View style={styles.container}>
      {!fullScreen && <HeaderWithBackaction title={'Kaala Paani'} />}
      <TouchableOpacity
        style={[styles.videoContainer, {height: fullScreen ? '100%' : 200}]}
        onPress={() => {
          toggleControlsVisibility();
        }}>
        <Video
          paused={paused}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
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
            borderRadius: moderateScale(10),
          }}
          resizeMode="cover"
          poster="data:image/jpeg;base64,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"
          posterResizeMode="cover"
        />
        {controlsVisible && (
          <View style={styles.controlsContainer}>
            <View style={styles.fullScreenContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (fullScreen) {
                    Orientation.lockToPortrait();
                  } else {
                    Orientation.lockToLandscape();
                  }
                  setFullScreen(!fullScreen);
                }}>
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
              <View style={styles.mainControls}>
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
                  minimumValue={0}
                  maximumValue={progress.seekableDuration}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#fff"
                  onValueChange={x => {
                    ref.current.seek(x);
                  }}
                />
                <Text style={styles.timerText}>
                  {format(progress.seekableDuration)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <ScrollView style={styles.infoContainer}>
        <Text variant="headlineSmall" style={styles.title}>
          Kaala Paani
        </Text>
        <View style={styles.dataContainer}>
          <Text style={styles.category}>2023</Text>
          <Text style={[styles.dataText, styles.category]}>U/A 16+</Text>
          <Text style={styles.category}>10 min</Text>
          <View>
            <Text
              style={[
                styles.category,
                {top: moderateScale(8), paddingHorizontal: moderateScale(15)},
              ]}>
              {'  '}
              10 K
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
            <Text style={styles.descriptionText}>
              As a crisis unfolds, Lt. Gen. Qadri takes crucial steps but fails
              to alert the public. Jyotsna struggles to escape her traumatic
              past.
            </Text>
          </View>
          <View style={styles.cast}>
            <Text style={styles.titleText}>Starring: </Text>
            <View style={styles.castTextContainer}>
              {Starring.map(item => (
                <Text key={item.id} style={styles.castText}>
                  {item.name}
                  {', '}
                </Text>
              ))}
            </View>
          </View>
          <View style={styles.cast}>
            <Text style={styles.titleText}>Director: </Text>
            {Directors.map(item => (
              <Text key={item.id} style={styles.castText}>
                {item.name}
              </Text>
            ))}
          </View>
          <View style={styles.cast}>
            <Text style={styles.titleText}>Genres: </Text>
            {Genres.map(item => (
              <Text key={item.id} style={styles.castText}>
                {item.name}
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default App;
