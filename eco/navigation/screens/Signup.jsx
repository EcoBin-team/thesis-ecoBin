import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ActivityIndicator, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CheckBox from "@react-native-community/checkbox" // TODO: add a checkbox

import InputField from "../../components/InputField/InputField";
import BackButton from "../../components/BackButton/BackButton";
import Facebook from "../../components/LoginWith/Facebook";
import Google from "../../components/LoginWith/Google";
import AuthButton from "../../components/AuthButton/AuthButton";

import SpinnerStyles from "../../styles/ActivityIndicator.styles"

const Signup = () => {

  const navigation = useNavigation()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isChecked,setIsChecked] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const regexpName = /[a-z]/gi

  const handleSubmit = async () => {

    setIsLoading(true)

    // sending an http request to the server to create the account
    const response = await axios.post("http://10.0.2.2:3001/users/signup", {
      email: email,
      password: password,
      name: name,
    })

    // alert if name format is incorrect
    if(!regexpName.test(name)){
      Alert.alert("Signup Failed", "Please provide a correct name.")
    }
    
    // alert when email format is not correct
    else if(response.data === "auth/invalid-email"){
      Alert.alert("Signup Failed", "Please provide a correct email format.")
    }

    // alert when password written is weak
    else if(response.data === "auth/weak-password"){
      Alert.alert("Signup Failed", "Please provide a stronger password.")
    }
    
    else{
      navigation.navigate("Home") // navigates to homepage
    }

    setIsLoading(false) // hiding the ActivityIndicator (Spinner) after the data loads
    
  }

  return (
    <SafeAreaView>
      <View>

        <BackButton fn={() => navigation.navigate("Home")}/>

        <View style={{
        }}>
          <Image source={require("../../assets/Earth.png")} />
          <Text>Welcome Back</Text>


          <Facebook text="Sign up With FACEBOOK"/>
          <View style={{marginTop: 20}}>
            <Google text="Sign up With GOOGLE"/>
          </View>

            <View style={SpinnerStyles.container}>
              {isLoading && <ActivityIndicator size={70} color="09E4AF"/>}
            </View>
          <Text style={{fontFamily: "Montserrat"}}>or SIGN UP WITH EMAIL</Text>

          <InputField placeholder="Name" fn={setName}/>
          <InputField placeholder="Email address" fn={setEmail}/>
          <InputField placeholder="Password" fn={setPassword} isPassword={true}/>
          
          <View>
            <Text>I have read the privacy policy.</Text>
          </View>

          <AuthButton text="Sign Up" fn={handleSubmit}/>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Signup