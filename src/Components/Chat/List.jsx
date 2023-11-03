import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../Utils/colors';
import {List, Avatar, TouchableRipple} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {fonts} from '../../Utils/fonts';

const Lists = ({items, navigation}) => {
  const Item = items.item;
  return (
    <TouchableRipple
      style={styles.container}
      // onPress={() => navigation.navigate('Chat', { Item })}
    >
      <List.Item
        left={() => (
          <Avatar.Image
            size={45}
            source={require('../../Assets/images/avatar.png')}
            style={styles.avatar}
          />
        )}
        title={items.item.name}
        titleStyle={styles.title}
        description={items.item.last_msg}
        descriptionStyle={styles.description}
        right={() => (
          <Text style={styles.date}>{items.item.modified_date}</Text>
        )}
        style={styles.listContainer}
      />
    </TouchableRipple>
  );
};

export default Lists;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },

  avatar: {
    marginLeft: moderateScale(10),
  },

  listContainer: {
    borderBottomWidth: 0.5,
    borderColor: colors.GREY20,
    margin: moderateScale(2),
  },

  title: {
    fontFamily: fonts.BOLD,
    color: colors.APP_PRIMARY,
  },

  description: {
    fontFamily: fonts.MEDIUM,
  },

  date: {
    fontFamily: fonts.MEDIUM,
  },
});
