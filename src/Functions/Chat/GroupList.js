import {useState} from 'react';
import {groupChatList} from '../../Data/GroupChatList';

const GroupListLogic = () => {
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
  };
};

export default GroupListLogic;
