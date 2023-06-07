import React, { useCallback } from "react"
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Account from "./navigation/screens/Account"
import AboutMe from "./navigation/screens/AboutMe";
import LaunchPage from './component/LaunchPage';
import MainContainer from './navigation/MainContainer';
import WalkthroughScreen from './component/WalkthroughScreen';
import Login from './navigation/screens/Login';
import Home from './navigation/screens/Home'
import Signup from './navigation/screens/Signup'
const Stack = createStackNavigator();

const App = () => {
  
  const [fontsLoaded] = useFonts({
    Montserrat: require("./fonts/Montserrat-Light.ttf"),
    MontserratBold: require("./fonts/Montserrat-Bold.ttf"),
    MontserratRegular: require("./fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./fonts/Montserrat-Medium.ttf")
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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LaunchPage"
          component={LaunchPage}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />

         <Stack.Screen
          name="WalkthroughScreen"
          component={WalkthroughScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainContainer"
          component={MainContainer}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="AboutMe"
          component={AboutMe}
          options={{
            title: 'About Me',
             headerShown: false }}
        />
         <Stack.Screen
          name="Account"
          component={Account}
          options={{
            title: 'Account',
             headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

