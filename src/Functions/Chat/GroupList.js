import {useState} from 'react';
import {groupChatList} from '../../Data/GroupChatList';
import {useNavigation} from '@react-navigation/core';

const GroupListLogic = () => {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(groupChatList);
  const navigation = useNavigation();

  const handleSearch = query => {
    setSearchQuery(query);

    const filteredMessages = groupChatList.filter(message =>
      message.name.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredGroups(filteredMessages);
  };

  const handleCancelSearch = () => {
    setSearch(false);
    setSearchQuery('');
    setFilteredGroups(groupChatList);
  };

  return {
    search,
    setSearch,
    searchQuery,
    setSearchQuery,
    filteredGroups,
    handleSearch,
    handleCancelSearch,
    navigation,
  };
};

export default GroupListLogic;
