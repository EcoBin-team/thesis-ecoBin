import React from 'react';
import { Image, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack"
import Ionicons from 'react-native-vector-icons/Ionicons';
// Screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import Account from './screens/Account'
import Recycle from './screens/Recycle'
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
//Screen names
const homeName = "Home";
const detailsName = "Details";
const RecycleName = 'Recycle'
const settingsName = "Settings";
const AccountName = 'Account'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator()

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === RecycleName) {
              return <CustomRecycleIcon />;
            }else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (rn === AccountName) {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#09E4AF',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 40, height: 70}
        }}>

        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={detailsName} component={DetailsScreen} />
        <Tab.Screen name={RecycleName} component={Recycle} />
        <Tab.Screen name={settingsName} component={SettingsScreen} />
        <Tab.Screen name={AccountName} component={Account} />
        
      </Tab.Navigator>

    </NavigationContainer>
  );
}

const StackNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function CustomRecycleIcon() {
  return (
    <View style={{ backgroundColor: '#09E4AF', 
    borderRadius: 50  , 
    
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    top:-10,
    margin:5 }}>
    <Image
      source={require('../assets/recycle.png')}
      style={{ width: 50, height: 50}}
    />
  </View>
  );
}

export { MainContainer, StackNavigator }