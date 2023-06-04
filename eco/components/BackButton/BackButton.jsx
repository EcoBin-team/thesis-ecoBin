import React from "react";
import { Image, TouchableOpacity } from "react-native"

const BackButton = ({fn}) => {
  return (
    <TouchableOpacity onPress={fn} style={{padding: 20, paddingTop: 40}}>
      <Image source={require("../../assets/BackButton.png")}/>
    </TouchableOpacity>
  )
}

export default BackButton