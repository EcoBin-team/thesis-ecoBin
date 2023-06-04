import React, { useCallback } from 'react';
import { SplashScreen } from "expo-router"
import { useFonts } from 'expo-font';
import { MainContainer, StackNavigator } from './navigation/MainContainer';

function App() {

  // importing the fonts
  const [fontsLoaded] = useFonts({
    Montserrat: require("./fonts/Montserrat-Light.ttf"),
    MontserratBold: require("./fonts/Montserrat-Bold.ttf"),
    MontserratRegular: require("./fonts/Montserrat-Regular.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      SplashScreen.hideAsync()
    }
  })

  if(!fontsLoaded){
    return null
  }

  onLayoutRootView()

  return (
    <>
      {/* <StackNavigator/> */}
      <MainContainer/>
    </>
  );
}

export default App;