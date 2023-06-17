import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native"
import io from "socket.io-client"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

// secret variables file import
import { server_url, socket_url } from "../../secret"

// styles imports
import styles from "../../styles/Conversation.styles"

// common components imports
import Message from "../../components/Chats/Message"
import MessageInput from "../../components/Chats/MessageInput"

const Conversation = (props) => {

  const socket = io.connect(socket_url)
  const { conversation, name, image } = props.route.params
  const [messages,setMessages] = useState([])
  const [currentUser,setCurrentUser] = useState({})
  const navigation = useNavigation()
  const scrollViewRef = useRef()

  useEffect(() => {
    socket.emit("join_room", conversation)
    getMessages() // message fetching function getting invoked on each conversation
  },[])

  useEffect(() => {
    socket.on("receive_message", () => getMessages()) // watching for message with socket to re-render messages if a new message gets received
  },[socket])

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

      <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
        {messages.map((e,i) => {
          return <Message key={i} currentUser={currentUser.id} sender={e.sender} message={e.message} time={e.created_at}/>
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <MessageInput currentUser={currentUser.id} conversation={conversation} socket={socket}/>
      </View>

    </SafeAreaView>
  )

}

export default Conversation