import React from "react";
import { TouchableOpacity, Text } from "react-native"

const AuthButton = ({text,fn}) => {

  return (
    <TouchableOpacity style={{backgroundColor: "#09E4AF"}} onPress={fn}>
      <Text style={{fontFamily: "Montserrat"}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default AuthButton