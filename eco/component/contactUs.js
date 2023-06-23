import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ContactUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contact Us</Text>
      <View style={styles.contactInfoContainer}>
        <Text style={styles.contactInfo}>Email: info@ecobin.com</Text>
        <Text style={styles.contactInfo}>Phone: +216 99 330 012</Text>
        <Text style={styles.contactInfo}>Address: 123 Green Street, City</Text>
        <Text style={styles.contactInfo}>
          Service Times: Monday to Friday         9:00 AM - 5:00 PM
        </Text>
      </View>
      <Text style={styles.socialMediaText}>Follow us on social media:</Text>
      <View style={styles.socialMediaContainer}>
        <FontAwesome name="facebook" style={styles.icon} />
        <FontAwesome name="twitter" style={styles.icon} />
        <FontAwesome name="instagram" style={styles.icon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    top :30 ,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'lightgreen',
  },
  contactInfoContainer: {
    marginBottom: 24,
  },
  contactInfo: {
    top : 60 ,
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  socialMediaText: {
    top : 100 ,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    top : 100 ,
    fontSize: 32,
    marginHorizontal: 8,
    color: 'lightgreen',
  },
});

export default ContactUs;
