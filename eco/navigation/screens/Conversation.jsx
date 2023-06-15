import { View, Text, SafeAreaView } from "react-native"
import io from "socket.io-client"

const Conversation = () => {

  const socket = io.connect("https://ecobin-socket-server.onrender.com")

  return(
    <SafeAreaView style={{flex: 1, marginTop: 50}}>
      <Text>Hello</Text>
    </SafeAreaView>
  )

}

export default Conversation