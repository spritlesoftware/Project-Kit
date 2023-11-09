import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {Avatar} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import MenuPopup from '../Menu/Menu';

const HeaderWithBackaction = ({navigation, title, openMenu}) => {
  const _goBack = () => navigation.navigate('ChatList');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => openMenu();

  return (
    <Appbar.Header style={styles.headerContainer}>
      <Appbar.BackAction
        color={colors.WHITE}
        size={30}
        onPress={() => navigation.navigate('ChatList')}
      />
      <Avatar.Image
        size={35}
        source={require('../../Assets/images/avatar.png')}
      />
      <Appbar.Content
        title={title !== '' ? title : 'title'}
        titleStyle={styles.title}
      />
      <MenuPopup />
    </Appbar.Header>
  );
};

export default HeaderWithBackaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  headerContainer: {
    backgroundColor: colors.APP_PRIMARY,
    color: colors.WHITE,
  },

  title: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(20),
    marginLeft: moderateScale(10),
    color: colors.WHITE,
  },
});
