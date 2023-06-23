import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const AboutUs = () => {
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as desired
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      <Animated.Text style={[styles.heading, { opacity: fadeInAnim }]}>About Us</Animated.Text>
      <Animated.Text style={[styles.description, { opacity: fadeInAnim }]}>
        ECOBIN aims to promote recycling and help people contribute to a greener environment. 
        Our app provides users with information about recycling depots and places where they can conveniently dispose 
        of their recyclable waste items. We believe in the power of individual efforts to make a collective impact, 
        and that's why we reward our users with points for their recycling activities. These points can be redeemed 
        later for various rewards and incentives.
      </Animated.Text>
      <Animated.Text style={[styles.features, { opacity: fadeInAnim }]}>Key Features:</Animated.Text>
      <Animated.Text style={[styles.featureItem, { opacity: fadeInAnim }]}>- Find nearby recycling depots and places</Animated.Text>
      <Animated.Text style={[styles.featureItem, { opacity: fadeInAnim }]}>- Track your recycling activities and earn points</Animated.Text>
      <Animated.Text style={[styles.featureItem, { opacity: fadeInAnim }]}>- Redeem points for rewards and incentives</Animated.Text>
      <Animated.Text style={[styles.featureItem, { opacity: fadeInAnim }]}>- Get notifications and reminders for recycling</Animated.Text>
      <Animated.Text style={[styles.footerText, { opacity: fadeInAnim }]}>
        ECOBIN © {new Date().getFullYear()} All rights reserved.
      </Animated.Text>
      <Animated.Text style={[styles.footerText, { opacity: fadeInAnim }]}>
        Privacy Policy | Terms of Service | Contact Us
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 120,
    flex: 1,
    padding: 16,
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'lightgreen',
  },
  description: {
    top: -10,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 24,
  },
  features: {
    top: -10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureItem: {
    top: -10,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 4,
  },
  footerText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AboutUs;
