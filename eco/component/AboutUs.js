import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our app! Here are some details about us:
      </Text>
      <Text style={styles.details}>
        - With EcoBin, you have the power to make a positive impact on the environment right at your fingertips
      </Text>
      <Text style={styles.details}>
        - Email: john.doe@example.com
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  details: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default AboutUs;
