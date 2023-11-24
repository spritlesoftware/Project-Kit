import React, {createContext, useContext, useMemo, useState} from 'react';
import {handleFavourites, handleItemPress} from '../Functions/Audio/AllSongs';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const ContextProvider = ({children}) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [favourites, setFavourites] = useState([]);

  function HandleFavourites(item) {
    handleFavourites(item, favourites, setFavourites);
  }

  function handlePress(index) {
    handleItemPress(index);
  }

  const dataProvider = useMemo(() => {
    return {
      isPlayerReady,
      setIsPlayerReady,
      queue,
      setQueue,
      currentTrack,
      setCurrentTrack,
      favourites,
      setFavourites,
      handleFavourites,
      handlePress,
    };
  }, [
    isPlayerReady,
    queue,
    currentTrack,
    favourites,
    HandleFavourites,
    handlePress,
  ]);

  return (
    <AppContext.Provider value={dataProvider}>{children}</AppContext.Provider>
  );
};

export default ContextProvider;
