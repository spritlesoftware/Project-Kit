import React, {createContext, useContext, useMemo, useState} from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const ContextProvider = ({children}) => {
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const data = useMemo(() => {
    return {
      queue,
      setQueue,
      currentTrack,
      setCurrentTrack,
      favourites,
      setFavourites,
    };
  }, [queue, currentTrack, favourites]);

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default ContextProvider;
