import {View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {styles} from './ListStyle';
import {Text} from 'react-native-paper';
import Menu from 'react-native-vector-icons/Entypo';
import {colors} from '../../Utils/colors';

function handleToggle(handleDrawerToggle, setCurrent, title) {
  handleDrawerToggle();
  setCurrent(title);
}

const List = props => {
  const {item, index, handleDrawerToggle} = props.item;

  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity
        style={styles.listContainer}
        onPress={() =>
          props.navigation.navigate('VideoCarousel', {
            id: item.id,
            title: item.title,
          })
        }>
        <View style={styles.thumbnailContainer}>
          <Image
            source={{
              uri: item.thumbnail_url,
            }}
            width={moderateScale(100)}
            height={moderateScale(65)}
            style={styles.thumbnail}
          />
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} variant="headlineSmall">
            {item.title}
          </Text>
          <Text style={styles.quality}>{item.quality}</Text>
        </View>
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() =>
            handleToggle(props.handleDrawerToggle, props.setCurrent, item.title)
          }>
          <Menu
            name="dots-three-vertical"
            color={colors.BLACK}
            size={moderateScale(15)}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default List;
