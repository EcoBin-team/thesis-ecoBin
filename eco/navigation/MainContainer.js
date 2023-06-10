import React, { createContext, useState,useEffect } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, View } from 'react-native';
import News from '../navigation/screens/News';
import DetailsScreen from './screens/DetailsScreen';
import SettingsScreen from './screens/SettingsScreen';
import Account from './screens/Account';
import Recycle from './screens/Recycle';
import AsyncStorage from "@react-native-async-storage/async-storage";
const NewsName = "News";
const detailsName = "Details";
const RecycleName = 'Recycle';
const settingsName = "Settings";
const AccountName = 'Account';

const Tab = createBottomTabNavigator();

// Create UserContext
const UserContext = createContext();

function MainContainer() {
  const route = useRoute();
  const userData = route.params?.userData;


  return (
    <UserContext.Provider value={userData}>
     
        <Tab.Navigator
          initialRouteName={NewsName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === NewsName) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === detailsName) {
                iconName = focused ? 'list' : 'list-outline';
              } else if (rn === RecycleName) {
                return <CustomRecycleIcon />;
              } else if (rn === settingsName) {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (rn === AccountName) {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'black',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 40, height: 70 }
          }}
        >
          <Tab.Screen name={NewsName} component={News} />
          <Tab.Screen name={detailsName} component={DetailsScreen} />
          <Tab.Screen name={RecycleName} component={Recycle} options={{ tabBarLabel: () => null }} />
          <Tab.Screen name={settingsName} component={SettingsScreen} />
          <Tab.Screen name={AccountName} component={Account} />
        </Tab.Navigator>
      
    </UserContext.Provider>
  );
}

function CustomRecycleIcon() {
  return (
    <View style={{
      backgroundColor: '#6CC51D',
      borderRadius: 50,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      top: -15,
      margin: 5
    }}>
      <Image
        source={require('../assets/recycle.png')}
        style={{ width: 40, height: 40 }}
      />
    </View>
  );
}

export default MainContainer;
export { UserContext };
