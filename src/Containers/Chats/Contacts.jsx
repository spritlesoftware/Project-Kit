import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {colors} from '../../Utils/colors';
import HeaderWithSearch from '../../Components/Header/HeaderWithSearch';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import List from '../../Components/Chat/List';
import Cancel from 'react-native-vector-icons/MaterialIcons';
import PopupModal from '../../Components/Modal/PopupModal';
import ContactsLogic from '../../Functions/Contacts';
import {fonts} from '../../Utils/fonts';

const Contacts = () => {
  const {
    search,
    setSearch,
    searchQuery,
    setSearchQuery,
    filteredContacts,
    setFilteredContacts,
    isGroupSelection,
    groupContact,
    setGroupContact,
    selected,
    setSelected,
    handleSearch,
    HandleGroupSelection,
    navigation,
  } = ContactsLogic();

  console.log(filteredContacts);
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
