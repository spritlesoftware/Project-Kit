import React, {
  createContext,
  useContext,
  useRef,
  useMemo,
  useState,
} from 'react';
import {TableData} from '../Data/TableData';
import {DMSans} from '../Theme/Typography';
import { postdata } from '../Data/PostData';
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
  const [queue, setQueue] = useState([]);
  const [currentTrack, setCurrentTrack] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [props, setProps] = useState(initialState);
  const [tableData, setTableData] = useState(TableData);
  const [fonts, setFont] = useState(DMSans);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});
  const drawer = useRef(null);
  const [events, setEvents] = useState([]);
  const [isMarkedDate, setIsMarkedDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [post, setPost] = useState(postdata);

  const data = useMemo(() => {
    return {
      queue,
      setQueue,
      currentTrack,
      setCurrentTrack,
      favourites,
      setFavourites,
      props,
      setProps,
      tableData,
      setTableData,
      fonts,
      setFont,
      errors,
      setErrors,
      formValues,
      setFormValues,
      drawer,
      events,
      setEvents,
      isMarkedDate,
      setIsMarkedDate,
      selectedDate,
      setSelectedDate,
      setPost,
      post,
    };
  }, [
    queue,
    selectedDate,
    currentTrack,
    isMarkedDate,
    post,
    favourites,
    tableData,
    props,
    fonts,
    errors,
    formValues,
    events,
    
  ]);

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export default ContextProvider;
