import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Alert, StyleSheet } from "react-native"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"

const Map = () => {

  const [mapRegion,setMapRegion] = useState({
    latitude: 37.77825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })

  useEffect(() => {
    userLocation()
  },[])

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()

    if(status !== "granted"){
      Alert.alert("Location access denied", "Location access revoked.")
    }

    var location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })

  }

  return (
    <View>
      <MapView
        style={styles.map}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title="Marker"/>
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%"
  }
})

export default Map