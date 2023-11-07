import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Radar, { Map, Autocomplete } from "react-native-radar";
import MapLibreGL from "@maplibre/maplibre-react-native";
import ExampleButton from "./src/Components/exampleButton";
// import ExampleButton from "./Components/exampleButton";

MapLibreGL.setAccessToken(null);

Radar.on("log", (result) => {
  console.log("log:", stringify(result));
});



Radar.on("error", (err) => {
  console.log("error:", stringify(err));
});

const stringify = (obj) => JSON.stringify(obj, null, 2);

export default function App() {
  // add in your test code here!
  const [displayText, setDisplayText] = useState("");
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");
  const [status, setStatus] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [exitedTime, setExitedTime] = useState("");
  const [timeSpent , setTimeSpent] = useState("")
 

  Radar.on("clientLocation", ({ stopped }) => {
    //console.log("clientLocation:", stringify(result));
    setStatus(stopped === true ? "Stopped" : "Moving")
  });

  Radar.on("location", ({user}) => {
    console.log("location:", stringify(user));
    setStatus(user.stopped === true ? "Stopped" : "Moving")
  });


  Radar.on("events", ({ events }) => {
    console.log("events:", stringify(events));
    setLocation((events[0].geofence.externalId))
    const event = events[0].type
    setEvent(event)
    if(event == "user.exited_geofence"){
      const time = new Date(events[0].createdAt).toLocaleString();
      const timeSpent = Math.round(events[0].duration)
      setExitedTime(time)
      setTimeSpent(timeSpent)
    }
    if(event == "user.entered_geofence"){
      const time = new Date(events[0].createdAt).toLocaleString();
      setEnteredTime(time)
    }
  });

  const handlePopulateText = (displayText) => {
    setDisplayText(displayText);
  };

  const stringify = (obj) => JSON.stringify(obj, null, 2);

  useEffect(() => {
    //fetch the API 
    Radar.initialize("prj_test_pk_71e82fea86d18f5b4811d07800057490f7243af0", true);

    Radar.setUserId("test-user-1");

    Radar.setDescription("Testing");

    Radar.startTrackingResponsive()

  }, []);

  useEffect(() => {
    Radar.startTrackingResponsive()
  }, [status])

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "70%" }}>
        <Map />
      </View>
      <View style={{ width: "100%", height: "50%", padding: 20 }}>
        <ScrollView>
          <Text style={{ color: "black", fontSize: 17, padding: 7 }}>Current status: {status}</Text>
          <Text style={{ color: "black", fontSize: 17, borderWidth: 0, padding: 7 }}>Geo Fence Area: {location}</Text>
          <Text style={{ color: "black", fontSize: 17, borderWidth: 0, padding: 7 }}>Event: {event}</Text>
          <Text style={{ color: "black", fontSize: 17, borderWidth: 0, padding: 7 }}>Entered on: {enteredTime}</Text>
          <Text style={{ color: "black", fontSize: 17, borderWidth: 0, padding: 7 }}>Exited on: {exitedTime}</Text>
          <Text style={{ color: "black", fontSize: 17, borderWidth: 0, padding: 7 }}>Time spent :{timeSpent} mins </Text>
          {/* <Text style={{ color: "red", fontSize: 20, borderWidth: 0 }}>{displayText} </Text> */}
        </ScrollView>
        <ScrollView>
          <ExampleButton
            title="requestPermissions"
            onPress={() => {
              Radar.requestPermissions(false)
                .then((result) => {
                  handlePopulateText("requestPermissions:" + result);
                })
                .catch((err) => {
                  handlePopulateText("requestPermissions:" + err);
                });
            }}
          />
          <ExampleButton
            title="getPermissionsStatus"
            onPress={() => {
              Radar.getPermissionsStatus()
                .then((result) => {
                  handlePopulateText("getPermissionsStatus:" + result);
                })
                .catch((err) => {
                  handlePopulateText("getPermissionsStatus:" + err);
                });
            }}
          />
          <ExampleButton
            title="getLocation"
            onPress={() => {
              Radar.getLocation()
                .then((result) => {
                  handlePopulateText("getLocation:" + stringify(result));
                })
                .catch((err) => {
                  handlePopulateText("getLocation:" + err);
                });
            }}
          />
          <ExampleButton
            title="trackOnce"
            onPress={() => {

              Radar.trackOnce()
                .then(({ events }) => {
                  // console.log("result : ",result)
                  handlePopulateText("trackingUser:" + stringify(events[0]?.type));

                })
                .catch((err) => {
                  handlePopulateText("trackOnce:" + err);
                });

            }}
          />


        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});