
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import LaunchPage from './component/LaunchPage';
import MainContainer from './navigation/MainContainer';
import WalkthroughScreen from './component/WalkthroughScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LaunchPage"
          component={LaunchPage}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

