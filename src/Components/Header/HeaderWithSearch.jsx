import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';

const HeaderWithSearch = ({setSearch}) => {
  const _handleSearch = () => {
    setSearch(true);
  };

  const _handleMore = () => console.log('Shown more');

  return (
    <>
      <Appbar.Header style={styles.headerContainer}>
        <Appbar.Content title="Chats" titleStyle={styles.title} />
        <Appbar.Action
          icon="magnify"
          color={colors.WHITE}
          onPress={_handleSearch}
        />
        <Appbar.Action
          icon="dots-vertical"
          color={colors.WHITE}
          size={25}
          onPress={_handleMore}
        />
      </Appbar.Header>
    </>
  );
};

export default HeaderWithSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  headerContainer: {
    backgroundColor: colors.APP_PRIMARY,
    color: colors.WHITE,
    height: moderateScale(50),
  },

  title: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(25),
    marginTop: moderateScale(5),
    color: colors.WHITE,
  },
});
