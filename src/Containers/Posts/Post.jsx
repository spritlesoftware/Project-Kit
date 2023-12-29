import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {data} from '../../Data/PostData';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {moderateScale} from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableRipple} from 'react-native-paper';
import {useRef, useState} from 'react';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'react-native-image-picker';
import {useAppContext} from '../../Context/ContextProvider';

export default function Post({navigation}) {
  const {post} = useAppContext();
  const bottomSheet = useRef();
  function onLaunchCamera() {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          navigation.navigate('NewPost', {image: imageUri});
        }
      },
    );
  }
  function onLaunchLibrary() {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.error) {
          console.log('Image picker error: ', response.error);
        } else {
          let imageUri = response.uri || response.assets?.[0]?.uri;
          navigation.navigate('NewPost', {image: imageUri});
        }
      },
    );
  }
  return (
    <ScrollView style={{backgroundColor: colors.WHITE, flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 30,
        }}>
        <Text style={styles.headerTitle}>Posts</Text>
        <TouchableRipple
          onPress={() => {
            bottomSheet.current.show();
          }}>
          <AntDesign
            name="pluscircle"
            color={'#0C2461'}
            size={35}
            style={{marginTop: 25}}
          />
        </TouchableRipple>
      </View>

      {post.map((each, index) => {
        return (
          <View style={styles.postcontainer} key={index}>
            <View
              style={{
                width: '90%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Image
                  source={{uri: each.avatar}}
                  style={{
                    height: 30,
                    width: 30,
                    borderWidth: 0.5,
                    borderRadius: 25,
                    borderColor: colors.GRAY7,
                    marginRight: 10,
                  }}
                />

                <Text
                  style={{
                    marginTop: 2,
                    fontFamily: fonts.MEDIUM,
                    color: colors.BLACK,
                  }}>
                  {each.username}
                </Text>
              </View>
              <Icons
                name="dots-three-vertical"
                color={colors.BLACK}
                size={20}
              />
            </View>

            {/* <View style={styles.postimage}></View> */}
            <Image
              style={styles.postimage}
              source={{uri: `${each.image}`}}
              resizeMode="cover"
            />
            <View style={styles.iconcontainer}>
              <View style={styles.flexrow}>
                <TouchableOpacity onPress={()=>{console.log()}}>
                  <AntDesign
                    name={each.isLiked == true? "heart" : "hearto"}
                    color={each.isLiked == true ?  colors.RED : colors.BLACK}
                    size={25}
                    style={{marginRight: 15}}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome
                    name="comment-o"
                    color={colors.BLACK}
                    size={25}
                    style={{marginTop: -2}}
                  />
                </TouchableOpacity>
              </View>
              <AntDesign name="sharealt" color={colors.BLACK} size={25} />
            </View>
            <View style={styles.captioncontainer}>
              <Text style={styles.captionusername}>{each.username}</Text>
              <Text style={styles.caption}>{each.caption}</Text>
            </View>
          </View>
        );
      })}
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={250}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
            textAlign: 'center',
            padding: 15,
            paddingTop: 25,
            fontFamily: fonts.MEDIUM,
          }}>
          Image Upload
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity style={styles.icon} onPress={onLaunchCamera}>
            <AntDesign name="camera" size={40} color={colors.APP_PRIMARY} />
            <Text
              style={{
                fontFamily: fonts.LIGHT,
                fontSize: 15,
                textAlign: 'center',
                color: 'gray',
                marginLeft: -15,
              }}>
              Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={onLaunchLibrary}>
            <Entypo name="folder-images" color={colors.APP_PRIMARY} size={40} />
            <Text
              style={{
                fontFamily: fonts.LIGHT,
                fontSize: 15,
                textAlign: 'center',
                color: 'gray',
                marginLeft: -5,
              }}>
              Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  headerTitle: {
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
    marginLeft: moderateScale(10),
    marginTop: moderateScale(5),
    paddingVertical: moderateScale(10),
    fontSize: moderateScale(25),
    alignSelf: 'center',
    paddingTop: 20,
  },
  postimage: {
    width: '90%',
    height: '70%',
    borderRadius: 0,
    borderWidth: 1,
    marginTop: 25,
    marginBottom: 10,
  },
  postcontainer: {
    backgroundColor: colors.WHITE,
    height: 450,
    width: '90%',
    margin: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    // borderBottomWidth: 0.6,
    borderColor: colors.GRAY7,
    elevation:3,
    padding:15
  },
  flexrow: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconcontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  captioncontainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    marginTop: 15,
  },
  captionusername: {
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    marginRight: 5,
  },
  caption: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
  },
  icon: {padding: 20, marginLeft: 20},
});
