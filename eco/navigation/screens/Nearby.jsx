import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, Alert } from "react-native"
import axios from "axios";

// common components imports
import Map from "../../components/Map/Map";
import BackButton from "../../components/BackButton/BackButton";

// secret variable import
import { server_url } from "../../secret";

const Nearby = () => {

  const [query,setQuery] = useState("")
  const [data,setData] = useState([])

  const onQueryChange = (text) => {
    setQuery(text)
    searchDepot()
  }

  const searchDepot = async () => {

    const response = await axios.get(`${server_url}/depots/searchDepot?${query}`)
    setData(response.data)
  }

  return(
    <SafeAreaView>
      
      <View style={{backgroundColor: "white"}}>

        <View style={styles.upperContainer}>
          <BackButton style={{margin: 15}}/>
          <Text style={styles.nearby}>Nearby</Text>
        </View>

        <TextInput
          placeholder="Search Depots"
          onChangeText={text => onQueryChange(text)}
          style={{margin: 20}}
        />

      </View>

      <ScrollView>
        {data.length > 0 && data.map( (e,i) => {
          return <Text key={i}>{e}</Text>
        })}
      </ScrollView>
      
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