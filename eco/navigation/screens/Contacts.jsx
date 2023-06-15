import { useState } from "react"
import { SafeAreaView, Text, View, TextInput } from "react-native"

// styles imports
import styles from "../../styles/Contacts.styles"

const Contacts = () => {

  const [query,setQuery] = useState("")
  const [contacts,setContacts] = useState([])

  // TODO: useEffect to get all contacts of currentuser

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chats</Text>
      <TextInput
        onChangeText={setQuery}
        placeholder="Search"
        style={styles.search}
      />
    </SafeAreaView>
  )
}

export default Contacts