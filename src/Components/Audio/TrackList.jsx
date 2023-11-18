import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/Entypo';
import {fonts} from '../../Utils/fonts';
import {colors} from '../../Utils/colors';
import {Text} from 'react-native-paper';

function ConditionChecker(favourites, data) {
  const favCondition =
    favourites && favourites.some(audio => audio.id == data.id);
  return favCondition;
}

const TracklList = props => {
  return (
    <TouchableOpacity
      style={styles.listContainer}
      onPress={() => props.handleItemPress(props.index)}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.coverImage}
          source={props.data.cover}
          width={moderateScale(10)}
          height={moderateScale(10)}
        />
        <View>
          <Text
            style={{
              ...styles.playlistItem,
            }}>
            {props.data.title}
          </Text>
          <Text style={styles.artistName}>{props.data.artist}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => HandleFavourites(data)}>
          <Icons
            name={
              ConditionChecker(props.favourites, props.data)
                ? 'heart'
                : 'heart-outlined'
            }
            color={
              ConditionChecker(props.favourites, props.data)
                ? colors.RED_HEART
                : colors.WHITE
            }
            size={25}
          />
        </TouchableOpacity>
        <Icons name="dots-three-vertical" color={colors.WHITE} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderWidth: 1,
    padding: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coverImage: {
    width: moderateScale(45),
    height: moderateScale(45),
  },

  playlistItem: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
    color: colors.WHITE,
    marginLeft: moderateScale(10),
  },

  artistName: {
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
    fontSize: moderateScale(12),
    marginLeft: moderateScale(10),
  },

  iconContainer: {
    flexDirection: 'row',
    width: moderateScale(60),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TracklList;
