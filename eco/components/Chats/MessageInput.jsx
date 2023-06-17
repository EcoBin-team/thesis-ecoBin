import { useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import axios from "axios"

// styles imports
import styles from "../../styles/MessageInput.styles"

// secret variables imports
import { server_url } from "../../secret"

const MessageInput = ({ currentUser, conversation, socket }) => {

  const [text,setText] = useState("")

  const sendMessage = async () => {
    if(text !== ""){
      const messageDetails = {
        sender: currentUser,
        conversation: conversation,
        message: text
      }
      await axios.post(`${server_url}/conversations/send`, messageDetails)
      await socket.emit("send_message", messageDetails)
      setText("")
    }
  }

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Type a message here"
        onChangeText={setText}
        value={text}
      />

      <TouchableOpacity onPress={sendMessage}>
        <Image source={require("../../assets/Send.png")} style={styles.send}/>
      </TouchableOpacity>
    </View>
  )
}

export default MessageInput