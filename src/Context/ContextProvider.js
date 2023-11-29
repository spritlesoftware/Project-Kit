import React, {createContext, useContext, useMemo, useState} from 'react';
import { TableData } from '../Data/TableData';
const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};
export const initialState = {
  isAudioEnabled: true,
  status: 'disconnected',
  participants: [],
  videoTracks: new Map(),
  userName: '',
  roomName: '',
  token: '',
};

const ContextProvider = ({children}) => {
  const poppins = {
    BOLD: 'Poppins-SemiBold',
    LIGHT: 'Poppins-Light',
    MEDIUM: 'Poppins-Medium',
    REGULAR: 'Poppins-Regular',
    SEMIBOLD: 'Poppins-SemiBold',
  }
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [props, setProps] = useState(initialState);
  const [tableData, setTableData] = useState(TableData);
  const [fonts, setFont] = useState(poppins);

  const data = useMemo(() => {
    return {
      queue,
      setQueue,
      currentTrack,
      setCurrentTrack,
      favourites,
      setFavourites,
      props,setProps,
      tableData,
      setTableData,
      fonts,
      setFont
    };
  }, [queue, currentTrack, favourites,tableData,props,fonts]);

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default ContextProvider;
