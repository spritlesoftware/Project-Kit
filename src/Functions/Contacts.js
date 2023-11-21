import {useState} from 'react';
import {Users} from '../Data/Users';

const ContactsLogic = () => {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(Users);
  const [isGroupSelection, setisGroupSelection] = useState(true);
  const [groupContact, setGroupContact] = useState([]);
  const [selected, setSelected] = useState(false);

  const handleSearch = query => {
    setSearchQuery(query);

    const filteredMessages = Users.filter(message =>
      message.name.toLowerCase().includes(query.toLowerCase()),
    );

    setFilteredContacts(filteredMessages);
  };

  const HandleGroupSelection = item => {
    const updatedGroupContact = new Set(groupContact);

    if (updatedGroupContact.has(item)) {
      updatedGroupContact.delete(item);
    } else {
      updatedGroupContact.add(item);
    }

    setGroupContact(Array.from(updatedGroupContact));
  };

  return {
    search,
    setSearch,
    searchQuery,
    setSearchQuery,
    filteredContacts,
    setFilteredContacts,
    isGroupSelection,
    setisGroupSelection,
    groupContact,
    setGroupContact,
    selected,
    setSelected,
    handleSearch,
    HandleGroupSelection,
  };
};

export default ContactsLogic;
