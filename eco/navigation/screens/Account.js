import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileDetails = ({ name, bio, profileImage, address, email }) => {
  const navigation = useNavigation();
  const handleAboutMePress = () => {
    navigation.navigate('AboutMe',{
      userDetails: {
        name,
        bio,
        profileImage,
        address,
        email,
      },
    })
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            'https://images.prismic.io/utopix-next-website/Mzk0NGJkOWEtY2ZlYS00MjVjLTkwNTAtOGY5OWQzN2IzNGVi_762cec57-2eaf-4eaf-9a0d-2e7860147e48_profilhomme7.jpg?ixlib=js-3.7.1&w=3840&auto=format&fit=max',
        }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>bosri</Text>
      <Text style={styles.bio}>
        <FontAwesome name="dollar" size={20} color="#09E4AF" /> 10 ECOBIN Points
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
        <MaterialIcons name="person" size={24} color="gray" />
          <Text style={styles.infoTitle}>About Me</Text>
          <TouchableOpacity style={styles.infoButton} onPress={ handleAboutMePress}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
        <MaterialIcons name="credit-card" size={24} color="gray" />
          <Text style={styles.infoTitle}>Debit Card</Text>
          <TouchableOpacity style={styles.infoButton} onPress={() => console.log('handleChangePassword')}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
        <MaterialIcons name="shopping-cart" size={24} color="gray" />
          <Text style={styles.infoTitle}>My Orders</Text>
          <TouchableOpacity style={styles.infoButton} onPress={() => console.log('onPressMyOrders')}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
        <MaterialIcons name="notifications" size={24} color="gray" />
          <Text style={styles.infoTitle}>Notifications</Text>
          <TouchableOpacity style={styles.infoButton} onPress={() => console.log('onPressNotifications')}>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="gray" />
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
    color: '#09E4AF',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
    width: '100%',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  infoTitle: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  infoButton: {
    marginLeft: 8,
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
