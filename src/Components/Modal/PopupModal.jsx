import * as React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  PaperProvider,
  TouchableRipple,
} from 'react-native-paper';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';
import {colors} from '../../Utils/colors';
import InputField from '../TextInput/InputField';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../Button/CustomButton';

const PopupModal = props => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <Text variant="headlineSmall" style={styles.titleText}>
              Group Creation
            </Text>
            <TouchableOpacity onPress={hideModal}>
              <Cancel
                style={styles.cancel}
                name="cancel"
                size={30}
                color={colors.BLACK}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.selected} variant="labelLarge">
            Selected Contacts: {props.selectedCount}
          </Text>
          <InputField placeholder={'Enter group name'} />
          <View style={{marginBottom: moderateScale(10)}} />
          <InputField placeholder={'Enter group description'} />
          <View style={styles.btnContainer}>
            <CustomButton title="Create" />
          </View>
        </Modal>
      </Portal>
      <TouchableRipple style={styles.btnText} onPress={showModal}>
        <Text style={styles.label}>Create Group</Text>
      </TouchableRipple>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '50%',
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    padding: moderateScale(20),
    borderRadius: moderateScale(20),
  },

  btnText: {
    top: moderateScale(20),
    marginRight: moderateScale(10),
    alignSelf: 'flex-end',
  },

  label: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
  },

  cancel: {
    marginBottom: moderateScale(5),
  },

  titleText: {
    fontFamily: fonts.BOLD,
    marginBottom: moderateScale(10),
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  selected: {
    fontFamily: fonts.BOLD,
    marginBottom: moderateScale(20),
    marginTop: moderateScale(20),
    fontSize: moderateScale(15),
  },

  btnContainer: {
    alignSelf: 'center',
  },
});

export default PopupModal;
