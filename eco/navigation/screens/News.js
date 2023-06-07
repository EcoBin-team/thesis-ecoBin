import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function news() {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  
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


 

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  

 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../assets/logo.png')} style={styles.logoImage} />
      <View style={styles.overlayImages}>
                <TouchableWithoutFeedback onPress={handleShow}>
                  <Image source={require('../assets/comment.png')} style={styles.overlayImage} />
                </TouchableWithoutFeedback>
                  <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "#2DCC70"}
      />
    </Pressable>
              </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}></View>

        <View style={styles.newsContainer}>
          {data.map((item, index) => (
            <View key={index} style={styles.newsItem}>
              <Image source={{ uri: item.image }} style={styles.newsImage} />
              <View style={styles.overlayImages}>
                <TouchableWithoutFeedback onPress={handleShow}>
                  <Image source={require('../assets/comment.png')}  />
                </TouchableWithoutFeedback>
                <View style={styles.newsInfo}>
                <Text style={styles.newsDate}>{item.name}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSubtitle}>{item.subtitle}</Text>
              </View>
                <Pressable onPress={() => setLiked((isLiked) => !isLiked)}>
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "#2DCC70"}
      />
    </Pressable>
                {/* <TouchableWithoutFeedback onPress={handle}>
          <Image source={require('../assets/jaime.png')} style={[styles.overlayImage, { backgroundColor: jaimeBackground }]} />
        </TouchableWithoutFeedback> */}

      
                
           
              </View>
              <View style={styles.newsInfo}>
                <Text style={styles.newsDate}>{item.date}</Text>
                <Text style={styles.newsTitle}>{item.title}</Text>
                <Text style={styles.newsSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <Modal visible={show} onRequestClose={handleClose} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Write your comment</Text>
            
              <TextInput
                style={styles.input}
                placeholder="Enter your comment"
                // value={updatedMovie.name}
                // onChangeText={(text) => setUpdatedMovie({ ...updatedMovie, name: text })}
              />
  
              <View style={styles.buttonContainer}>
                <Button title="Close" onPress={handleClose} />
                <Button title="post"/>
             
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
//   overImage:{
// backgroundColor:'red'
//   },
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

})
export default news;
