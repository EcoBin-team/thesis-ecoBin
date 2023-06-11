import React from "react";
import { View, Text, TouchableOpacity } from "react-native"

// styles import
import styles from "../../styles/Depot.styles";

const Depot = ({name, setMapRegion, latitude, longitude}) => {

  return(
    <TouchableOpacity onPress={() => setMapRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })}>
      <View style={styles.container}>
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default Depot