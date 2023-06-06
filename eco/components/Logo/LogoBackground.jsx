import { Image } from 'react-native'
import React from 'react'

const LogoBackground = () => {
  return (
    <Image source={require("../../assets/LogoBackground.png")} style={{position: "absolute", bottom: 190}}/>
  )
}

export default LogoBackground