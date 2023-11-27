import {useState} from 'react';
import {chatList} from '../Data/ChatList';

const ChatListLogic = () => {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChat, setFilteredChat] = useState(chatList);
  const [openDrawer, setOpenDrawer] = useState(false);

  console.log(chatList);

  const handleSearch = query => {
    setSearchQuery(query);

    const filteredMessages = chatList.filter(message =>
      message.name.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredChat(filteredMessages);
  };

  const handleCancelSearch = () => {
    setSearch(false);
    setSearchQuery('');
    setFilteredChat(chatList);
  };

  return {
    search,
    setSearch,
    searchQuery,
    setSearchQuery,
    filteredChat,
    openDrawer,
    setOpenDrawer,
    handleSearch,
    handleCancelSearch,
  };
};

export default ChatListLogic;
