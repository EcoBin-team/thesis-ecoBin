import { useEffect, useState } from "react"
import { SafeAreaView, Text, View, TextInput, Image } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

// components imports
import TextInputWithImage from "../../components/TextInputWithImage/TextInputWithImage"

// styles imports
import styles from "../../styles/Contacts.styles"
import Contact from "../../components/Contact/Contact"

// secret variables file
import { server_url } from "../../secret"

const Contacts = () => {

  const [query,setQuery] = useState("")
  const [contacts,setContacts] = useState([])
  const currentUser = AsyncStorage.getItem("currentUser")

  useEffect(() => {
    getConversations()
  },[])

  const getConversations = async () => {

    const response = await axios.get(`${server_url}/contacts/getContacts/${currentUser.id}`)
    setContacts(response.data)

  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <View>
        <TextInputWithImage
          fn={setQuery}
          placeholder="Search"
          style={styles.search}
          image={require("../../assets/ChatSearch.png")}
        />
      </View>

      <View>
        {contacts.map((e,i) => {
          return <Contact key={i}
            conversation={e.id} 
            name={e.user.name} 
            image={e.user.image} 
            message={e.chat.message} 
            time={e.chat.created_at}/>
        })}
      </View>

    </SafeAreaView>
  )
}

export default Contacts