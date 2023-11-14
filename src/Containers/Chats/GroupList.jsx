import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Utils/colors';
import HeaderWithSearch from '../../Components/Header/HeaderWithSearch';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import Plus from 'react-native-vector-icons/AntDesign';
import List from '../../Components/Chat/List';
import {groupChatList} from '../../Data/GroupChatList';

const GroupList = ({navigation}) => {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(groupChatList);

  const handleSearch = query => {
    setSearchQuery(query);

    const filteredMessages = groupChatList.filter(message =>
      message.name.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredGroups(filteredMessages);
  };
  return (
    <View style={styles.container}>
      <HeaderWithSearch title={'Groups'} />
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
            onPress={() => {
              setSearch(false);
              setSearchQuery('');
              setFilteredGroups(chatList);
            }}
          />
        )}
        style={styles.searchBar}
      />
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

export default GroupList;
