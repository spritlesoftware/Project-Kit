import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Utils/colors';
import List from '../../Components/Chat/List';
import {chatList} from '../../Data/ChatList';
import HeaderWithSearch from '../../Components/Header/HeaderWithSearch';
import {Searchbar} from 'react-native-paper';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import {moderateScale} from 'react-native-size-matters';

const ChatList = ({navigation}) => {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChat, setFilteredChat] = useState(chatList);
  const handleSearch = query => {
    setSearchQuery(query);

    const filteredMessages = chatList.filter(message =>
      message.name.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredChat(filteredMessages);
  };

  return (
    <View style={styles.container}>
      {search ? (
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          iconColor={colors.BLACK}
          right={() => (
            <Cancel
              name="cancel"
              size={25}
              color={colors.BLACK}
              style={styles.cancel}
              onPress={() => {
                setSearch(false);
                setSearchQuery('');
                setFilteredChat(chatList);
              }}
            />
          )}
          style={styles.searchBar}
        />
      ) : (
        <HeaderWithSearch setSearch={setSearch} />
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
    marginRight: moderateScale(20),
  },

  searchBar: {
    margin: moderateScale(10),
  },
});
