import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, Alert, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

import InputField from "../../components/InputField/InputField";
import BackButton from "../../components/BackButton/BackButton";
import Facebook from "../../components/LoginWith/Facebook";
import Google from "../../components/LoginWith/Google";
import AuthButton from "../../components/AuthButton/AuthButton";

import SpinnerStyles from "../../styles/ActivityIndicator.styles";

const Login = () => {

  const navigation = useNavigation()
  const [email,setEmail] = useState("")  // the email the user wrote in the text field
  const [password,setPassword] = useState("") // the email the user wrote in the text field
  const [isLoading,setIsLoading] = useState(false) // loading tracker to activate the activityIndicator when app is loading

  // login function to set the user's id and token in the localstorage
  const handleSubmit = async () => {

    // regular expressions to check inputs with
    const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // email format checking
    if(!regexpEmail.test(email)){
      return Alert.alert("Login Failed","Please provide a correct email format.")
    }
    
    setIsLoading(true) // Displaying the ActivityIndicator (Spinner)

    // sending an http request to the server to return an id and a token
    const response = await axios.post(`http://10.0.2.2:3001/users/login`,{email: email, password: password})

    // alert if email written is not found in the database
    if(response.data === "auth/user-not-found"){
      Alert.alert("Login Failed","Email doesn't exist.")
    }

    // alert if password written is incorrect
    else if(response.data === "auth/wrong-password"){
      Alert.alert("Login Failed", "Wrong Password.")
    }

    else{
      await AsyncStorage.setItem("currentUser",JSON.stringify(response.data)) // storing the id and token in the local storage
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


          <Facebook text="Login With FACEBOOK"/>
          <View style={{marginTop: 20}}>
            <Google text="Login With GOOGLE"/>
          </View>

            <View style={SpinnerStyles.container}>
              {isLoading && <ActivityIndicator size={70} color="09E4AF"/>}
            </View>
          <Text style={{fontFamily: "Montserrat"}}>or LOGIN WITH EMAIL</Text>

          <InputField placeholder="Email address" fn={setEmail}/>
          <InputField placeholder="Password" fn={setPassword} isPassword={true}/>

          <AuthButton text="Sign In" fn={handleSubmit}/>

        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login