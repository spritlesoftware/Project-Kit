import React, {useState} from 'react';
import {Modal, Portal, Text, TouchableRipple, Icon} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import Pdf from 'react-native-pdf';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';

const ViewFile = ({props, visible, onClose}) => {
  const filePath = props.currentMessage.file.url;
  var name = '';
  if (filePath !== undefined) {
    name = filePath.split('/').pop();
  }
  const [url, setUrl] = useState(props.currentMessage.file.url);
  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
        <Text style={styles.pdfName}>{name}</Text>
        <View style={styles.container}>
          <Pdf
            source={{uri: url}}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          <TouchableRipple onPress={onClose} style={styles.buttonCancel}>
            <Icon source="close" color={colors.BLACK} size={30} />
          </TouchableRipple>
        </View>
      </Modal>
    </Portal>
  );
};

export default ViewFile;

const styles = StyleSheet.create({
  buttonCancel: {
    width: moderateScale(30),
    height: moderateScale(35),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderColor: 'black',
    left: '85%',
    top: moderateScale(-30),
  },
  textBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  containerStyle: {
    backgroundColor: 'white',
    height: '100%',
  },

  pdfName: {
    // position: 'absolute',
    paddingTop: moderateScale(50),
    paddingLeft: moderateScale(20),
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(20),
    backgroundColor: colors.GRAY,
  },
});
