import { View, Text, Image, TouchableOpacity } from "react-native"

import styles from "../../styles/Contact.styles"

const Contact = ({ conversation, image, name, message, time }) => {

  return (
    <TouchableOpacity style={{display: "flex", flexDirection: "row"}}>

      <View>
        <Image source={{uri: image}} style={styles.image}/>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.message}>{message.length > 25 ? `${message.slice(0,22)}...`: message}</Text>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.time} numberOfLines={1}>{time}</Text>
      </View>

    </TouchableOpacity>
  )
}

export default Contact