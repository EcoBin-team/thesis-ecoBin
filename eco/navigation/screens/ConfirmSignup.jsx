import React, { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import 'react-native-get-random-values';
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"

import { app, storage } from "../../firebase/FirebaseApp"
import Camera from "../../components/Camera/Camera";
import InputField from "../../components/InputField/InputField"


// this function will let the user pick an image from his phone to upload as a profile picture
const ConfirmSignup = () => {

  //2nd phase of signing up
  const [image,setImage] = useState(null) // image that user will upload as a profile picture
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [selected,setSelected] = useState("basic")

  const pickImage = async () => {
    // allowing the user pick an image as a profile picture
    var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 0.3
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  // this function sends a post request to the server to upload the image picked by the user
  const uploadImage = async () => {

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
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
    })
  
    const fileRef = ref(storage, `profile_pictures/${uuidv4()}`)
    const result = await uploadBytes(fileRef, blob)

    blob.close()

    const url = await getDownloadURL(fileRef)

  }

  return (
    <SafeAreaView>
      <View style={{justifyContent: "center", alignItems: "center", marginTop: 50}}>
          <Camera fn={pickImage}/>

          <InputField placeholder="Phone"/>
          <InputField placeholder="Address"/>
          
          <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "#A1A4B2", marginTop: 10}}>select an account type</Text>
          
          <TouchableOpacity>
            <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: 170, height: 36.96, borderRadius: 11, backgroundColor: selected==="basic" ? "#09E4AF" : "#555555"}}>
              <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "white"}}>Basic</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{display: "flex", justifyContent: "center", alignItems: "center", width: 170, height: 36.96, borderRadius: 11, backgroundColor: selected==="org" ? "#09E4AF" : "#555555"}}>
              <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "white"}}>Organization</Text>
            </View>
          </TouchableOpacity>
      
      </View> 
    </SafeAreaView>
  )
}

export default ConfirmSignup