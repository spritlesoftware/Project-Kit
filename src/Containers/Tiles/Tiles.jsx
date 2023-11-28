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
import {Button} from 'react-native-paper';
import {useContext, useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {AppContext} from '../../Navigations/StackNavigator';
import {components} from './Components.js'
import Themes from './Themes.jsx';

export default function Tiles({navigation}) {
  const {fonts, setFont} = useContext(AppContext);
  
  const drawer = useRef(null);
  
  function onClickTile(component){
    navigation.navigate(component)
  }
  const navigationView = () => (
    <Themes/>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        renderNavigationView={navigationView}>
        <View style={{display: 'flex', flexDirection: 'row', padding: 10}}>
          <TouchableOpacity
            onPress={() => {
              drawer.current.openDrawer();
            }}>
            <Feather
              name="menu"
              size={35}
              style={{marginTop: 35, marginLeft:25}}
              color={colors.GRAY4}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.APP_PRIMARY,
              fontSize: 35,
              fontFamily: fonts.BOLD,
              padding:10,
              textAlign: 'center',
              width: '75%',
              marginTop: 10,
            }}>
            KitBox
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              columnGap: 20,
              flexWrap: 'wrap',
              rowGap: 20,
              paddingRight: 20,
              paddingLeft: 20,
              justifyContent: 'center',
              padding:10,
            }}>
              {
                components.map(({name,navigation,image})=>{
                  console.log(image)
                  return(
                    <TouchableOpacity
                    onPress={()=>{onClickTile(navigation)}}
                    style={styles.tilecontainer}
                     key={name}>
                    <Image
                      style={styles.image}
                      source={image}
                    />
                    <Text style={[styles.tiletext, {fontFamily: fonts.MEDIUM}]}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                  )
                })
              }
           
            
          </View>
        </ScrollView>
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
    padding: 10,
    width: '44%',
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  tiletext: {
    color: colors.GRAY7,
    textAlign: 'left',
    padding:4,
    borderRadius: 10,
    position: 'absolute',
    top: 120,
    fontSize:14,
    marginTop:13,
  },
  image: {
    width: '100%',
    height: '70%',
    borderWidth: 10,
  },
});
