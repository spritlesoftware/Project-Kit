import React from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import VideoCarouselLogic from '../../Functions/Video/VideoPlayer';
import Heart from 'react-native-vector-icons/AntDesign';
import HeaderWithBackaction from '../../Components/Header/HeaderWithBackaction';
import Loader from '../../Components/Loader/Loader';
import {styles} from './VideoPlayerStyle';
import Video from 'react-native-video';
import {colors} from '../../Utils/colors';
import Slider from '@react-native-community/slider';

const VideoPlayer = () => {
  const {
    paused,
    setPaused,
    progress,
    setProgress,
    fullScreen,
    setFullScreen,
    controlsVisible,
    setControlsVisible,
    route,
    ref,
    format,
    resetControlsTimeout,
    toggleControlsVisibility,
    video,
    isLoading,
    panResponder,
    handleFullScreenToggle,
    onSliderTap,
    onSliderLayout,
  } = VideoCarouselLogic();

  return (
    <View style={styles.container}>
      {!fullScreen && <HeaderWithBackaction title={video.title} />}
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
                  <View
                    style={styles.sliderContainer}
                    onTouchStart={onSliderTap}
                    onLayout={onSliderLayout}>
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
