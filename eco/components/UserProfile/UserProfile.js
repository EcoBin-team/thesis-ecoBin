import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserProfile = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch user data using Axios
    axios
      .get(`https://ecobin.onrender.com/users/user/${userId}`)
      .then(response => {
        setUserData(response.data);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      })
      .catch(error => {
        console.error(error, userId);
      });
  }, [userId]);

  if (!userData) {
    return <Text>Loading...</Text>;
  }
  const handleFollowUser = async () => {
    try {
      // Retrieve the current user's ID from AsyncStorage
      const currentUserData = await AsyncStorage.getItem('currentUser');
      const currentUser = JSON.parse(currentUserData);
      const currentUserId = currentUser.id;
  
      // Make a POST request to follow the user
      axios
        .post(`https://1922.168.131.198:3000/users/${currentUserId}/follow/${userId}`)
        .then(response => {
          // Handle the success response as needed
          console.log('User followed successfully');
        })
        .catch(error => {
          // Handle the error response as needed
          console.error('Error following user:', error);
        });
    } catch (error) {
      console.error('Error retrieving current user:', error);
    }
  };
  
  
  

  const renderProfileContainer = () => {
    if (!userData) {
      return <Text>Loading...</Text>;
    }
    
  const followersCount = userData.followers ? userData.followers.length : 0;
  const followingCount = userData.following ? userData.following.length : 0;

    return (
      <View style={styles.profileContainer}>
        <Image source={{ uri: userData.image }} style={styles.image} />
        <Text style={styles.name}>{userData.name}</Text>
        <View style={styles.followers}>
        <Text style={styles.infoLabel}>Followers</Text>
        <Text style={styles.infoValue}>{followersCount}</Text>
      </View>
      <View style={styles.following}>
        <Text style={styles.infoLabel}>Following</Text>
        <Text style={styles.infoValue}>{followingCount}</Text>
      </View>
        <View >
        <TouchableOpacity onPress={handleFollowUser}>
          <Ionicons
            name="person-add-outline"
            size={30}
            color="lightgreen"
            style={styles.followIcon}
          />
        </TouchableOpacity>
        </View>
        <Ionicons
          name="paper-plane-outline"
          size={30}
          color="lightgreen"
          onPress={() => {
            navigation.navigate('Contacts');
          }}
          style={styles.chatIcon}
        />
      </View>
    );
  };
  

  const renderInfoContainer = () => {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Role:</Text>
          <Text style={styles.infoValue2}>{userData.role}</Text>
        </View>
      </View>
      
    );
  };
  const renderInfoContainer2 = () => {
    return (
      <View style={styles.infoContainer2}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Balance:</Text>
          <Text style={styles.infoValue2}>{userData.balance}</Text>
        </View>
      </View>
      
    );
  };
  const renderInfoContainer3 = () => {
    return (
      <View style={styles.infoContainer3}>
         <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Phone Number:</Text>
          <Text style={styles.infoValue2}>{userData.phone}</Text>
        </View>
      </View>
      
    );
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {renderProfileContainer()}
      {renderInfoContainer()}
      {renderInfoContainer2()}
      {renderInfoContainer3()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    width:350,
    top: -70,
    
  },
  infoContainer: {
    marginTop : -50 ,
    marginBottom : 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width : 350
  },
  infoContainer2: {
    marginBottom : 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width : 350
  },
  infoContainer3: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width : 350
  },
  image: {
    top : 20 ,
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  role: {
    top:120,
    fontSize: 20,
    marginBottom: 5,
    color: '#555',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    width: 100,
  },
  infoValue: {
    top: -25 ,
    left : -80 ,
    flex: 1,
    color: 'lightgreen',
    fontSize: 16,
  },
  infoValue2: {
    flex: 1,
    color: 'lightgreen',
    fontSize: 16,
  },
  chatIcon: {
    top: -75 ,
    left : 120 ,
    marginTop: 10,
  },
  followIcon :{
    top: -34,
    left: 55
  } ,
  followers:{
    left: -20,
    top:50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  following:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    top:12,
    left : 80
  },
  follow :{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    top:-27,
    left : 180
  }

});

export default UserProfile;
