import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../Utils/colors';
import HeaderWithSearch from '../../Components/Header/HeaderWithSearch';
import {Searchbar} from 'react-native-paper';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import Plus from 'react-native-vector-icons/AntDesign';
import List from '../../Components/Chat/List';
import {moderateScale} from 'react-native-size-matters';
import GroupListLogic from '../../Functions/GroupList';

const GroupListUI = () => {
  const {
    search,
    setSearch,
    searchQuery,
    setSearchQuery,
    filteredGroups,
    handleSearch,
    handleCancelSearch,
    navigation,
  } = GroupListLogic();
  return (
    <View style={styles.container}>
      <HeaderWithSearch title={'Groups'} />
      {search && (
        <Searchbar
          placeholder="Search"
          inputStyle={styles.input}
          onChangeText={handleSearch}
          value={searchQuery}
          iconColor={colors.BLACK}
          right={() => (
            <Cancel
              name="cancel"
              size={20}
              color={colors.BLACK}
              style={styles.cancel}
              onPress={handleCancelSearch}
            />
          )}
          style={styles.searchBar}
        />
      )}
      <FlatList
        data={filteredGroups}
        renderItem={item => <List items={item} navigation={navigation} />}
      />
      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => navigation.navigate('Contacts')}>
        <Plus name="pluscircle" color={colors.BLACK} size={moderateScale(50)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },

  cancel: {
    marginRight: moderateScale(10),
  },

  searchBar: {
    margin: moderateScale(15),
    height: moderateScale(35),
    backgroundColor: colors.GREY11,
  },

  input: {
    alignSelf: 'center',
    color: colors.BLACK,
  },

  addIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    right: moderateScale(20),
    top: '85%',
  },
});

export default GroupListUI;
