import * as React from 'react';
import {Button, Menu, Divider} from 'react-native-paper';
import {colors} from '../../Utils/colors';
import MenuIcon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const MenuPopup = props => {
  const [visible, setVisible] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const navigation = useNavigation();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button onPress={() => openMenu()}>
          <MenuIcon name="dots-three-vertical" color={colors.WHITE} size={15} />
        </Button>
      }>
      <Menu.Item onPress={() => {}} title="Item 1" />
      <Menu.Item onPress={() => {}} title="Item 2" />
      <Divider />
      <Menu.Item onPress={() => navigation.replace('Login')} title="Logout" />
    </Menu>
  );
};

export default MenuPopup;
