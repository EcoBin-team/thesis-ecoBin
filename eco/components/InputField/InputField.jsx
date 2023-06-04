import React from "react";
import { TextInput } from "react-native"

const InputField = ({fn,placeholder,isPassword}) => {
  
  return (
    <TextInput 
      placeholder={placeholder}
      onChangeText={fn}
      secureTextEntry={isPassword}
    />
  )
}

export default InputField