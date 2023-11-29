import {View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {styles} from './ListStyle';
import {Text} from 'react-native-paper';
import Menu from 'react-native-vector-icons/Entypo';
import {colors} from '../../Utils/colors';

const List = props => {
  const {item, index} = props.item;
  console.log(props);
  return (
    <View style={styles.container} key={index}>
      <TouchableOpacity style={styles.listContainer}>
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
        <TouchableOpacity style={styles.menuContainer}>
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
