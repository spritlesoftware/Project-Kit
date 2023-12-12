import React, {useEffect, useState} from 'react';
import {GetFirebaseData} from '../../Containers/Firebase';

const VideoListLogic = () => {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = GetFirebaseData('Video-Player');
  const [current, setCurrent] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (user._data) {
      setVideoData(user._data.data);
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (videoData === null || videoData === undefined) {
      setIsLoading(true);
    }
  }, []);

  return {
    videoData,
    isLoading,
    current,
    setCurrent,
    drawerOpen,
    handleDrawerToggle,
  };
};

export default VideoListLogic;
