import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, Button, StyleSheet, ScrollView,TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
function News() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.43.71:3000/feeds');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../../assets/logo.png')} style={styles.logoImage} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
       
        </View>

        <View style={styles.newsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.newsItem}>
               <View style={styles.newsInfo}>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSubtitle}>{item.subtitle}</Text> 
              </View>
              <Image source={{ uri: item.image }} style={styles.newsImage} />
              <View style={styles.overlayImages}>
              
                  
     
                <Image source={require('../../assets/jaime.png')} style={styles.jaimeImage} />
                <Image source={require('../../assets/comment.png')} style={styles.overlayImage} />
              </View>
             
            </View> 
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logoImage: {
    width: 479,
    height: 130,
    backgroundColor: '#9CFFE7',

  },
  newsContainer: {
    paddingTop: 150, // Adjust this value based on the logo height and desired spacing
    paddingBottom: 20,
    alignItems: 'center',
  },
  newsItem: {
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 40,
    top: -100,
    marginLeft: 10,
  },
  newsSubtitle: {
    fontSize: 14,
    marginBottom: 40,
    marginLeft: 10,
    top: -130,
  },
  newsImage: {
    width: 480,
    height: 480,
    top: -150,
  },
  
  newsDate: {
    fontSize: 15,
    textAlign: 'right',
    marginleft: 20,
    top: -50,
  },
  overlayImages: {
    position: 'absolute',
    top: 485,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayImage: {
    width: 30,
    height: 30,
    left: 20,
    marginBottom: 20,
  },
  jaimeImage: {
    width: 35,
    height: 35,
    marginBottom: 20,
  },
});

export default News;
