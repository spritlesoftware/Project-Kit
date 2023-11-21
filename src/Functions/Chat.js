import {useCallback, useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';

const ChatLogic = navigation => {
  const [messages, setMessages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [fileVisible, setFileVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    (messages = []) => {
      const [messageToSend] = messages;
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
        }));

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, newMessages),
        );

        // Clear selected files after sending
        setAttachments([]);
      } else {
        // Send regular text message
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        );
      }
    },
    [attachments],
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
                  : 'file',
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
  };
};

export default ChatLogic;
