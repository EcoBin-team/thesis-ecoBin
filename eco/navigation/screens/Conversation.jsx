import axios from "axios"
import { useEffect, useState } from "react"
import { View, Text, SafeAreaView, Image, TouchableOpacity } from "react-native"
import io from "socket.io-client"
import { server_url } from "../../secret"
import styles from "../../styles/Conversation.styles"
import { useNavigation } from "@react-navigation/native"
import Message from "../../components/Chats/Message"

const Conversation = (props) => {

  const socket = io.connect("https://ecobin-socket-server.onrender.com")
  const { conversation, name, image } = props.route.params
  const [messages,setMessages] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    getMessages()
  },[])

  const getMessages = async () => {
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

      <View>
        {messages.map((e,i) => {
          return <Message key={i} message={e.message} time={e.created_at}/>
        })}
      </View>
    </SafeAreaView>
  )

}

export default Conversation