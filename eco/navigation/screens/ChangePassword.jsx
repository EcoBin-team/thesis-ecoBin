import { useState } from "react"
import { View, Text, SafeAreaView, TextInput, Alert } from "react-native"
import axios from "axios"

// styles imports
import styles from "../../styles/ChangePassword.styles"

// common components imports
import AuthButton from "../../components/AuthButton/AuthButton"

// secret variables imports
import { server_url } from "../../secret"

const ChangePassword = () => {

  const [currentPassword,setCurrentPassword] = useState("")
  const [newPassword,setNewPassword] = useState("")

  const handleSubmit = async () => {

    // if user didn't write anything it will return an alert to inform him
    if(currentPassword === "" || newPassword === ""){
      return Alert.alert("Error", "Please fill all the inputs.")
    }

    // sending http request to modify password
    const response = await axios.post(`${server_url}/users/changePassword`,{
      currentPassword: currentPassword,
      newPassword: newPassword
    })
    console.log(response.data)

    if(response.data === "password updated."){
      return Alert.alert("Success", "Password has been successfully changed.")
    }

    Alert.alert("Error", "error")
  }

  return(
    <SafeAreaView style={{flex: 1, marginTop: 50}}>

      <View style={styles.container}>

        <Text style={styles.title}>Change Password</Text>

        <TextInput
          placeholder="Current password"
          onChangeText={setCurrentPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          placeholder="New password"
          onChangeText={setNewPassword}
          secureTextEntry={true}
          style={styles.input}
        />

        <AuthButton text="Submit" fn={handleSubmit} style={styles.button}/>
        
      </View>
      
    </SafeAreaView>
  )
}

export default ChangePassword