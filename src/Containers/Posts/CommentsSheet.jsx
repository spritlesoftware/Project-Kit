import BottomSheet from 'react-native-gesture-bottom-sheet';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';
import {useRef, useState} from 'react';
import InputField from '../../Components/TextInput/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PostsFunction from '../../Functions/Posts/PostsFunctions';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import {styles} from './PostsStyles';
import {useAppContext} from '../../Context/ContextProvider';
export default function CommentsSheet({navigation}) {
  const [newcomment, setNewcomment] = useState('');
  const {post, setPost , comments} = useAppContext();

  return (
    <View>
      <Text style={styles.bottomsheetheader}>Comments</Text>
      <View>
        <ScrollView keyboardShouldPersistTaps="always">
          {comments?.length ? (
            comments.map(comment => {
              return (
                <View style={styles.commentcontainer}>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Image
                      source={{uri: comment.avatar}}
                      style={styles.avatar}
                    />
                    <Text style={styles.commenttext}>{comment.text}</Text>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={{color: colors.BLACK, padding: 20}}>No comments</Text>
          )}
        </ScrollView>
        <View style={styles.inputfieldcontainer}>
          <InputField
            label={'comment'}
            value={newcomment}
            onChangeText={text => setNewcomment(text)}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => {
              comments?.push({
                id: 101,
                username: 'myusername',
                avatar:
                  'https://cdn.iconscout.com/icon/free/png-256/free-avatar-human-man-profile-auto-user-30483.png',
                text: newcomment,
              });
              setPost([...post]);
              setNewcomment('');
            }}>
            <MaterialIcons
              name="send"
              size={30}
              color={colors.APP_PRIMARY}
              style={{marginTop: 20, marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
