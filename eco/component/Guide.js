import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Animated } from 'react-native';
import axios from 'axios';

const GuidePage = () => {
  const [guides, setGuides] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchGuides();
    fadeIn();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get('http://192.168.1.100:3000/helps/guides');
      setGuides(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View contentContainerStyle={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>        ECOBIN User Guide</Animated.Text>

   
         <ScrollView>
      {guides.map((guide) => (
        <Animated.View key={guide.id} style={[styles.stepContainer, { opacity: fadeAnim }]}>
          <View style={styles.stepNumberContainer}>
            <Text style={styles.stepNumber}>{guide.step}</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{guide.title}</Text>
            <Text style={styles.stepDescription}>{guide.layout}</Text>
           
          </View>
        </Animated.View>
      ))}

      <Animated.Text style={[styles.footerText, { opacity: fadeAnim }]}>
        Start contributing to a cleaner environment today with ECOBIN!
      </Animated.Text>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    top : 20 ,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color : "lightgreen"
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepNumberContainer: {
    left :66,
    top : 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'lightgreen',
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    left : 60 , 
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 8,
  },

  footerText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 24,
  },
});

export default GuidePage;
