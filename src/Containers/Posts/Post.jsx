import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../Utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableRipple} from 'react-native-paper';
import {useRef, useState} from 'react';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAppContext} from '../../Context/ContextProvider';
import MenuPopupPost from './MenuPopupPost';
import {styles} from './PostsStyles';
import PostsFunction from '../../Functions/Posts/PostsFunctions';
import CommentsSheet from './CommentsSheet';

export default function Post({navigation}) {
  const {post, setPost} = useAppContext();
  const bottomSheet = useRef();
  const {onLaunchCamera, onLaunchLibrary, commentsOnBottomSheet} =
    PostsFunction(navigation);
  const commentsSheet = useRef();
  return (
    <View style={styles.container}>
      <View style={styles.flexconatiner}>
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
      <ScrollView>
        {post.map((each, index) => {
          return (
            <View style={styles.postcontainer} key={index}>
              <View style={styles.usernamecontainer}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Image source={{uri: each.avatar}} style={styles.avatar} />
                  <Text style={styles.username}>{each.username}</Text>
                </View>
                <MenuPopupPost id={each.id} />
              </View>
              <Image
                style={styles.postimage}
                source={{uri: `${each.image}`}}
                resizeMode="cover"
              />
              <View style={styles.iconcontainer}>
                <View style={styles.flexrow}>
                  <TouchableOpacity
                    onPress={() => {
                      each.isLiked = !each.isLiked;
                      setPost([...post]);
                    }}>
                    <AntDesign
                      name={each.isLiked ? 'heart' : 'hearto'}
                      color={each.isLiked ? 'red' : colors.BLACK}
                      size={25}
                      style={{marginRight: 15}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      commentsOnBottomSheet(each.id);
                      commentsSheet.current.show();
                    }}>
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
      </ScrollView>
      {/* COMMENTS BOTTOMSHEET */}
      <BottomSheet
        hasDraggableIcon
        ref={commentsSheet}
        height={480}
        sheetBackgroundColor={colors.WHITE}>
        <CommentsSheet />
      </BottomSheet>

      {/* IMAGE UPLOAD BOTTOMSHEET */}
      <BottomSheet
        hasDraggableIcon
        ref={bottomSheet}
        height={250}
        sheetBackgroundColor={colors.WHITE}>
        <Text style={styles.bottomsheetheader}>Image Upload</Text>
        <View style={styles.cameracontainer}>
          <TouchableOpacity style={styles.icon} onPress={onLaunchCamera}>
            <AntDesign name="camera" size={40} color={colors.APP_PRIMARY} />
            <Text style={styles.cameragallerytext}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={onLaunchLibrary}>
            <Entypo name="folder-images" color={colors.APP_PRIMARY} size={40} />
            <Text style={styles.cameragallerytext}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}
