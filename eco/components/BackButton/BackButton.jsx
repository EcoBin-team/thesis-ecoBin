import React from "react";
import { Image, TouchableOpacity } from "react-native"

const BackButton = ({fn,style}) => {
  return (
    <TouchableOpacity onPress={fn}>
      <Image source={require("../../assets/BackButton.png")} style={{marginRight: 270, ...style}}/>
    </TouchableOpacity>
  )
}

export default BackButton