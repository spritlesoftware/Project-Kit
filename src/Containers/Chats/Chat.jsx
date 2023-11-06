import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
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

const Chat = ({navigation}) => {
  const route = useRoute();

  const [messages, setMessages] = useState([]);
  const [visible, setVisible] = React.useState(false);

  // file attachments states
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [isAttachFile, setIsAttachFile] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [filePath, setFilePath] = useState('');
  const [fileURL, setFileURL] = useState('');

  const [fileVisible, setFileVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    switch (route.params.Item.user_id) {
      case 1:
        setMessages(user_1);
        break;

      case 2:
        setMessages(user_2);
        break;

      case 3:
        setMessages(user_3);
        break;
    }
  }, []);

  const onSend = useCallback(
    (messages = []) => {
      const [messageToSend] = messages;
      if (isAttachImage) {
        const newMessage = {
          _id: messages[0]._id + 1,
          text: messageToSend.text,
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar: '',
          },
          image: imagePath,
          file: {
            url: '',
          },
        };
        // setMessages(previousMessages =>
        //   GiftedChat.append(previousMessages, newMessage),
        // );
        user_1.unshift(newMessage);
        setImagePath('');
        setIsAttachImage(false);
      } else if (isAttachFile) {
        const newMessage = {
          _id: messages[0]._id + 1,
          text: messageToSend.text,
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar: '',
          },
          image: '',
          file: {
            url: filePath,
          },
        };
        // setMessages(previousMessages =>
        //   GiftedChat.append(previousMessages, newMessage),
        // );
        user_1.unshift(newMessage);
        setFilePath('');
        setIsAttachFile(false);
      } else {
        // setMessages(previousMessages =>
        //   GiftedChat.append(previousMessages, messages),
        // );
        user_1.unshift(messages);
      }
    },
    [filePath, imagePath, isAttachFile, isAttachImage],
  );

  // handling attching docs / images
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: true,
      });
      const fileUri = result[0].fileCopyUri;
      if (!fileUri) {
        console.log('File URI is undefined or null');
        return;
      }
      if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
        setImagePath(fileUri);
        setIsAttachImage(true);
      } else {
        setFilePath(fileUri);
        setIsAttachFile(true);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };

  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View style={styles.chatFooter}>
          <Image source={{uri: imagePath}} style={{height: 75, width: 75}} />
          <TouchableOpacity
            onPress={() => setImagePath('')}
            style={styles.buttonFooterChatImg}>
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (filePath) {
      return (
        <View style={styles.chatFooter}>
          <FileTransfer filePath={filePath} />
          <TouchableOpacity
            onPress={() => setFilePath('')}
            style={styles.buttonFooterChat}>
            <Text style={styles.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }, [filePath, imagePath]);

  const renderSend = props => {
    return (
      <View style={styles.shareContainer}>
        <TouchableOpacity onPress={pickDocument} style={styles.fileShare}>
          <Icon source="paperclip" size={25} color={colors.APP_PRIMARY} />
        </TouchableOpacity>
        <Send {...props}>
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
              props.currentMessage.user._id === 2 ? '#2e64e5' : '#efefef',
            borderBottomLeftRadius:
              props.currentMessage.user._id === 2 ? 15 : 5,
            borderBottomRightRadius:
              props.currentMessage.user._id === 2 ? 5 : 15,
          }}
          onPress={() => setFileVisible(true)}>
          <FileTransfer
            style={{marginTop: -10}}
            filePath={currentMessage.file.url}
          />
          <ViewFile
            props={props}
            visible={fileVisible}
            onClose={() => setFileVisible(false)}
          />
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                ...styles.fileText,
                color: currentMessage.user._id === 2 ? 'white' : 'black',
              }}>
              {currentMessage.text}
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
            marginBottom: moderateScale(5),
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

  return (
    <View style={styles.container}>
      <HeaderWithBackaction
        title={route.params.Item.name}
        navigation={navigation}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      <GiftedChat
        messages={user_1}
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
      />
    </View>
  );
};

export default Chat;

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
    flex: 1,
    maxWidth: moderateScale(300),
    borderRadius: 15,
  },

  fileText: {
    marginVertical: 5,
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
    elevation: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'blue',
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
    marginTop: moderateScale(15),
  },
});
