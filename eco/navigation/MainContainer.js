import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, View } from 'react-native';
// Screens
import News from '../navigation/screens/News';
import DetailsScreen from './screens/DetailsScreen';
import Search from './screens/Search';
import Account from './screens/Account';
import Recycle from './screens/Recycle';
import DepotProfile from './screens/DepotProfile';

// Screen names
const NewsName = "News";
const detailsName = "Details";
const RecycleName = 'Recycle';
const SearchName = "Search";
const AccountName = 'Account';
const DepotName = "DepotProfile"

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
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
          } else if (rn === SearchName) {
            iconName = focused ? 'Search' : 'Search-outline';
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
        style: { padding: 40, height: 70 }
      }}>
      <Tab.Screen name={NewsName} component={News} />
      <Tab.Screen name={detailsName} component={DetailsScreen} />
      <Tab.Screen name={RecycleName} component={Recycle} />
      <Tab.Screen name={SearchName} component={Search} />
      <Tab.Screen name={AccountName} component={Account} />
      <Tab.Screen name={DepotName} component={DepotProfile} />
    </Tab.Navigator>
  );
}

function CustomRecycleIcon() {
  return (
    <View style={{
      backgroundColor: '#09E4AF',
      borderRadius: 50,
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      top: -10,
      margin: 5
    }}>
      <Image
        source={require('../assets/recycle.png')}
        style={{ width: 50, height: 50 }}
      />
    </View>
  );
}

export default MainContainer;

