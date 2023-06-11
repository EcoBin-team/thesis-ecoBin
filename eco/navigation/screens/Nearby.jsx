import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput } from "react-native"

import Map from "../../components/Map/Map";
import BackButton from "../../components/BackButton/BackButton";

const Nearby = () => {

  const [query,setQuery] = useState("")

  return(
    <SafeAreaView>
      
      <View style={{backgroundColor: "white"}}>

        <View style={styles.upperContainer}>
          <BackButton style={{margin: 15}}/>
          <Text style={styles.nearby}>Nearby</Text>
        </View>

        <TextInput
          placeholder="Search Depots"
          onChangeText={setQuery}
          style={{margin: 20}}
        />

      </View>

      <View>
        
      </View>
      
      <Map/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35
  },
  nearby: {
    fontFamily: "MontserratBold",
    fontSize: 30,
    color: "#2DCC70"
  }
})

export default Nearby