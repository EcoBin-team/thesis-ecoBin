import React, { useState } from "react";
import { View, Text, SafeAreaView, Image, ActivityIndicator, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import CheckBox from "@react-native-community/checkbox" // TODO: add a checkbox

// components imports
import InputField from "../../components/InputField/InputField";
import BackButton from "../../components/BackButton/BackButton";
import AuthButton from "../../components/AuthButton/AuthButton";
import SignupSuccess from "../../components/SignupSuccess/SignupSuccess";

// styles imports
import SpinnerStyles from "../../styles/ActivityIndicator.styles"
import modal from "../../styles/modalBackground.styles"
import ConfirmSignup from "./ConfirmSignup";

const Signup = () => {

  // hiding header
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false })
},[navigation])

  const navigation = useNavigation()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isChecked,setIsChecked] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [done,setDone] = useState(false)
  const [signupSuccess,setSignupSuccess] = useState(false)
  const regexpName = /[a-z]/gi

  const handleSubmit = async () => {

    setIsLoading(true)

    // sending an http request to the server to create the account
    const response = await axios.post("https://ecobin.onrender.com/users/signup", {
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
      setSignupSuccess(true) // changes a state to show the sign up success modal
    }

    setIsLoading(false) // hiding the ActivityIndicator (Spinner) after the data loads

  }

  return (
    <SafeAreaView>
      {done ?
      
      <>
        <View>

          <View style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25}}>
            <BackButton fn={() => navigation.navigate("Home")} style={{top: 30}}/>
            <Image source={require("../../assets/Earth.png")}/>
            <Text style={{fontFamily: "MontserratBold", color: "#2DCC70", fontSize: 26, marginTop: 20, marginBottom: 20}}>Create Your Account</Text>

            <InputField placeholder="Full Name" fn={setName}/>
            <InputField placeholder="Email address" fn={setEmail}/>
            <InputField placeholder="Password" fn={setPassword} isPassword={true}/>
            <AuthButton text="Sign Up" fn={handleSubmit} style={{
              marginTop: 40,
              marginBottom: 150,
              width: 300, 
              height: 50.53,
              borderRadius: 38,
            }}/>
          </View>
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
      </>
    :
    <ConfirmSignup/>
    }
          
    </SafeAreaView>
  )
}

export default Signup