import {useCallback, useEffect, useRef, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {Dimensions, PanResponder, PermissionsAndroid} from 'react-native';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import _ from 'lodash';

const ChatLogic = navigation => {
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [fileVisible, setFileVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [recordingActive, setRecordingActive] = useState(false);
  const [time, setTime] = useState(null);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  // current time retrieving
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const openMenu = useCallback(() => {
    setIsMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const onSend = useCallback(
    async (messages = []) => {
      const [messageToSend] = messages;
      // console.log(messages[0], ' TYU');
      if (attachments.length > 0) {
        const newMessages = attachments.map((attachment, index) => ({
          _id: messageToSend._id + index + 1,
          text: messages[0].text,
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar: '',
          },
          image: attachment.type === 'image' ? attachment.path : '',
          file: {
            url: attachment.type === 'file' ? attachment.path : '',
          },
          video: {
            url: attachment.type === 'video' ? attachment.path : '',
          },
        }));

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );

        // Clear selected files after sending
        setAttachments([]);
        // console.log(messages, ' MESS');
      } else if (audioURL !== '') {
        try {
          // Stop recording
          await StopRecording();

          // Create a new audio message
          const newMessage = {
            _id: messageToSend._id,
            text: messages[0].text,
            createdAt: new Date(),
            user: {
              _id: 2,
              avatar: '',
            },
            audio: {
              url: audioURL,
              duration: time,
            },
          };

          // Update messages state
          setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessage),
          );

          // Clear recording states
          setTime('');
          setRecordingActive(false);
          setAudioURL('');
        } catch (error) {
          console.error('Error while stopping recording:', error);
        }
      } else {
        // Send regular text message
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        );
      }
    },
    [attachments, audioURL, time],
  );

  const pickDocument = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: true,
      });

      // Process each selected file or image
      results.forEach(result => {
        const fileUri = result.fileCopyUri;
        if (fileUri) {
          setAttachments(prevAttachments => [
            ...prevAttachments,
            {
              path: fileUri,
              type:
                fileUri.includes('.png') || fileUri.includes('.jpg')
                  ? 'image'
                  : fileUri.includes('pdf')
                  ? 'file'
                  : 'video',
            },
          ]);
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };

  const renderInputToolbar = props => {
    const {text} = props;
    const modifiedProps = {...props};
    if (props.text.length === 0 && attachments[0] !== undefined) {
      modifiedProps.text = ' ';
    }

    return {modifiedProps};
  };

  // voice message
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [currentAudioId, setCurrentAudioId] = useState(null);

  const {position, duration} = useProgress(0);
  const {state} = usePlaybackState();

  const intervalIdRef = useRef(null);

  const path = Platform.select({
    ios: undefined,
    android: undefined,
  });

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());

  useEffect(() => {
    const initAudioRecorder = async () => {
      try {
        await audioRecorderPlayer.current.setSubscriptionDuration(0.1); // optional. Default is 0.5
      } catch (error) {
        console.error('Error initializing AudioRecorderPlayer:', error);
      }
    };

    initAudioRecorder();
  }, []);

  let startTime = null;
  let updateInterval = 100;

  const StartTimer = () => {
    // Clear the interval if it's already running
    clearInterval(intervalIdRef.current);

    startTime = Date.now();
    intervalIdRef.current = setInterval(() => {
      const elapsedTimeInSeconds = (Date.now() - startTime) / 1000;
      const minutes = Math.floor(elapsedTimeInSeconds / 60);
      const seconds = Math.floor(elapsedTimeInSeconds % 60);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      setTime(formattedTime);
    }, updateInterval);
  };

  const StopTimer = () => {
    console.log(' Stopped');
    clearInterval(intervalIdRef.current);
    setTime('');
  };

  const StartRecording = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external storage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    console.log('audioSet', audioSet);

    setRecordingActive(true);
    StartTimer();
    const uri = await audioRecorderPlayer.current.startRecorder(path, audioSet);

    console.log(`uri: ${uri}`);
    setAudioURL(uri);
  };

  const StopRecording = async () => {
    if (recordingActive) {
      try {
        console.log('HH');
        await audioRecorderPlayer.current.stopRecorder();
        // Additional cleanup or operations after stopping the recorder
        clearInterval(intervalIdRef.current);
      } catch (error) {
        console.error('Error stopping recorder:', error);
      }
    }
  };

  function DeleteRecording() {
    StopRecording();
    setRecordingActive(false);
    setAudioURL('');
  }

  const toggleRecording = async () => {
    try {
      if (!recordingActive) {
        // Start recording
        await StartRecording();
      } else if (isRecordingPaused) {
        // Resume recording
        await audioRecorderPlayer.current.resumeRecorder();
        setIsRecordingPaused(false);
        StartTimer();
      } else {
        // Pause recording
        StopRecording();
        setIsRecordingPaused(true);
        StopTimer();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Format = seconds => {
    let mins = (parseInt(seconds / 60) % 60).toString();
    let secs = Math.trunc(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const playAudio = message => {
    TrackPlayer.add({
      id: message._id,
      url: message.audio.url,
      title: message.text,
    });
    TrackPlayer.play();
    setPlayingAudio(true);
    setCurrentAudioId(message._id);
  };

  const TogglePlayback = message => {
    if (state === 'playing') {
      TrackPlayer.pause();
      setPlayingAudio(false);
      setCurrentAudioId(null);
    } else {
      playAudio(message);
    }
  };

  const onSliderValueChange = useCallback(
    _.debounce(value => {
      TrackPlayer.seekTo(value);
    }, 300), // Adjust the debounce delay as needed
    [],
  );

  return {
    messages,
    setMessages,
    attachments,
    setAttachments,
    fileVisible,
    setFileVisible,
    isMenuOpen,
    openMenu,
    closeMenu,
    onSend,
    pickDocument,
    navigation,
    renderInputToolbar,
    renderInputToolbar,
    currentTime,
    audioURL,
    setAudioURL,
    recordingActive,
    setRecordingActive,
    time,
    setTime,
    StartRecording,
    StopRecording,
    DeleteRecording,
    isRecordingPaused,
    toggleRecording,
    playingAudio,
    setPlayingAudio,
    Format,
    position,
    duration,
    state,
    currentAudioId,
    setCurrentAudioId,
    currentDurationSec,
    setCurrentDurationSec,
    currentPositionSec,
    setCurrentPositionSec,
    playAudio,
    TogglePlayback,
    onSliderValueChange,
  };
};

export default ChatLogic;
