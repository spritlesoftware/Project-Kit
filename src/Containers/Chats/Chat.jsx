import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors} from '../../Utils/colors';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import HeaderWithBackaction from '../../Components/Header/HeaderWithBackaction';
import {useRoute} from '@react-navigation/native';
import {Icon} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import FileTransfer from '../../Components/Chat/FileTransfer';
import ViewFile from '../../Components/Chat/ViewFile';
import Plus from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatLogic from '../../Functions/Chat/Chat';
import Mic from 'react-native-vector-icons/Entypo';
import {fonts} from '../../Utils/fonts';
import PlayPause from 'react-native-vector-icons/AntDesign';
import Delete from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {usePlaybackState} from 'react-native-track-player';
import _ from 'lodash';
import Wave from 'react-native-vector-icons/MaterialIcons';

const Chat = data => {
  const {
    messages,
    attachments,
    setAttachments,
    fileVisible,
    setFileVisible,
    openMenu,
    closeMenu,
    onSend,
    pickDocument,
    navigation,
    currentTime,
    audioURL,
    recordingActive,
    time,
    StartRecording,
    DeleteRecording,
    playingAudio,
    setPlayingAudio,
    Format,
    position,
    duration,
    currentAudioId,
    TogglePlayback,
    onSliderValueChange,
  } = ChatLogic();

  useEffect(() => {
    if (position == duration) {
      TrackPlayer.seekTo(0);
      TrackPlayer.pause();
      setPlayingAudio(false);
    }
  }, [position, duration]);

  const route = useRoute();

  const renderSend = props => {
    return (
      <View style={styles.shareContainer}>
        {!recordingActive && (
          <TouchableOpacity
            onPress={attachments.length <= 3 ? pickDocument : null}
            style={styles.fileShare}>
            <Plus
              name="pluscircle"
              color={colors.APP_PRIMARY}
              size={25}
              style={{
                paddingTop: moderateScale(1),
                paddingRight: moderateScale(1),
                borderWidth: 1,
                borderColor: colors.TRANSPARENT,
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        )}
        <Send
          {...props}
          containerStyle={{
            marginRight: moderateScale(50),
          }}>
          <Icon source="send" size={25} color={colors.APP_PRIMARY} />
        </Send>
      </View>
    );
  };

  const renderBubble = props => {
    const {currentMessage} = props;

    if (currentMessage.file && currentMessage.file.url) {
      return (
        <TouchableOpacity
          style={{
            ...styles.fileContainer,
            backgroundColor:
              props.currentMessage.user._id === 2
                ? colors.APP_PRIMARY
                : '#efefef',
            borderBottomLeftRadius:
              props.currentMessage.user._id === 2 ? 15 : 5,
            borderBottomRightRadius:
              props.currentMessage.user._id === 2 ? 5 : 15,
          }}
          onPress={() => setFileVisible(true)}>
          <ViewFile
            props={props}
            visible={fileVisible}
            onClose={() => setFileVisible(false)}
          />
          <FileTransfer
            style={{marginTop: -10}}
            filePath={currentMessage.file.url}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                ...styles.fileText,
                color: currentMessage.user._id === 2 ? 'white' : 'black',
              }}>
              {currentMessage.text}
            </Text>
            <Text
              style={{
                ...styles.timeText,
                color: currentMessage.user._id === 2 ? 'white' : 'black',
              }}>
              {currentTime}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (currentMessage.audio && currentMessage.audio.url) {
      const audioDurationString = currentMessage.audio.duration || '0:00';
      const [minutes, seconds] = audioDurationString.split(':');
      const audioDuration = parseInt(minutes, 10) * 60 + parseInt(seconds, 10);
      // console.log(audioDuration, ' 00');
      return (
        <TouchableOpacity
          style={{
            ...styles.audioBubble,
            backgroundColor:
              props.currentMessage.user._id === 2
                ? colors.APP_PRIMARY
                : '#efefef',
            borderBottomLeftRadius:
              props.currentMessage.user._id === 2 ? 15 : 5,
            borderBottomRightRadius:
              props.currentMessage.user._id === 2 ? 5 : 15,
            borderTopLeftRadius: props.currentMessage.user._id === 2 ? 15 : 5,
          }}>
          <TouchableOpacity
            style={{
              width: moderateScale(30),
            }}
            onPress={() => TogglePlayback(currentMessage)}>
            <PlayPause
              name={
                currentAudioId === currentMessage._id && playingAudio
                  ? 'pausecircle'
                  : 'play'
              }
              color={colors.WHITE}
              size={25}
              style={styles.PlayPauseButton}
            />
          </TouchableOpacity>
          <Slider
            style={{flex: 1}}
            value={currentAudioId === currentMessage._id ? position : 0}
            minimumValue={0}
            maximumValue={duration}
            onValueChange={
              currentAudioId === currentMessage._id && onSliderValueChange
            }
            minimumTrackTintColor={colors.WHITE}
            maximumTrackTintColor={colors.WHITE}
            thumbTintColor={colors.WHITE}
          />
          <View>
            <Text style={styles.audioText}>
              {currentAudioId === currentMessage._id && playingAudio
                ? Format(position)
                : currentMessage.audio.duration}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.APP_PRIMARY,
          },
        }}
        textStyle={{
          right: {
            color: '#efefef',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  const renderInputToolbar = props => {
    const modifiedProps = {...props};
    if (props.text.length === 0 && attachments[0] !== undefined) {
      modifiedProps.text = ' ';
    } else if (audioURL !== '') {
      modifiedProps.text = ' ';
    }
    return (
      <View style={styles.inputWrapper}>
        <InputToolbar {...modifiedProps} containerStyle={styles.input} />
        <TouchableOpacity
          style={[
            styles.microphone,
            {
              backgroundColor: recordingActive
                ? colors.GREY11
                : colors.APP_PRIMARY,
              borderWidth: 0,
            },
          ]}
          activeOpacity={recordingActive ? 1 : 0}
          onLongPress={!recordingActive && StartRecording}>
          <Mic
            name="mic"
            color={colors.WHITE}
            size={20}
            style={{padding: moderateScale(5)}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderChatFooter = useCallback(() => {
    if (attachments.length > 0 && attachments[0].path !== undefined) {
      return (
        <View style={styles.chatFooter}>
          {attachments.map((attachment, index) => (
            <View
              key={index}
              style={[
                styles.fileContainer,
                {marginRight: attachment.type && moderateScale(10)},
              ]}>
              {attachment.type === 'image' && (
                <View
                  style={[
                    styles.innerChatFooter,
                    {
                      backgroundColor: colors.WHITE,
                    },
                  ]}>
                  <Image
                    source={{uri: attachment.path}}
                    style={{
                      height: 75,
                      width: 75,
                      borderRadius: moderateScale(10),
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => setImagePath('')}
                    style={styles.buttonFooterChat}>
                    <Text style={styles.textFooterChat}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
              {attachment.type === 'file' && (
                <FileTransfer
                  style={{marginTop: -10}}
                  filePath={attachment.path}
                  isFooter={true}
                />
              )}
              <TouchableOpacity
                onPress={() => {
                  const updatedAttachments = [...attachments];
                  updatedAttachments.splice(index, 1);
                  setAttachments(updatedAttachments);
                }}
                style={styles.buttonFooterChat}>
                <Text style={styles.textFooterChat}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    } else if (recordingActive) {
      return (
        <View style={styles.audioFooter}>
          <View style={styles.audioInnerContainer}>
            <Wave
              name="multitrack-audio"
              color={colors.APP_PRIMARY}
              size={moderateScale(20)}
            />
            <Text style={styles.recorderText}>
              Recording Voice {'  '} {time}
            </Text>
          </View>
          {/* <TouchableOpacity onPress={() => toggleRecording()}>
            <PlayPause
              name={isRecordingPaused ? 'playcircleo' : 'pause'}
              color={colors.APP_PRIMARY}
              size={moderateScale(25)}
              style={styles.PlayPauseButton}
            />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => audioURL !== '' && DeleteRecording()}>
            <Delete
              name="delete"
              color={colors.APP_PRIMARY}
              size={moderateScale(25)}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }, [attachments, time, recordingActive, audioURL]);

  return (
    <View style={styles.container}>
      <HeaderWithBackaction
        title={route.params.Item.name}
        navigation={navigation}
        openMenu={openMenu}
        closeMenu={closeMenu}
        isChat={true}
        profile_pic={route.params?.Item.profile_pic}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 2,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderChatFooter={renderChatFooter}
        renderInputToolbar={renderInputToolbar}
        messagesContainerStyle={styles.messagesContainer}
        placeholder="Say something..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  shareContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    marginRight: moderateScale(-40),
    height: moderateScale(40),
    justifyContent: 'space-between',
  },

  chatBox: {
    flex: 1,
    marginTop: moderateScale(20),
  },

  fileContainer: {
    maxWidth: moderateScale(250),
    borderRadius: 15,
  },

  chatContainer: {
    flex: 1,
    maxWidth: moderateScale(250),
    borderRadius: 15,
  },

  fileText: {
    fontSize: 16,
    lineHeight: 20,
    marginLeft: 10,
    marginRight: 5,
  },

  chatFooter: {
    shadowColor: '#1F2687',
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 8},
    elevation: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    padding: 10,
    marginTop: moderateScale(5),
    marginBottom: moderateScale(10),
  },

  innerChatFooter: {
    shadowColor: '#1F2687',
    shadowOpacity: 0.37,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 8},
    elevation: 2,
    borderRadius: moderateScale(10),
    flexDirection: 'row',
  },

  buttonFooterChat: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    right: 3,
    top: -2,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  textFooterChat: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },

  fileShare: {
    marginTop: moderateScale(16),
    marginRight: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.TRANSPARENT,
    width: moderateScale(40),
    height: moderateScale(30),
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  timeText: {
    fontSize: moderateScale(10),
    textAlign: 'right',
    marginRight: moderateScale(10),
    marginBottom: moderateScale(7),
  },

  input: {
    borderRadius: moderateScale(30),
    backgroundColor: colors.GRAY10,
    borderTopWidth: 0,
    marginHorizontal: moderateScale(10),
    marginRight: moderateScale(60),
    width: moderateScale(290),
    paddingBottom: moderateScale(5),
  },

  messagesContainer: {
    paddingBottom: moderateScale(15),
    fontFamily: fonts.MEDIUM,
  },

  microphone: {
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginRight: moderateScale(10),
    marginTop: moderateScale(-5),
    backgroundColor: colors.APP_PRIMARY,
    width: moderateScale(50),
    height: moderateScale(52),
    borderRadius: moderateScale(30),
  },

  inputWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    bottom: moderateScale(10),
  },

  recordContainer: {
    width: moderateScale(300),
    height: moderateScale(50),
    borderRadius: moderateScale(30),
    backgroundColor: colors.GRAY10,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: moderateScale(10),
    bottom: moderateScale(15),
    paddingHorizontal: moderateScale(15),
  },

  audioFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    height: moderateScale(60),
    marginVertical: moderateScale(10),
    marginHorizontal: moderateScale(10),
    paddingTop: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },

  recorderText: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(10),
  },

  audioInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  audioBubble: {
    flexDirection: 'row',
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: moderateScale(250),
  },

  audioText: {
    fontFamily: fonts.BOLD,
    color: colors.WHITE,
    paddingHorizontal: moderateScale(10),
  },

  sliderContainer: {
    paddingHorizontal: moderateScale(5),
    marginBottom: moderateScale(10),
  },

  PlayPauseButton: {
    paddingTop: moderateScale(1),
    paddingHorizontal: moderateScale(1),
  },
});

export default Chat;
