import React, { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import 'react-native-get-random-values';
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"
import ImagePicker from "expo-image-picker"
import { app, storage } from "../../firebase/FirebaseApp"

// this function will let the user pick an image from his phone to upload as a profile picture
const ConfirmSignup = () => {

  //2nd phase of signing up
  const [image,setImage] = useState(null) // image that user will upload as a profile picture

  const pickImage = async () => {
    // allowing the user pick an image as a profile picture
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  // this function sends a post request to the server to upload the image picked by the user
  const uploadImage = async () => {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response)
      }
      xhr.onerror = function (e) {
        console.log(e)
        reject(new TypeError("Network request failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", image, true)
      xhr.send(null)
    });
  
    const folderRef = ref(storage, "profile_pictures")
    const fileRef = ref(folderRef, uuidv4())
    const result = await uploadBytes(fileRef, blob)

    blob.close();

    const url = await getDownloadURL(fileRef);

  }

  return (
    <SafeAreaView>
      <View style={{justifyContent: "center", alignItems: "center", marginTop: 50}}>
        <TouchableOpacity onPress={pickImage}>
          <Text>Pick Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage}>
          <Text>Upload Image</Text>
        </TouchableOpacity>
      </View> 
    </SafeAreaView>

  )
}

export default ConfirmSignup