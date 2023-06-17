import axios from "axios"
import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native"
import io from "socket.io-client"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// secret variables file import
import { server_url } from "../../secret"

// styles imports
import styles from "../../styles/Conversation.styles"

// common components imports
import Message from "../../components/Chats/Message"
import MessageInput from "../../components/Chats/MessageInput"

const Conversation = (props) => {

  const socket = io.connect("https://ecobin-socket-server.onrender.com")
  const { conversation, name, image } = props.route.params
  const [messages,setMessages] = useState([])
  const [currentUser,setCurrentUser] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    socket.emit("join_room", conversation)
    getMessages() // message fetching function getting invoked on each conversation
  },[])

  // function that fetched all the messages of a conversation that user pressed on
  const getMessages = async () => {
    setCurrentUser(JSON.parse(await AsyncStorage.getItem("currentUser")))
    const response = await axios.get(`${server_url}/conversations/getMessages/${conversation}`)
    setMessages(response.data)
  }

  return(
    <SafeAreaView style={{flex: 1, marginTop: 50}}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Contacts")}>
          <Image source={require("../../assets/ChatBack.png")}/>
        </TouchableOpacity>
        <Image source={{uri: image}} style={styles.image}/>
        <Text style={styles.name}>{name}</Text>
      </View>

      <ScrollView>
        {messages.map((e,i) => {
          return <Message key={i} currentUser={currentUser.id} sender={e.sender} message={e.message} time={e.created_at}/>
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <MessageInput currentUser={currentUser.id} conversation={conversation}/>
      </View>

    </SafeAreaView>
  )

}

export default Conversation