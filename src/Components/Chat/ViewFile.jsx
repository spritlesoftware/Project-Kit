import React, {useState} from 'react';
import {Modal, Portal, Text, TouchableRipple, Icon} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import Pdf from 'react-native-pdf';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../Utils/colors';

const ViewFile = ({props, visible, onClose}) => {
  const [url, setUrl] = useState(props.currentMessage.file.url);
  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.containerStyle}>
        <View style={styles.container}>
          <Pdf source={{uri: url}} style={{height: '100%', width: '100%'}} />
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
    top: 20,
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
});
