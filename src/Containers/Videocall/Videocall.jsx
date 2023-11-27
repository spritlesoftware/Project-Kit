
import React, { useState, useRef, useEffect, useContext } from "react";
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
    Dimensions,
    Image
} from "react-native";
import { AppContext } from '../../Navigations/StackNavigator';
import {
    TwilioVideoLocalView,
    TwilioVideoParticipantView,
    TwilioVideo,
} from "react-native-twilio-video-webrtc";
import { fonts } from "../../Utils/fonts";
import { colors } from "../../Utils/colors";
const dimensions = Dimensions.get('window');

export const Videocall = ({ navigation }) => {
    const twilioVideo = useRef(null);
    const { props, setProps } = useContext(AppContext);
    useEffect(() => {
        _onConnectButtonPress()
    }, [])
    console.log("props:", props)
    console.log("parrr:",props.participants)
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
        setProps({ ...props, status: 'connecting' });

    };

    const _onEndButtonPress = () => {
        twilioVideo.current.disconnect();
        navigation.navigate("RegisterScreen")
    };

    const _onMuteButtonPress = () => {
        twilioVideo.current
            .setLocalAudioEnabled(!props.isAudioEnabled)
            .then((isEnabled) => setProps({ ...props, isAudioEnabled: isEnabled }));
    };

    const _onShareButtonPressed = () => {
        twilioVideo.current.toggleScreenSharing(!isSharing);

    };

    const _onFlipButtonPress = () => {
        twilioVideo.current.flipCamera();
    };

    const _onRoomDidConnect = () => {
        setProps({ ...props, status: 'connected' });
    };

    const _onRoomDidDisconnect = ({ error }) => {
        console.log("ERROR: ", error);

        setProps({ ...props, status: 'disconnected' });
    };

    const _onRoomDidFailToConnect = (error) => {
        console.log("ERROR: ", error);

        setProps({ ...props, status: 'disconnected' });
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
                participants: [
                    props.participants, participant
                ]
            });
        }
    }

    const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
        console.log("onParticipantRemovedVideoTrack: ", participant, track);

        const videoTracks = props.videoTracks;
        videoTracks.delete(track.trackSid);
        setProps({ ...props, videoTracks });
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
            {(props.status === "connected" || props.status === "connecting") && (
                <View style={styles.callContainer}>
                    {(props.status === "connected" && props.participants.length > 1) ? (
                        <View style={styles.remoteGrid}>
                            {Array.from(props.videoTracks, ([trackSid, trackIdentifier]) => {
                                return (
                                    <TwilioVideoParticipantView
                                        style={{
                                            width: dimensions.width,
                                            height: dimensions.height / 2
                                            // position: 'absolute',
                                            // top: 0,
                                            // left: 0,
                                            // right: 0,
                                            // bottom: 0,
                                        }}
                                        key={trackSid}
                                        trackIdentifier={trackIdentifier}
                                    />
                                );
                            })}
                        </View>
                    ) : (
                        <View style={styles.remoteGrid}>
                            <View style={{ backgroundColor: "#363737", width: dimensions.width, height: dimensions.height / 2, flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../../Assets/images/avata.png")} style={{ height: 150, width: 150 }} />
                            </View>
                        </View>
                    )}
                </View>)
            }

            < TwilioVideoLocalView style={{
                width: dimensions.width,
                height: dimensions.height / 2,
            }} />
            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    style={[styles.optionButton, { backgroundColor: "#363737" }]}
                    onPress={_onMuteButtonPress}
                >
                    <Text style={{ fontSize: 12 ,fontFamily:fonts.REGULAR,color:colors.WHITE}}>
                        {props.isAudioEnabled ? "Mute" : "Unmute"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionButton, { backgroundColor: "red" }]}
                    onPress={_onEndButtonPress}
                >
                    <Text style={{ fontSize: 12, color:colors.WHITE,fontFamily:fonts.REGULAR }}>End</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.optionButton, { backgroundColor: "#363737" }]}
                    onPress={_onFlipButtonPress}
                >
                    <Text style={{ fontSize: 12, color:colors.WHITE ,fontFamily:fonts.REGULAR}}>Flip</Text>
                </TouchableOpacity>
            </View>
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
        </View >
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        position: "relative",

    },
    callContainer: {

        flex: 1,
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
    },
    welcome: {
        fontSize: 30,
        textAlign: "center",
        paddingTop: 40,
        color: "black"
    },
    input: {
        height: 50,
        borderWidth: 1,
        marginRight: 70,
        marginLeft: 70,
        marginTop: 50,
        textAlign: "center",
        backgroundColor: "white",
        color: "black"
    },
    button: {
        marginTop: 100,
    },
    localVideo: {
        position: "absolute",
        flex: 1,
        bottom: 100,
        right: 10,
        width: 150,
        height: 200,

    },
    bigLocalVideo: {
        width: dimensions.width,
        height: dimensions.height,
        flex: 1
    },
    remoteGrid: {
        flex: 1,
        flexDirection: "row"
    },
    remoteVideo: {
        width: dimensions.width,
        height: dimensions.height,
    },
    optionsContainer: {
        position: "absolute",
        bottom: 0,
        right: 0,
        height: 100,
        left: 45,
        flexDirection: "row",
        alignItems: "center",
    },
    optionButton: {
        width: 60,
        height: 60,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 100 / 2,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
    },
})
