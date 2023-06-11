import React, { useState, useEffect } from "react";
import { View, Text, Alert, StyleSheet, FlatList } from "react-native"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"
import axios from "axios"

// secret variable import
import { server_url } from "../../secret"

import depot from "../../assets/depot.png"

const Map = ({mapRegion,setMapRegion}) => {

  const [depots,setDepots] = useState([])

  useEffect(() => {
    userLocation() // getting user's location with gps
    fetchDepots() // getting depots from database
  },[])

  const fetchDepots = async () => {
    const response = await axios.get(`${server_url}/depots/getAll`)
    setDepots(response.data)
  }

  const userLocation = async () => {

    var { status } = await Location.requestForegroundPermissionsAsync()

    if(status !== "granted"){
      Alert.alert("Location access denied", "Location access revoked.")
    }

    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
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
        <Marker coordinate={mapRegion} title="You"/>

        {depots.map( (e,i) => <Marker key={i} coordinate={{
          latitude: e.latitude,
          longitude: e.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
          image={depot}
          title={e.name}
        />)}

      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "65%",
  }
})

export default Map