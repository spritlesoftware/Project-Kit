import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Radar, { Map, Autocomplete } from "react-native-radar";
import ExampleButton from "../Components/exampleButton";
import MapLibreGL from "@maplibre/maplibre-react-native";

MapLibreGL.setAccessToken(null);

Radar.on("log", (result) => {
  console.log("log:", stringify(result));
});

Radar.on("error", (err) => {
  console.log("error:", stringify(err));
});

const stringify = (obj) => JSON.stringify(obj, null, 2);

export default function Geofencing({ route }) {
  // add in your test code here!
  const [location, setLocation] = useState("");
  const [event, setEvent] = useState("");
  const [status, setStatus] = useState("");
  const [enteredTime, setEnteredTime] = useState("");
  const [exitedTime, setExitedTime] = useState("");
  const [timeSpent, setTimeSpent] = useState("")
  const [displayText, setDisplayText] = useState("");

  const handlePopulateText = (displayText) => {
    setDisplayText(displayText);
  };

  Radar.on("clientLocation", ({ stopped }) => {
    //console.log("clientLocation:", stringify(result));
    setStatus(stopped === true ? "Stopped" : "Moving")
  });

  Radar.on("location", ({ user }) => {
    console.log("location:", stringify(user));
    setStatus(user.stopped === true ? "Stopped" : "Moving")
  });


  Radar.on("events", ({ events }) => {
    console.log("events:", stringify(events));
    setLocation((events[0].geofence.externalId))
    const event = events[0].type
    setEvent(event)
    if (event == "user.exited_geofence") {
      const time = new Date(events[0].createdAt).toLocaleString();
      const timeSpent = Math.round(events[0].duration)
      setExitedTime(time)
      setTimeSpent(timeSpent)
    }
    if (event == "user.entered_geofence") {
      const time = new Date(events[0].createdAt).toLocaleString();
      setEnteredTime(time)
    }
  });

  //   const handlePopulateText = (displayText) => {
  //     setDisplayText(displayText);
  //   };

  const stringify = (obj) => JSON.stringify(obj, null, 2);

  useEffect(() => {
    Radar.initialize("prj_test_pk_71e82fea86d18f5b4811d07800057490f7243af0", true);

    Radar.setUserId(route.params.userId)
    Radar.setDescription(route.params.description)

    //fetch the API 
    Radar.requestPermissions(false)
      .then((result) => {
        handlePopulateText("requestPermissions:" + result);
      })
      .catch((err) => {
        handlePopulateText("requestPermissions:" + err);
      });

    Radar.getLocation()

    Radar.startTrackingResponsive()

  }, []);

  useEffect(() => {
    Radar.startTrackingResponsive()
  }, [status])

  const [cameraConfig, setCameraConfig] = useState({
    triggerKey: Date.now(),
    centerCoordinate: [ 80.1765705 , 13.0669653],
    animationMode: 'flyTo',
    animationDuration: 1000,
    zoomLevel: 12,
  });

  const onRegionDidChange = (event) => {
    // do something on region change
  }

  const onSelect = (address) => {
    // do something with selected address
  }

  const pointsCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          _id: '123',
        },
        geometry: {
          type: 'Point',
          coordinates: [80.1765705 , 13.0669653]
        }
      }
    ]
  }; 
  
  const onPress = (event) => {
    // do something on press
  }
    
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", height: "60%" }}>
         {/* <Map />  */}
         <Map mapOptions={{
      onRegionDidChange
      }}>
        <MapLibreGL.Camera
          {...cameraConfig}
        />
        <MapLibreGL.ShapeSource
          id="points"
          shape={pointsCollection}
          onPress={onPress}
        >
        <MapLibreGL.SymbolLayer
            id="symbol"
            style={{
              iconImage: 'icon',
              iconSize: [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 0.2, // adjust the icon size for zoom level 0
                12, 0.4, // adjust the icon size for zoom level 12
                22, 0.8, // adjust the icon size for zoom level 22
              ],
              iconAllowOverlap: true,
            }}
          />
        </MapLibreGL.ShapeSource>
      </Map>
      </View>
      <View style={{ width: "100%", height: "50%", padding: 20 }}>
        <ScrollView>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "black", fontSize: 17, padding: 7, fontWeight: "bold" }}>Current status:</Text>
            <Text style={{ color: "gray", fontSize: 17, padding: 7, fontWeight: "normal" }}>{status}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "black", fontSize: 17, padding: 7, fontWeight: "bold" }}>Geo Fence Area:</Text>
            <Text style={{ color: "gray", fontSize: 17, padding: 7, fontWeight: "normal" }}>{location}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "black", fontSize: 17, padding: 7, fontWeight: "bold" }}>Event:</Text>
            <Text style={{ color: "gray", fontSize: 17, padding: 7, fontWeight: "normal" }}>{event}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}>
            <Text style={{ color: "black", fontSize: 17, padding: 7, fontWeight: "bold" }}>Entered on:</Text>
            <Text style={{ color: "gray", fontSize: 17, padding: 7, fontWeight: "normal" }}>{enteredTime}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", marginLeft: 20 }}>
            <Text style={{ color: "black", fontSize: 17, padding: 7, fontWeight: "bold" }}>Exited on:</Text>
            <Text style={{ color: "gray", fontSize: 17, padding: 7, fontWeight: "normal" }}>{exitedTime}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ color: "black", fontSize: 17, padding: 7, fontWeight: "bold" }}>Time Spent:</Text>
            <Text style={{ color: "gray", fontSize: 17, padding: 7, fontWeight: "normal" }}>{timeSpent}mins</Text>
          </View>
          {/* <Text style={{ color: "gray", fontSize: 8, padding: 7 ,fontWeight:"normal"}}>{displayText}</Text> */}
        </ScrollView>
        {/* s */}
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