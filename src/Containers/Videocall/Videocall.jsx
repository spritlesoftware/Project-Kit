// App.js


// import React, { useState, useRef, useEffect, useContext } from 'react';
// import { AppContext } from '../../Navigations/StackNavigator';
// import {
//     StyleSheet,
//     View,
//     Text,
//     StatusBar,
//     TouchableOpacity,
//     TextInput,
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     Dimensions,
//   } from 'react-native';
//   import {
//     TwilioVideoLocalView,
//     TwilioVideoParticipantView,
//     TwilioVideo,
// } from "react-native-twilio-video-webrtc";

// export const Videocall = ({navigation}) => {
 
    // const twilioVideo = useRef(null);
    // const {props, setProps} = useContext(AppContext);
      
//     console.log("props",props)
//       const _onMuteButtonPress = () => {
//         twilioVideo.current
//           .setLocalAudioEnabled(!props.isAudioEnabled)
//           .then((isEnabled) => setProps({...props, isAudioEnabled: isEnabled}));
//       };
    
//       const _onFlipButtonPress = () => {
//         twilioVideo.current.flipCamera();
//       };
//       const _onEndButtonPress = () => {
//        twilioVideo.current.disconnect();
//         setProps(initialState);
//       };

//       useEffect(() => {
//          twilioVideo.current.connect({
//           roomName: props.roomName,
//           accessToken: props.token,
//         });
//         setProps({...props, status: 'connecting'});
//         // return () => {
//         //   _onEndButtonPress();
//         // };
//       }, []);
      
//       return(<View style={styles.container}>
//       {(props.status === 'connected' || props.status === 'connecting') && (
//         <View style={styles.callContainer}>
//           {props.status === 'connected' && (
//             <View style={styles.remoteGrid}>
//               {Array.from(props.videoTracks, ([trackSid, trackIdentifier]) => (
//                 <TwilioVideoParticipantView
//                   style={styles.remoteVideo}
//                   key={trackSid}
//                   trackIdentifier={trackIdentifier}
//                 />
//               ))}
//             </View>
//           )}
//         </View>
//       )}
//        <View style={{height:40,display:"flex",flexDirection:"row"}}>
//         <TouchableOpacity style={{height:20,width:50}} onPress={_onEndButtonPress}>
//           <Text style={{color:"black"}}>End</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{height:20,width:50}} onPress={_onMuteButtonPress}>
//           <Text style={{color:"black"}}>
//             {props.isAudioEnabled ? 'Mute' : 'Unmute'}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={{height:20,width:50}} onPress={_onFlipButtonPress}>
//           <Text style={{color:"black"}}>Flip</Text>
//         </TouchableOpacity>
//         <TwilioVideo
//         style={{height:300,width:300}}
//         ref={twilioVideo}
//         onRoomDidConnect={() => {
//           setProps({...props, status: 'connected'});
//         }}
//         onRoomDidDisconnect={() => {
//           setProps({...props, status: 'disconnected'});
//           navigation.goBack();
//         }}
//         onRoomDidFailToConnect={(error) => {
//           console.log(error)
//           Alert.alert('Error', error.error);
//           setProps({...props, status: 'disconnected'});
//           navigation.goBack();
//         }}
//         onParticipantAddedVideoTrack={({participant, track}) => {
//           if (track.enabled) {
//             setProps({
//               ...props,
//               videoTracks: new Map([
//                 ...props.videoTracks,
//                 [
//                   track.trackSid,
//                   {
//                     participantSid: participant.sid,
//                     videoTrackSid: track.trackSid,
//                   },
//                 ],
//               ]),
//             });
//           }
//         }}
//         onParticipantRemovedVideoTrack={({track}) => {
//           const videoTracks = props.videoTracks;
//           videoTracks.delete(track.trackSid);
//           setProps({...props, videoTracks});
//         }}
//       />
//       </View>
//       </View>
       
//      )
// }

import React, { useState, useRef, useEffect,useContext} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    PermissionsAndroid,
    Platform,
    TouchableOpacity,
} from "react-native";
import { AppContext } from '../../Navigations/StackNavigator';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo,
} from "react-native-twilio-video-webrtc";
import { initialState } from '../../Navigations/StackNavigator';

