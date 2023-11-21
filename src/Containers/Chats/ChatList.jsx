import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../Utils/colors';
import List from '../../Components/Chat/List';
import HeaderWithSearch from '../../Components/Header/HeaderWithSearch';
import {Searchbar} from 'react-native-paper';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from 'react-native-size-matters';
import ChatListLogic from '../../Functions/ChatList';
import {chatList} from '../../Data/ChatList';

const ChatList = () => {
  const {
    search,
    setSearch,
    searchQuery,
    setSearchQuery,
    filteredChat,
    openDrawer,
    setOpenDrawer,
    handleSearch,
    handleCancelSearch,
    navigation,
  } = ChatListLogic();

  return (
    <View style={styles.container}>
      <HeaderWithSearch
        title={'Chats'}
        setSearch={setSearch}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
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
        data={filteredChat}
        renderItem={item => <List items={item} navigation={navigation} />}
      />
    </View>
  );
};

export default ChatList;

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
});
