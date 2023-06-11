import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TextInput, ScrollView } from "react-native"
import axios from "axios";

// common components imports
import Map from "../../components/Map/Map";
import BackButton from "../../components/BackButton/BackButton";

// secret variable import
import { server_url } from "../../secret";

// styles import
import styles from "../../styles/Nearby.styles";
import Depot from "../../components/Depot/Depot";

const Nearby = () => {

  const [mapRegion,setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [query,setQuery] = useState("") // query that the user has written in the text field
  const [data,setData] = useState([]) // depots fetched from depots table
  const [isLoading,setIsLoading] = useState(false)
  
  useEffect(() => {
    setTimeout(() => {
      searchDepot()
    }, 200) // adding delay so the server doesn't overload
  },[query])

  const searchDepot = async () => {

    setIsLoading(true)

    const response = await axios.get(`${server_url}/depots/searchDepot?query=${query}`)
    setData(response.data)

    setIsLoading(false)
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
          onChangeText={setQuery}
          style={{margin: 20}}
        />

      </View>

      <ScrollView style={{height: "60%"}}>

        {isLoading && <Text> Loading...</Text>}

        {data.map( (e,i) => {
          return <Depot key={i} name={e.name} setMapRegion={setMapRegion} latitude={e.latitude} longitude={e.longitude} />
        })}

        {!data.length && !isLoading && <Text>No</Text>}
        
      </ScrollView>
      
      <Map mapRegion={mapRegion} setMapRegion={setMapRegion}/>
    </SafeAreaView>
  )
}

export default Nearby