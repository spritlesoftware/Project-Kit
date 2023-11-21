import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  DrawerLayoutAndroid,
  SafeAreaView,
} from 'react-native';
import {colors} from '../../Utils/colors';
import {Button} from 'react-native-paper';
import {useContext, useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {AppContext} from '../../Navigations/StackNavigator';
import {RadioButton} from 'react-native-paper';

export default function Tiles({navigation}) {
  const {fonts, setFont} = useContext(AppContext);
  const [isSelected, setIsSelected] = useState('Poppins');
  const drawer = useRef(null);
  const onClickAuthentication = () => {
    navigation.navigate('Login');
  };
  const onClickForm = () => {
    navigation.navigate('Form');
  };
  const onClickChat = () => {
    navigation.navigate('ChatList');
  };
  const onClickTable = () => {
    navigation.navigate('Table');
  };
  const onClickVideo = () => {
    navigation.navigate('RegisterScreen');
  };

  const navigationView = () => (
    <View style={{flex: 1, padding: 30, marginTop: 30}}>
      <Text
        style={{
          fontFamily: fonts.MEDIUM,
          color: colors.BLACK,
          fontSize: 20,
          padding: 20,
        }}>
        Fonts
      </Text>
      <TouchableOpacity
        onPress={() => {
          setIsSelected('Poppins');
          setFont({
            BOLD: 'Poppins-SemiBold',
            LIGHT: 'Poppins-Light',
            MEDIUM: 'Poppins-Medium',
            REGULAR: 'Poppins-Regular',
            SEMIBOLD: 'Poppins-SemiBold',
          });
        }}>
        <Text
          style={{
            fontFamily: fonts.REGULAR,
            color: isSelected == 'Poppins' ? colors.WHITE : colors.BLACK,
            fontSize: 15,
            padding: 10,
            textAlign: 'center',
            backgroundColor:
              isSelected == 'Poppins' ? colors.APP_PRIMARY : null,
            borderRadius: 15,
          }}>
          Poppins
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsSelected('Inter');
          setFont({
            BOLD: 'Inter-SemiBold',
            LIGHT: 'Inter-Light',
            MEDIUM: 'Inter-Medium',
            REGULAR: 'Inter-Regular',
            SEMIBOLD: 'Inter-SemiBold',
          });
        }}>
        <Text
          style={{
            fontFamily: fonts.REGULAR,
            color: isSelected == 'Inter' ? colors.WHITE : colors.BLACK,
            textAlign: 'center',
            fontSize: 15,
            padding: 10,
            borderRadius: 15,
            backgroundColor: isSelected == 'Inter' ? colors.APP_PRIMARY : null,
          }}>
          Inter
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsSelected('Montserrat');
          setFont({
            BOLD: 'Montserrat-SemiBold',
            LIGHT: 'Montserrat-Light',
            MEDIUM: 'Montserrat-Medium',
            REGULAR: 'Montserrat-Regular',
            SEMIBOLD: 'Montserrat-SemiBold',
          });
        }}>
        <Text
          style={{
            fontFamily: fonts.REGULAR,
            color: isSelected == 'Montserrat' ? colors.WHITE : colors.BLACK,
            fontSize: 15,
            padding: 10,
            backgroundColor:
              isSelected == 'Montserrat' ? colors.APP_PRIMARY : null,
            borderRadius: 15,
            textAlign: 'center',
          }}>
          Montserrat
        </Text>
      </TouchableOpacity>

      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={200}
        renderNavigationView={navigationView}>
        <View style={{display: 'flex', flexDirection: 'row', padding: 10}}>
          <TouchableOpacity
            onPress={() => {
              drawer.current.openDrawer();
            }}>
            <Feather
              name="menu"
              size={30}
              style={{marginTop: 45, marginLeft: 10}}
              color={colors.GRAY4}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.APP_PRIMARY,
              fontSize: 35,
              fontFamily: fonts.BOLD,
              padding: 30,
              textAlign: 'center',
            }}>
            Components
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            columnGap: 10,
            flexWrap: 'wrap',
            rowGap: 10,
            padding: 20,
          }}>
          <TouchableOpacity
            onPress={onClickAuthentication}
            style={styles.tilecontainer}>
            <Image
              style={{width: '100%', height: '90%', borderWidth: 10}}
              source={require('../../Assets/images/auth.png')}
            />
            <Text style={[styles.tiletext, {fontFamily: fonts.REGULAR}]}>
              Authentication
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickForm} style={styles.tilecontainer}>
            <Image
              style={{width: '100%', height: '90%', borderWidth: 10}}
              source={require('../../Assets/images/forms.png')}
            />
            <Text style={[styles.tiletext, {fontFamily: fonts.REGULAR}]}>
              Form
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickTable} style={styles.tilecontainer}>
            <Image
              style={{width: '100%', height: '90%', borderWidth: 10}}
              source={require('../../Assets/images/tables.png')}
            />
            <Text style={[styles.tiletext, {fontFamily: fonts.REGULAR}]}>
              Table
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickChat} style={styles.tilecontainer}>
            <Image
              style={{width: '100%', height: '90%', borderWidth: 10}}
              source={require('../../Assets/images/chats.png')}
            />
            <Text style={[styles.tiletext, {fontFamily: fonts.REGULAR}]}>
              Chat
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClickVideo} style={styles.tilecontainer}>
            <Image
              style={{width: '100%', height: '90%', borderWidth: 10}}
              source={require('../../Assets/images/videochat.png')}
            />
            <Text style={[styles.tiletext, {fontFamily: fonts.REGULAR}]}>
              Video chat
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.tilecontainer}>
                        <Image style={{ width: "100%", height: "90%", borderWidth: 10 }} source={require("../../Assets/images/barcode.png")} />
                        <Text style={styles.tiletext}>Barcode scanner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tilecontainer}>
                        <Image style={{ width: "100%", height: "90%", borderWidth: 10 }} source={require("../../Assets/images/track.png")} />
                        <Text style={styles.tiletext}>Audio player</Text>
                    </TouchableOpacity> */}
        </View>
      </DrawerLayoutAndroid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tilecontainer: {
    // borderRadius: 15,
    padding: 15,
    width: '48%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff',
  },
  tiletext: {
    color: colors.GRAY3,
    textAlign: 'left',
    padding: 5,
    borderRadius: 10,
    position: 'absolute',
    top: 120,
    fontSize: 12,
    marginTop: 2,
  },
});
