import * as React from 'react';
import {Button, Menu, Divider} from 'react-native-paper';
import {colors} from '../../Utils/colors';
import MenuIcon from 'react-native-vector-icons/Entypo';

const MenuPopup = props => {
  const [visible, setVisible] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button onPress={() => openMenu()}>
          <MenuIcon name="dots-three-vertical" color={colors.WHITE} size={20} />
        </Button>
      }>
      <Menu.Item onPress={() => {}} title="Item 1" />
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Divider />
      <Menu.Item onPress={() => {}} title="Item 3" />
    </Menu>
  );
};

export default MenuPopup;
