import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import MenuPopup from '../Menu/Menu';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const HeaderWithBackaction = ({title, openMenu, isChat, profile_pic}) => {
  const navigation = useNavigation();

  const _goBack = () => navigation.navigate('ChatList');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => openMenu();

  console.log(profile_pic, ' pp');

  return (
    <Appbar.Header style={styles.headerContainer}>
      <Appbar.BackAction
        color={colors.WHITE}
        size={25}
        onPress={() => navigation.goBack()}
      />
      {isChat && <Avatar.Image size={30} source={{uri: profile_pic}} />}
      <Appbar.Content
        title={title !== '' ? title : 'title'}
        titleStyle={styles.title}
      />
      {isChat && (
        <>
          <Appbar.Action
            style={[styles.connection, {left: moderateScale(20)}]}
            icon={() => <Icon name="video" color={colors.WHITE} size={20} />}
            onPress={() => {}}
          />
          <Appbar.Action
            style={[styles.connection, {left: moderateScale(20)}]}
            icon={() => <Icon name="phone" color={colors.WHITE} size={18} />}
            onPress={() => {}}
          />
        </>
      )}
      <MenuPopup />
    </Appbar.Header>
  );
};

export default HeaderWithBackaction;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.APP_PRIMARY,
    color: colors.BLACK,
    borderBottomWidth: 0.5,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    height: moderateScale(45),
  },

  title: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(16),
    marginLeft: moderateScale(10),
    color: colors.WHITE,
  },

  connection: {
    marginTop: moderateScale(10),
  },
});
