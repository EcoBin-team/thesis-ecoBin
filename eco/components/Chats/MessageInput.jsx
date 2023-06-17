import { useState } from "react"
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native"
import axios from "axios"

// styles imports
import styles from "../../styles/MessageInput.styles"

const MessageInput = ({ currentUser, conversation }) => {

  const [text,setText] = useState("")

  const sendMessage = async () => {
    if(text !== ""){
      const response = await axios.post("http://localhost:3000/conversations/send",{
        sender: currentUser,
        conversation: conversation,
        message: text
      })
    }

  }

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Type a message here"
      />

      <TouchableOpacity onPress={sendMessage}>
        <Image source={require("../../assets/Send.png")} style={styles.send}/>
      </TouchableOpacity>
    </View>
  )
}

export default MessageInput