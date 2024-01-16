import React, {useState} from 'react';
import {Modal, Portal, Text, TouchableRipple, Icon} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import Pdf from 'react-native-pdf';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';

const ViewFile = ({props, visible, onClose, isImage, isVideo}) => {
  const filePath = props.file.url || props.image;
  var name = '';
  if (filePath !== undefined) {
    name = filePath.split('/').pop();
  }

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
        <Text style={styles.pdfName}>{name}</Text>
        <View style={styles.container}>
          {!isImage && !isVideo && (
            <Pdf
              source={{uri: filePath}}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          )}
          {isImage && (
            <Image
              style={styles.viewImage}
              source={{uri: filePath}}
              width="100%"
              height="90%"
            />
          )}
          <TouchableRipple onPress={onClose} style={styles.buttonCancel}>
            <Icon source="close" color={colors.BLACK} size={20} />
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
    left: '88%',
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
    fontFamily: fonts.MEDIUM,
    fontSize: moderateScale(12),
    maxWidth: moderateScale(320),
  },

  viewImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
