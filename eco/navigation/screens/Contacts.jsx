import { useEffect, useState } from "react"
import { SafeAreaView, Text, View, TextInput, Image } from "react-native"

// components imports
import TextInputWithImage from "../../components/TextInputWithImage/TextInputWithImage"

// styles imports
import styles from "../../styles/Contacts.styles"
import Contact from "../../components/Contact/Contact"

const Contacts = () => {

  const [query,setQuery] = useState("")
  const [contacts,setContacts] = useState([{
    name: "Bella",
    image: "https://firebasestorage.googleapis.com/v0/b/ecobin-d3109.appspot.com/o/profile_pictures%2Fdc4d928a-345a-4edc-b1c0-f1785c0c3cfb?alt=media&token=ff1d0493-60fb-4698-b94c-0afb9eafc410",
    message: "Gas keun gk daur ulang ?asdasdasdasdas",
    time: "5mins"
  },
  {
    name: "second",
    image: "https://firebasestorage.googleapis.com/v0/b/ecobin-d3109.appspot.com/o/profile_pictures%2Fdc4d928a-345a-4edc-b1c0-f1785c0c3cfb?alt=media&token=ff1d0493-60fb-4698-b94c-0afb9eafc410",
    message: "ich will immosasdddddddddddddddasd",
    time: "50mins"
  }
])

  // useEffect(() => {

  // },[])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Chats</Text>
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
          return <Contact key={i} name={e.name} image={e.image} message={e.message} time={e.time}/>
        })}
      </View>

    </SafeAreaView>
  )
}

export default Contacts