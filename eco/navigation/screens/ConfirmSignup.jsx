import React, { useState } from "react"
import { View, Text, TouchableOpacity, SafeAreaView, Image, StyleSheet } from "react-native"
import * as ImagePicker from 'expo-image-picker'
import axios from "axios"
import { v4 as uuidv4 } from "uuid";
import 'react-native-get-random-values';
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"
import AsyncStorage from "@react-native-async-storage/async-storage";

import { app, storage } from "../../firebase/FirebaseApp"
import Camera from "../../components/Camera/Camera";
import InputField from "../../components/InputField/InputField"
import AuthButton from "../../components/AuthButton/AuthButton"
import SignupSuccess from "../../components/SignupSuccess/SignupSuccess"

import modal from "../../styles/modalBackground.styles"


// this function will let the user pick an image from his phone to upload as a profile picture
const ConfirmSignup = () => {

  //2nd phase of signing up
  const [image,setImage] = useState(null) // image that user will upload as a profile picture
  const [imageUrl,setImageUrl] = useState("")
  const [uploadedImage,setUploadedImage] = useState(false)
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [selected,setSelected] = useState("basic")
  const [isLoading,setIsLoading] = useState(false)
  const [signupSuccess,setsignupSuccess] = useState(false)

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

    uploadImage() // invoking upload function to upload image to firebase storage
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
    setImageUrl(url)

    setUploadedImage(true)
  }

  const handleSubmit = () => {

    const id = AsyncStorage.getItem("currentUser")
    console.log(id)

    axios.put("http://10.0.2.2:3000/users/nextSignup",{
      id: id,
      image: imageUrl,
      phone: phone,
      address: address
    })
  }

  return (
    <SafeAreaView>
      <View style={{justifyContent: "center", alignItems: "center", marginTop: 50}}>
          <Camera fn={pickImage} image={uploadedImage ? imageUrl : null}/>

          <InputField fn={setPhone} placeholder="Phone"/>
          <InputField fn={setAddress} placeholder="Address"/>
          
          <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "#A1A4B2", marginTop: 20, marginBottom: 20}}>select an account type</Text>
          
          <TouchableOpacity onPress={() => setSelected("basic")}>
            <View style={selected === "basic" ? styles.selected : styles.unselected}>
              <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "white"}}>Basic</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSelected("org")}>
            <View style={selected === "org" ? styles.selected : styles.unselected}>
              <Text style={{fontFamily: "MontserratRegular", fontSize: 18, color: "white"}}>Organization</Text>
            </View>
          </TouchableOpacity>

          <AuthButton text="Sign Up" fn={handleSubmit} style={{
              marginBottom: 150,
              width: 300, 
              height: 50.53,
              borderRadius: 38,
            }}/>

      </View>

      {signupSuccess && 
        <>
          <View style={modal.overlay}></View>
          <View style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0
          }}
          >
            <SignupSuccess/>
          </View>
        </>
      }

      {isLoading && 
        <View style={SpinnerStyles.container}>
          <ActivityIndicator size={70} color="09E4AF"/>
        </View>
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  selected: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 190,
    height: 41.3,
    borderRadius: 11,
    backgroundColor: "#09E4AF",
    marginBottom: 20
  },
  unselected: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 170,
    height: 36.96,
    borderRadius: 11,
    backgroundColor: "#555555",
    marginBottom: 20
  }
})

export default ConfirmSignup