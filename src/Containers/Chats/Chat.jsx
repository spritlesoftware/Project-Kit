import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {colors} from '../../Utils/colors';
import {GiftedChat, Bubble, Send, InputToolbar} from 'react-native-gifted-chat';
import HeaderWithBackaction from '../../Components/Header/HeaderWithBackaction';
import {user_1, user_2, user_3} from '../../Data/ChatRoom';
import {useRoute} from '@react-navigation/native';
import {Icon} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import DocumentPicker from 'react-native-document-picker';
import FileTransfer from '../../Components/Chat/FileTransfer';
import ViewFile from '../../Components/Chat/ViewFile';
import Plus from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChatLogic from '../../Functions/Chat/Chat';

const Chat = () => {
  const {
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
    currentTime,
  } = ChatLogic();

  const route = useRoute();

  const renderSend = props => {
    return (
      <View style={styles.shareContainer}>
        <TouchableOpacity
          onPress={attachments.length <= 3 ? pickDocument : null}
          style={styles.fileShare}>
          <Plus name="pluscircle" color={colors.BLACK} size={25} />
        </TouchableOpacity>
        <Send {...props}>
          <Icon source="send" size={25} color={colors.BLACK} />
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
              props.currentMessage.user._id === 2 ? '#2e64e5' : '#efefef',
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
    }
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
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
    }
    return <InputToolbar {...modifiedProps} containerStyle={styles.input} />;
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
    } else {
      return null;
    }
  }, [attachments]);

  return (
    <View style={styles.container}>
      <HeaderWithBackaction
        title={route.params.Item.name}
        navigation={navigation}
        openMenu={openMenu}
        closeMenu={closeMenu}
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
    marginRight: moderateScale(10),
    width: moderateScale(70),
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
    marginBottom: moderateScale(10),
    borderTopWidth: 0,
    marginHorizontal: moderateScale(10),
    marginRight: moderateScale(4),
    alignItems: 'center',
  },

  messagesContainer: {
    paddingBottom: moderateScale(15),
  },
});

export default Chat;
