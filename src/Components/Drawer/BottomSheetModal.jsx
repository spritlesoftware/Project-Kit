import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/AntDesign';
import MenuIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';

const menuData = [
  {
    id: 1,
    name: 'Share',
    icon: 'share-outline',
  },
  {
    id: 2,
    name: 'Delete',
    icon: 'delete-outline',
  },
  {
    id: 3,
    name: 'Rename',
    icon: 'pencil-outline',
  },
  {
    id: 4,
    name: 'Download',
    icon: 'download-outline',
  },
];

const BottomSheetModal = ({isVisible, handleDrawerToggle, title}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleDrawerToggle}
      style={styles.modal}>
      <View style={styles.container}>
        <View style={styles.drawerContainer}>
          <View style={styles.drawerContent}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerHeaderText}>{title}</Text>
              <TouchableOpacity onPress={handleDrawerToggle}>
                <Icon name="close" size={24} color={colors.WHITE} />
              </TouchableOpacity>
            </View>
            <View style={styles.drawerBody}>
              {menuData.map(item => (
                <TouchableOpacity key={item.id} style={styles.menuContainer}>
                  <MenuIcon
                    name={item.icon}
                    color={colors.WHITE}
                    size={moderateScale(22)}
                  />
                  <Text style={styles.menuText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  drawerContainer: {
    backgroundColor: colors.APP_PRIMARY,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20,
  },

  drawerContent: {
    height: 300,
  },

  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },

  drawerHeaderText: {
    fontSize: moderateScale(18),
    fontFamily: fonts.BOLD,
    color: colors.WHITE,
  },

  drawerBody: {
    flex: 1,
    padding: 16,
  },

  menuText: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
    color: colors.WHITE,
    marginHorizontal: moderateScale(10),
  },

  menuContainer: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
  },
});

export default BottomSheetModal;
