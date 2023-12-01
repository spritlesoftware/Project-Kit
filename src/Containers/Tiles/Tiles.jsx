import {
  Pressable,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  DrawerLayoutAndroid,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {colors} from '../../Utils/colors';
import Feather from 'react-native-vector-icons/Feather';
import {components} from './Components.js';
import Themes from './Themes.jsx';
import {useAppContext} from '../../Context/ContextProvider.js';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

export default function Tiles({navigation}) {
  const {fonts, drawer} = useAppContext();
  // const drawer = useRef(null);

  useEffect(() => {
    SplashScreen.hide();
  });

  function onClickTile(component) {
    navigation.navigate(component);
  }
  // const navigationView = () => <Themes />;

  return (
    <SafeAreaView style={styles.container}>
      {/* <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        renderNavigationView={navigationView}> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 5,
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            drawer.current.openDrawer();
          }}>
          <Feather
            name="menu"
            size={27}
            style={{marginTop: 30, marginLeft: 25}}
            color={colors.GRAY4}
          />
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '73%',
          }}>
          <Image
            source={require('../../Assets/images/appicon.png')}
            style={{
              height: 70,
              width: 70,
              borderColor: 'red',
              marginTop: 10,
              position: 'absolute',
              left: 30,
            }}
          />
          <Text style={[styles.header, {fontFamily: fonts.BOLD}]}>KitBox</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.tileflexcontainer}>
          {components.map(({name, navigation, image}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  onClickTile(navigation);
                }}
                style={styles.tilecontainer}
                key={name}>
                <Image style={styles.image} source={image} />
                <Text style={[styles.tiletext, {fontFamily: fonts.REGULAR}]}>
                  {name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {/* </DrawerLayoutAndroid> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    color: colors.APP_PRIMARY,
    fontSize: 35,
    textAlign: 'center',
    width: '100%',
    marginTop: 18,
  },
  tilecontainer: {
    padding: 10,
    width: '30%',
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    // borderWidth:1
  },
  tiletext: {
    color: colors.BLACK,
    textAlign: 'left',
    padding: 0,
    borderRadius: 10,
    position: 'absolute',
    top: 75,
    fontSize: 11,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: '78%',
    borderWidth: 10,
  },
  tileflexcontainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 13,
    flexWrap: 'wrap',
    rowGap: 20,
    paddingRight: 15,
    paddingLeft: 15,
    padding: 10,
    justifyContent: 'center',
  },
});
