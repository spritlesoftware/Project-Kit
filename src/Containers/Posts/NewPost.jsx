import {View, Text, StyleSheet, Image} from 'react-native';
import {colors} from '../../Utils/colors';
import {fonts} from '../../Utils/fonts';
import CustomButton from '../../Components/Button/CustomButton';
import { useState } from 'react';
import { useAppContext } from '../../Context/ContextProvider';
import InputField from '../../Components/TextInput/InputField'
import uuid from 'react-native-uuid';

export default function NewPost({route,navigation}) {
    const[caption , setCaption] = useState('')
    const {post , setPost} = useAppContext()
  console.log(route.params.image);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Post</Text>
      <View style={{width:"100%"}}>
        <Image
          source={{uri: `${route.params.image}`}}
          style={{height:350, width:350,marginBottom:20}}
        />
        <InputField
          label={"Add caption"}
          value={caption}
          onChangeText={text => setCaption(text)}
        />
      </View>
      {/* <View style={{width: 150, marginLeft: 'auto', marginRight: 20}}> */}
        <CustomButton
          title={'Post'}
          onPress={() => {
            setPost([{
                username:"myusername",
                image: `${route.params.image}`,
                caption:caption,
                isLiked:false,
                comments:[],
                id:uuid.v4(),
                avatar:"https://cdn.iconscout.com/icon/free/png-256/free-avatar-human-man-profile-auto-user-30483.png"
            },...post])
            navigation.navigate('Post');
          }}
        />
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1,
    padding:15,
    marginTop:-25,
    alignItems:"center"
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    padding:15,
    color: 'black',
    fontFamily: fonts.BOLD,
  },
});