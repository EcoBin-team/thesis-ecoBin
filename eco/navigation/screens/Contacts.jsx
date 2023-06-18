import { useEffect, useState } from "react"
import { View, SafeAreaView, Text, Image, TouchableOpacity } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

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
  const navigation = useNavigation()

  useEffect(() => {
    getConversations()
  },[])

  const getConversations = async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem("currentUser"))
    const response = await axios.get(`${server_url}/contacts/getContacts/${currentUser.id}`)
    setContacts(response.data)
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{flexDirection: "row"}}>
      
        <Text style={styles.header}>Chats</Text>

        <TouchableOpacity style={styles.createChatButton} onPress={() => navigation.navigate("CreateConversation")}>
          <Image source={require("../../assets/CreateChat.png")} style={styles.createChat}/>
        </TouchableOpacity>
      
      </View>
      
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