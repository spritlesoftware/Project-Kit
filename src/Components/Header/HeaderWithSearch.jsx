import {View, Text, StyleSheet, Platform} from 'react-native';
import React, {useState} from 'react';
import {Appbar, Button, Menu, Divider, PaperProvider} from 'react-native-paper';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import MenuPopup from '../Menu/Menu';

const HeaderWithSearch = props => {
  const _handleSearch = () => {
    props.openDrawer ? props.setOpenDrawer(false) : props.setOpenDrawer(true);
  };

  const _handleMore = () => console.log('Shown more');

  return (
    <>
      <Appbar.Header
        style={[
          styles.headerContainer,
          {marginTop: Platform.OS === 'ios' && verticalScale(-40)},
        ]}>
        <Appbar.Action
          icon="menu"
          color={colors.WHITE}
          onPress={_handleSearch}
        />
        <Appbar.Content title={props.title} titleStyle={styles.title} />

        {/* <Appbar.Action
          icon="dots-vertical"
          color={colors.WHITE}
          size={25}
          onPress={_handleMore}
        /> */}
        {/* <MenuPopup /> */}
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
    height: moderateScale(45),
    alignItems: 'center',
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },

  title: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(22),
    color: colors.WHITE,
  },
});
