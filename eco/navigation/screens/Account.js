import React, { useContext, useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../MainContainer';
import { useRoute } from '@react-navigation/native';
const ProfileDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const userData = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  // const updatedUser = route.params?.updatedUser
  
  


  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/users/user/${userData.id}`);
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  };

  console.log(userData);
  const handleAboutMePress = () => {
    navigation.navigate('AboutMe', {
      userDetails: {
        id: userDetails?.id,
        name: userDetails?.name,
        balance: userDetails?.balance,
        image: userDetails?.profileImage,
        address: userDetails?.address,
        email: userDetails?.email,
        phone: userDetails?.phone,
      },
      // Add the updatedUser parameter
    });
  };
  const handleSignOut = () => {
    setUserDetails(null);
    userData(null);
    navigation.navigate('Home');
  };

  useEffect(() => {
 
      fetchUserDetails();
    
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              userDetails?.image
                ? { uri: userDetails.image }
                : require('../../assets/avatarVide.png')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <FontAwesome name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userDetails?.name}</Text>
        <Text style={styles.bio}>
          <FontAwesome name="dollar" size={20} color="#09E4AF" /> {userDetails?.balance} ECOBIN Points
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <MaterialIcons name="person" size={24} color="gray" />
          <Text style={styles.infoTitle}>About Me</Text>
          <TouchableOpacity style={styles.infoButton} onPress={handleAboutMePress}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <MaterialIcons name="attach-money" size={24} color="gray" />
          <Text style={styles.infoTitle}>transaction</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => console.log('handleChangePassword')}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <MaterialIcons name="shopping-cart" size={24} color="gray" />
          <Text style={styles.infoTitle}>My Orders</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => console.log('onPressMyOrders')}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <MaterialIcons name="notifications" size={24} color="gray" />
          <Text style={styles.infoTitle}>Notifications</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => console.log('onPressNotifications')}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.signOutContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Feather style={styles.signOutButtonText} name="log-out" size={20} color="black" />
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 430,
    backgroundColor: '#F2F3F7',
  },
  profileImageContainer: {
    top: 50,
    position: 'relative',
    width: 114,
    height: 117,
    alignSelf: 'center',
    marginTop: 16,
  },
  profileImage: {
    borderRadius: 50,
    width: 114,
    height: 117,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#28B446',
    borderRadius: 12,
    padding: 4,
  },
  name: {
    top: 60,
    alignSelf: 'center',
    marginTop: 8,
    fontSize: 15,
    fontWeight: '600',
  },
  bio: {
    top: 80,
    alignSelf: 'center',
    marginTop: 8,
    color: '#09E4AF',
    fontSize: 20,
  },
  infoContainer: {
    position: 'absolute',
    top: 347,
    backgroundColor: 'white',
    width: 430,
    height: 200,
  },
  info: {
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: 10,
    left: 0,
  },
  infoTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '600',
  },
  infoButton: {
    width: 50,
    marginLeft: 8,
  },
  signOutContainer: {
    position: 'absolute',
    width: 430,
    top: 610,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 48,
    borderRadius: 8,
  },
  signOutButtonText: {
    left: 20,
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default ProfileDetails;
