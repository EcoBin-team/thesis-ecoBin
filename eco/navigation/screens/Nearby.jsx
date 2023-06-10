import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native"

import Map from "../../components/Map/Map";
import BackButton from "../../components/BackButton/BackButton";

const Nearby = () => {

  return(
    <SafeAreaView>
      
      <View style={{backgroundColor: "white"}}>
        <View style={styles.upperContainer}>
          <BackButton style={{margin: 15}}/>
          <Text style={styles.nearby}>Nearby</Text>
        </View>
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