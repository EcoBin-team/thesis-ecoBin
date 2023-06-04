import React from "react";
import { TouchableOpacity, Text } from "react-native"

const AuthButton = ({text,fn,style}) => {

  return (
    <TouchableOpacity style={{backgroundColor: "#09E4AF",display: "flex", alignItems: "center", justifyContent: "center",...style}} onPress={fn}>
      <Text style={{fontFamily: "Montserrat"}}>{text}</Text>
    </TouchableOpacity>
  )
}

export default AuthButton