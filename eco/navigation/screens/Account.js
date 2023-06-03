import React from 'react';
import { View, Image, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from 'react-native-vector-icons';

const ProfileDetails = ({ name, bio, profileImage, address, email }) => {
  return (
    <View style={styles.container}>
  <Image
    source={{
      uri: 'https://images.prismic.io/utopix-next-website/Mzk0NGJkOWEtY2ZlYS00MjVjLTkwNTAtOGY5OWQzN2IzNGVi_762cec57-2eaf-4eaf-9a0d-2e7860147e48_profilhomme7.jpg?ixlib=js-3.7.1&w=3840&auto=format&fit=max',
    }}
    style={styles.profileImage}
  />
  <Text style={styles.name}>Ala bosri</Text>
  <Text style={styles.bio}>
        <FontAwesome name="dollar" size={20} color="#09E4AF" /> 10 ECOBIN Points
      </Text>

  <View style={styles.infoContainer}>
    <View style={styles.infoItem}>
      <MaterialIcons name="location-on" size={24} color="gray" />
      <Text style={styles.infoText}>tunis, ariana</Text>
    </View>

    <View style={styles.infoItem}>
      <MaterialIcons name="email" size={24} color="gray" />
      <Text style={styles.infoText}>bosri@gmail.com</Text>
    </View>

    <View style={styles.infoItem}>
      <TouchableOpacity style={styles.infoItem} onPress={() => console.log('handleChangePassword')}>
        <MaterialIcons name="lock" size={24} color="gray" />
        <Text style={styles.infoText}>Change Password</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.infoItem}>
      <TouchableOpacity style={styles.infoItem} onPress={() => console.log('onPressMyOrders')}>
        <MaterialIcons name="shopping-cart" size={24} color="gray" />
        <Text style={styles.infoText}>My Orders</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.infoItem}>
      <TouchableOpacity style={styles.infoItem} onPress={() => console.log('onPressNotifications')}>
        <MaterialIcons name="notifications" size={24} color="gray" />
        <Text style={styles.infoText}>Notifications</Text>
      </TouchableOpacity>
    </View>
  </View>

  <TouchableOpacity style={styles.signOutButton} onPress={() => console.log('onPressSignOut')}>
    <Text style={styles.signOutButtonText}>Sign Out</Text>
  </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    profileImage: {
      width: 130,
      height: 130,
      borderRadius: 75,
      marginBottom: 16,
    },
    name: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    bio: {
        color:'#09E4AF',
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 16,
    },
    infoContainer: {
      alignItems: 'center',
      marginBottom: 16,
    },
    infoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    infoText: {
      marginLeft: 8,
      fontSize: 16,
    },
    signOutButton: {
      backgroundColor: 'red',
      padding: 12,
      borderRadius: 8,
    },
    signOutButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default ProfileDetails;
