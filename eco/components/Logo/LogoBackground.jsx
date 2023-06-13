import { Image } from 'react-native'
import React from 'react'

const LogoBackground = ({ signup, login }) => {
  return (
    <Image 
      source={require("../../assets/LogoBackground.png")}
      style={{position: "absolute", bottom: signup ? 360 : (login ? 310 : 190)}}/>
  )
}

export default LogoBackground