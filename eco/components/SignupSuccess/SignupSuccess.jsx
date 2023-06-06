import React from "react"
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native"

const SignupSuccess = () => {

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/success.png")}/>
      <TouchableOpacity style={{
        borderColor: "#6CB28E",
        borderWidth: 2,
        borderRadius: 11,
        width: 218,
        height: 55,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Text style={{
          fontFamily: "MontserratBold",
          color: "#6CB28E",
          fontSize: 20
        }}
        >
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default SignupSuccess