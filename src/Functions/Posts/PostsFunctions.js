import { useState } from "react";
import * as ImagePicker from 'react-native-image-picker';
import { useAppContext } from "../../Context/ContextProvider";

export default function PostsFunction(navigation){
   
    const {post , comments , setComments} = useAppContext()
    
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
         imageUri && navigation.navigate('NewPost', {
            image: imageUri
          });
          
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
          imageUri && navigation.navigate('NewPost', {image: imageUri});
        }
      },
    );
  }

  function commentsOnBottomSheet(id) {
    return post.filter(each => {
      if (each.id == id) {
        console.log(each.comments);
        setComments(each.comments);
      }
    });
  }

    return{
         commentsOnBottomSheet , 
         onLaunchCamera,
         onLaunchLibrary,
           comments,
           setComments
    }
}