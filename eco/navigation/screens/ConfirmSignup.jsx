import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import ImagePicker from "expo-image-picker"
import { storage } from "../../../Backend/firebase/FirebaseApp"

const ConfirmSignup = () => {

  //2nd phase
  const [image,setImage] = useState(null) // image that user will upload as a profile picture

  const pickImage = async () => {
    // letting the user pick an image as a profile picture
    var picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    })

    const source = {uri: picked.uri}
    setImage(source)
  }

  const uploadImage = async () => {
    const response = await fetch(image.uri)
    const blob = await response.blob()
    const filename = image.uri.substring(image.uri.lastIndexOf("/")+1)
    var ref = storage.ref().child(filename).put(blob)

    try{
      await ref
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <View>

    </View>
  )
}

export default ConfirmSignup