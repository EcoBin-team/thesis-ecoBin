import { View, Text } from "react-native"
import moment from "moment/moment"

// styles imports
import styles from "../../styles/Message.styles"

const Message = ({ message, time }) => {

  const newTime = moment(time).format("LT")

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>{newTime}</Text>
    </View>
  )
}

export default Message