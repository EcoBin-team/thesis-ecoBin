import React from "react"
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import ImagePicker from "expo-image-picker"
//import { storage } from "../../../Backend/firebase/FirebaseApp.js"

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
    await axios.post("https://ecobin.onrender.com/users/upload",{
      image: image
    }) // TODO : needs to be finished

  }

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={pickImage}>pick image</TouchableOpacity>
      <TouchableOpacity onPress={uploadImage}>upload image</TouchableOpacity>
    </SafeAreaView>
  )
}

export default ConfirmSignup