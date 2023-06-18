import { useEffect, useState } from "react"
import { View, SafeAreaView, ScrollView } from "react-native"
import axios from "axios"

// components imports
import TextInputWithImage from "../../components/TextInputWithImage/TextInputWithImage"
import User from "../../components/Chats/User"

// styles imports
import styles from "../../styles/CreateConversation.styles"

// secret variables imports
import { server_url } from "../../secret"
import AsyncStorage from "@react-native-async-storage/async-storage"

const CreateConversation = () => {

  const [query,setQuery] = useState("")
  const [users,setUsers] = useState([])

  useEffect(() => {
    searchUsers()
  },[query])

  // search functions that displays users according to what the user typed in the search bar
  const searchUsers = async () => {
    // if there is a query the search will start
    const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"))

    if(query.length){
      const response = await axios.get(`${server_url}/users/search?query=${query}`)

      // filtering the currentUser out of the array
      const filteredUsers = response.data.filter(e => e.id !== currentUser.id)

      setUsers(filteredUsers)
    }
  }

  // function that created a new row in the conversations table
  const startConversation = async (id) => {
    console.log(id)
    const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"))
    // creating a new conversation between the user logged in and the user pressed
    const response = await axios.post(`${server_url}/conversations/create`,{
      users: [currentUser.id,id]
    })
    console.log("hello")
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInputWithImage
        fn={setQuery}
        placeholder="Search for users"
        style={styles.search}
        image={require("../../assets/UserSearch.png")}
      />

      <ScrollView>
        {users.map((e,i) => {
          return <User key={i} id={e.id} name={e.name} image={e.image} startConversation={startConversation}/>
        })}
      </ScrollView>

    </SafeAreaView>
  )
}

export default CreateConversation