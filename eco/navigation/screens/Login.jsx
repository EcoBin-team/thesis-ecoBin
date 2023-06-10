import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, Alert, ActivityIndicator, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage";

import InputField from "../../components/InputField/InputField";
import BackButton from "../../components/BackButton/BackButton";
import Facebook from "../../components/LoginWith/Facebook";
import Google from "../../components/LoginWith/Google";
import AuthButton from "../../components/AuthButton/AuthButton";
import { server_url } from "../../secret";

import SpinnerStyles from "../../styles/ActivityIndicator.styles";
import styles from "../../styles/Signup.styles";

const Login = () => {

  const navigation = useNavigation()
  const [email,setEmail] = useState("")  // the email the user wrote in the text field
  const [password,setPassword] = useState("") // the email the user wrote in the text field
  const [isLoading,setIsLoading] = useState(false) // loading tracker to activate the activityIndicator when app is loading

  // hiding header
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
},[navigation])


  // login function to set the user's id and token in the localstorage
  const handleSubmit = async () => {
    navigation.navigate('News');
    // regular expressions to check inputs with
    const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // email format checking
    if(!regexpEmail.test(email)){
      return Alert.alert("Login Failed","Please provide a correct email format.")
    }
    
    setIsLoading(true) // Displaying the ActivityIndicator (Spinner)

    // sending an http request to the server to return an id and a token
    const response = await axios.post(`${server_url}/users/login`,{email: email, password: password})
    console.log(response.data)

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
      navigation.navigate("MainContainer",{ userData: response.data }) // navigates to Newspage
    }

    setIsLoading(false) // hiding the ActivityIndicator (Spinner) after the data loads
  }

  return (
    <SafeAreaView>

      <View>

        <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25}}>
          <BackButton fn={() => navigation.navigate("Home")} style={{marginRight: 270, top: 30}}/>
          <Image source={require("../../assets/Earth.png")}/>
          <Text style={{fontFamily: "MontserratBold", color: "#2DCC70", fontSize: 30, marginTop: 20, marginBottom: 20}}>Welcome Back</Text>

          <InputField placeholder="Email address" fn={setEmail}/>
          <InputField placeholder="Password" fn={setPassword} isPassword={true}/>
          <AuthButton text="Sign In" fn={handleSubmit} style={styles.auth}/>
        </View>
      </View>

      {isLoading && 
        <View style={SpinnerStyles.container}>
          <ActivityIndicator size={70} color="09E4AF"/>
        </View>
      }

    </SafeAreaView>
  )
}

export default Login