export const Videocall = ({navigation}) => {

  const twilioVideo = useRef(null);
  const {props, setProps} = useContext(AppContext);
    // const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    // const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    // const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);
    // const [status, setStatus] = useState("disconnected");
    // const [participants, setParticipants] = useState(new Map());
    // const [videoTracks, setVideoTracks] = useState(new Map());
    // const [token, setToken] = useState("");
    useEffect(()=>{
      _onConnectButtonPress()
    },[])
   console.log("props:",props)
    const _onConnectButtonPress = async () => {
        if (Platform.OS === "android") {
            await _requestAudioPermission();
            await _requestCameraPermission();
        }
        twilioVideo.current.connect({
            accessToken: props.token,
            roomName: props.roomName,
            enableNetworkQualityReporting: true,
            dominantSpeakerEnabled: true,
        });
        setProps({...props, status: 'connecting'});
        
    };

    const _onEndButtonPress = () => {
        twilioVideo.current.disconnect();
        navigation.navigate("RegisterScreen")
    };

    const _onMuteButtonPress = () => {
        // twilioVideo.current
        //     .setLocalAudioEnabled(!isAudioEnabled)
        //     .then((isEnabled) => setIsAudioEnabled(isEnabled));

            twilioVideo.current
                      .setLocalAudioEnabled(!props.isAudioEnabled)
                      .then((isEnabled) => setProps({...props, isAudioEnabled: isEnabled}));
    };

    const _onShareButtonPressed = () => {
        twilioVideo.current.toggleScreenSharing(!isSharing);
        //setIsSharing(!isSharing);
    };

    const _onFlipButtonPress = () => {
        twilioVideo.current.flipCamera();
    };

    const _onRoomDidConnect = () => {
      setProps({...props, status: 'connected'});
    };

    const _onRoomDidDisconnect = ({ error }) => {
        console.log("ERROR: ", error);

        setProps({...props, status: 'disconnected'});
    };

    const _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", error);

        setProps({...props, status: 'disconnected'});
    };

    const _onParticipantAddedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantAddedVideoTrack: ", participant, track);

        if (track.enabled) {
                      setProps({
                        ...props,
                        videoTracks: new Map([
                          ...props.videoTracks,
                          [
                            track.trackSid,
                            {
                              participantSid: participant.sid,
                              videoTrackSid: track.trackSid,
                            },
                          ],
                        ]),
                      });
                    }
                  }
              
      //   setProps({...props, videoTracks:(originalVideoTracks) => {
      //     originalVideoTracks.set(track.trackSid, {
      //         participantSid: participant.sid,
      //         videoTrackSid: track.trackSid,
      //     });
      //     return new Map(originalVideoTracks);
      // }})

        // setVideoTracks((originalVideoTracks) => {
        //     originalVideoTracks.set(track.trackSid, {
        //         participantSid: participant.sid,
        //         videoTrackSid: track.trackSid,
        //     });
        //     return new Map(originalVideoTracks);
        // });


    const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track);

        const videoTracks = props.videoTracks;
                  videoTracks.delete(track.trackSid);
                  setProps({...props, videoTracks});

        // setVideoTracks((originalVideoTracks) => {
        //     originalVideoTracks.delete(track.trackSid);
        //     return new Map(originalVideoTracks);
        // });
    };

    const _onNetworkLevelChanged = ({ participant, isLocalUser, quality }) => {
        console.log(
            "Participant",
            participant,
            "isLocalUser",
            isLocalUser,
            "quality",
            quality
        );
    };

    const _onDominantSpeakerDidChange = ({ roomName, roomSid, participant }) => {
        console.log(
            "onDominantSpeakerDidChange",
            `roomName: ${roomName}`,
            `roomSid: ${roomSid}`,
            "participant:",
            participant
        );
    };

    const _requestAudioPermission = () => {
        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: "Need permission to access microphone",
                message:
                    "To run this demo we need permission to access your microphone",
                buttonNegative: "Cancel",
                buttonPositive: "OK",
            }
        );
    };

    const _requestCameraPermission = () => {
        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
            title: "Need permission to access camera",
            message: "To run this demo we need permission to access your camera",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
        });
    };

    return (
        <View style={styles.container}>
            {/* {status === "disconnected" && (
                <View>
                    <Text style={styles.welcome}>React Native Twilio Video</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        value={token}
                        onChangeText={(text) => setToken(text)}
                    ></TextInput>
                    <Button
                        title="Connect"
                        style={styles.button}
                        onPress={_onConnectButtonPress}
                    ></Button>
                </View>
            )} */}

            {(props.status === "connected" || props.status === "connecting") && (
                <View style={styles.callContainer}>
                    {props.status === "connected" && (
                        <View style={styles.remoteGrid}>
                            {Array.from(props.videoTracks, ([trackSid, trackIdentifier]) => {
                                return (
                                    <TwilioVideoParticipantView
                                        style={styles.remoteVideo}
                                        key={trackSid}
                                        trackIdentifier={trackIdentifier}
                                    />
                                );
                            })}
                        </View>
                    )}
                    <View style={styles.optionsContainer}>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={_onEndButtonPress}
                        >
                            <Text style={{ fontSize: 12 }}>End</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={_onMuteButtonPress}
                        >
                            <Text style={{ fontSize: 12 }}>
                                {props.isAudioEnabled ? "Mute" : "Unmute"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={_onFlipButtonPress}
                        >
                            <Text style={{ fontSize: 12 }}>Flip</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.optionButton}
                            onPress={_onShareButtonPressed}
                        >
                            <Text style={{ fontSize: 12 }}>
                                {/* {isSharing ? "Stop Sharing" : "Start Sharing"} */}
                            </Text>
                        </TouchableOpacity>
                        <TwilioVideoLocalView enabled={true} style={styles.localVideo} />
                    </View>
                </View>
            )}

            <TwilioVideo
                ref={twilioVideo}
                onRoomDidConnect={_onRoomDidConnect}
                onRoomDidDisconnect={_onRoomDidDisconnect}
                onRoomDidFailToConnect={_onRoomDidFailToConnect}
                onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
                onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
                onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
                onDominantSpeakerDidChange={_onDominantSpeakerDidChange}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    callContainer: {
        flex: 1,
        position: "absolute",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
    },
    welcome: {
        fontSize: 30,
        textAlign: "center",
        paddingTop: 40,
        color:"black"
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginRight: 70,
        marginLeft: 70,
        marginTop: 50,
        textAlign: "center",
        backgroundColor: "white",
        color:"black"
    },
    button: {
        marginTop: 100,
    },
    localVideo: {
        flex: 1,
        width: 150,
        height: 250,
        position: "absolute",
        right: 10,
        bottom: 10,
    },
    remoteGrid: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    remoteVideo: {
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        width: 350,
        height: 420,
    },
    optionsContainer: {
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        height: 100,
        backgroundColor: "blue",
        flexDirection: "row",
        alignItems: "center",
    },
    optionButton: {
        width: 60,
        height: 60,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 100 / 2,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
    },
})
