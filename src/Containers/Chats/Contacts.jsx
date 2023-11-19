import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/colors';
import HeaderWithSearch from '../../Components/Header/HeaderWithSearch';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import List from '../../Components/Chat/List';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import {Users} from '../../Data/Users';
import {fonts} from '../../Utils/fonts';
import Check from 'react-native-vector-icons/AntDesign';
import {groupChatList} from '../../Data/GroupChatList';
import PopupModal from '../../Components/Modal/PopupModal';

const Contacts = ({navigation}) => {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(Users);
  const [isGroupSelection, setisGroupSelection] = useState(true);
  const [groupContact, setGroupContact] = useState([]);
  const [selected, setSelected] = useState(false);

  function HandleGroupSelection(item) {
    // Create a new Set with the existing groupContact values
    const updatedGroupContact = new Set(groupContact);

    // Toggle the presence of the item in the Set
    if (updatedGroupContact.has(item)) {
      updatedGroupContact.delete(item);
    } else {
      updatedGroupContact.add(item);
    }

    // Convert the Set back to an array and update the state
    setGroupContact(Array.from(updatedGroupContact));
  }

  console.log(groupContact);

  const handleSearch = query => {
    setSearchQuery(query);

    const filteredMessages = groupChatList.filter(message =>
      message.name.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredContacts(filteredMessages);
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
              setFilteredContacts(chatList);
            }}
          />
        )}
        style={styles.searchBar}
      />
      <PopupModal selectedCount={groupContact.length} />
      {isGroupSelection && (
        <View style={styles.groupContainer}>
          <Text style={styles.selectedNo}>
            Selected Contacts: {groupContact.length}
          </Text>
          {/* <TouchableRipple onPress={() => {}}>
            <Text style={styles.group}>Create Group</Text>
          </TouchableRipple> */}
        </View>
      )}
      <FlatList
        data={filteredContacts}
        renderItem={item => (
          <TouchableOpacity
            style={styles.listContainer}
            onLongPress={() => HandleGroupSelection(item.item)}
            onPress={() =>
              groupContact.length > 0 && HandleGroupSelection(item.item)
            }>
            <List
              items={item}
              navigation={navigation}
              groupContact={groupContact}
            />
          </TouchableOpacity>
        )}
      />
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

  selectedNo: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
    marginHorizontal: moderateScale(20),
  },

  listContainer: {
    flexDirection: 'column',
  },

  check: {
    marginTop: moderateScale(-25),
    marginLeft: moderateScale(40),
  },

  groupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  group: {
    fontFamily: fonts.BOLD,
    fontSize: moderateScale(15),
    marginRight: moderateScale(15),
    color: colors.BLACK,
  },
});

export default Contacts;
