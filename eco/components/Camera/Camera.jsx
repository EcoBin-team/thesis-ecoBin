import React from "react"
import { View, TouchableOpacity, Image } from "react-native"

const Camera = ({fn}) => {
  
  return(
    <View>
      <Image source={require("../../assets/ImageContainer.png")}/>
      <TouchableOpacity style={{
        position: "absolute",
        top: 150,
        left: 140
      }}
        onPress={fn}
      >
        <Image source={require("../../assets/camera.png")}/>
      </TouchableOpacity>
    </View>
  )
}

export default Camera