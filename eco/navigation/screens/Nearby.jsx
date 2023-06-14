
import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, ScrollView, Alert,TouchableOpacity } from "react-native"
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';


// common components imports
import Map from "../../components/Map/Map";
import BackButton from "../../components/BackButton/BackButton";

// secret variable import
import { server_url } from "../../secret";


// styles import
import styles from "../../styles/Nearby.styles";
import Depot from "../../components/Depot/Depot";

const Nearby = (navigation) => {


  const [mapRegion,setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const [userRegion,setUserRegion] = useState({
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

  // search function to filter depots according to the query written by the user
  const searchDepot = async () => {

    setIsLoading(true) // showing loading indicator

    const response = await axios.get(`${server_url}/depots/searchDepot?query=${query}`)
    setData(response.data) // sets data state to the returned depots from the server

    setIsLoading(false) // hiding loading indicator
  }

  return(
    <SafeAreaView>
      
      <View style={{backgroundColor: "white"}}>

        <View style={styles.upperContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.headerIcon} name="arrow-back" size={24} color="#000000" />
      </TouchableOpacity>
          <Text style={styles.nearby}>Nearby</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search Depots"
            onChangeText={setQuery}
            style={styles.search}
          />
          <Icon name="search" size={20} style={styles.searchIcon}/>
        </View>

      </View>

      <ScrollView style={{height: "60%"}} contentContainerStyle={{flexGrow: 1}}>
        
        <View style={styles.scrollContainer}>
          {isLoading && <Text style={styles.loadingText}> Finding place...</Text>}
          {!data.length && !isLoading && <Text style={styles.placeholderScroll}>Nearby depot center</Text>}
        </View>

        {data.map( (e,i) => {
          return <Depot
            key={i}
            name={e.name}
            logo={e.logo}
            setMapRegion={setMapRegion}
            latitude={e.latitude}
            longitude={e.longitude} />
        })}

      </ScrollView>
      
      <Map mapRegion={mapRegion} setMapRegion={setMapRegion} userRegion={userRegion} setUserRegion={setUserRegion}/>
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
  headerIcon:{
    left: 0,
  },
  nearby: {
    fontFamily: "MontserratBold",
    fontSize: 30,
    color: "#2DCC70"
  }
})


export default Nearby