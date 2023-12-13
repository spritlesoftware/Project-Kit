import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  PanResponder,
  StatusBar,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {useRoute} from '@react-navigation/native';
import {GetFirebaseData} from '../../Containers/Firebase';

const VideoCarouselLogic = () => {
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

  const [sliderWidth, setSliderWidth] = useState(0);

  const onSliderLayout = event => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  const onSliderTap = event => {
    if (sliderWidth === 0) {
      return; // Handle the case where layout information is not available yet
    }

    const position = event.nativeEvent.locationX;
    const percentage = position / sliderWidth;
    const newProgress = percentage * progress.seekableDuration;

    setProgress({...progress, currentTime: newProgress});
    ref.current.seek(newProgress);
  };

  return {
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
  };
};

export default VideoCarouselLogic;
