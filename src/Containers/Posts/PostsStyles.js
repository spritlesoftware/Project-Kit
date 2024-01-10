import { StyleSheet } from "react-native";
import { colors } from "../../Utils/colors";
import { fonts } from "../../Utils/fonts";
import { moderateScale } from "react-native-size-matters";

export const styles = StyleSheet.create({
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
      elevation: 3,
      padding: 15,
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
    commentcontainer: {
      padding: 20,
    },
    commentheader: {
      padding: 20,
      fontSize: 20,
      color: colors.BLACK,
      borderBottomColor: colors.GRAY9,
      borderBottomWidth: 0.5,
    },
    cameragallerytext: {
      fontFamily: fonts.LIGHT,
      fontSize: 15,
      textAlign: 'center',
      color: 'gray',
      marginLeft: -15,
    },
    cameracontainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomsheetheader: {
      color: 'black',
      fontSize: 20,
      textAlign: 'center',
      padding: 15,
      paddingTop: 25,
      fontFamily: fonts.MEDIUM,
    },
    avatar: {
      height: 30,
      width: 30,
      borderWidth: 0.5,
      borderRadius: 25,
      borderColor: colors.GRAY7,
      marginRight: 10,
    },
    flexconatiner: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 20,
    },
    username: {
      marginTop: 2,
      fontFamily: fonts.MEDIUM,
      color: colors.BLACK,
    },
    usernamecontainer: {
      width: '90%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    commenttext: {
      color: colors.BLACK,
      fontSize: 16,
      marginTop: 2,
    },
    inputfieldcontainer: {
      display: 'flex',
      position: 'absolute',
      top: 300,
      right: 40,
      left: 20,
      flexDirection: 'row',
      padding: 10,
    },
  });
  