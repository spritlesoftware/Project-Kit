import * as React from 'react';
import {Button, Menu, Divider} from 'react-native-paper';
import {colors} from '../../Utils/colors';
import MenuIcon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import { Alert } from 'react-native';
import { useAppContext } from '../../Context/ContextProvider';

const MenuPopupPost = props => {
    const {post, setPost} = useAppContext();
  const [visible, setVisible] = React.useState(true);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const navigation = useNavigation();

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button onPress={() => openMenu()} >
          <MenuIcon name="dots-three-vertical" color={colors.BLACK} size={15}  />
        </Button>
      }>
      <Menu.Item onPress={() => { 
                     closeMenu()
                     Alert.alert('Delete', 'Are you surely want to delete this post?', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () =>{
                          const filteredPost =  post.filter((each)=>{
                              if(props.id !== each.id){
                                    return each
                              }
                           })
                           setPost([...filteredPost])
                      }},
                    ]);}} title="Delete" />
      {/* <Menu.Item onPress={() => {}} title="Edit" /> */}
      {/* <Divider />
      <Menu.Item onPress={() => navigation.replace('Login')} title="Logout" /> */}
    </Menu>
  );
};

export default MenuPopupPost;
