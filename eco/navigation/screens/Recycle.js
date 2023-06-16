import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  View,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

const Recycle = () => {
  const inputAnim = useRef(new Animated.Value(300)).current;
  const [inputWidth, setInputWidth] = useState(200);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [depots, setDepots] = useState([]);

  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const response = await axios.get(
          `http://192.168.103.18:3000/depot/search?query=${query}`
        );
        setDepots(response.data);
      } catch (error) {
        console.error('Error searching depots:', error.message);
      }
      setIsLoading(false);
    };

    if (query.length > 0) {
      setIsLoading(true);
      fetchDepots();
    } else {
      setDepots([]);
    }
  }, [query]);

  const handleFocus = () => {
    Animated.timing(inputAnim, {
      toValue: 20,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setInputWidth(300);
  };

  const handleBlur = () => {
    Animated.timing(inputAnim, {
      toValue: 300,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setInputWidth(200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Animated.View style={[styles.input, { transform: [{ translateY: inputAnim }], width: inputWidth }]}>
          <TextInput
            style={styles.textInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="enter depot name or city..."
            onChangeText={setQuery}
          />
          {isLoading ? (
            <Animatable.View style={styles.loaderContainer} animation="fadeIn" duration={100}>
              <Animatable.Image
                animation="rotate"
                easing="linear"
                iterationCount="infinite"
                source={{ uri: 'https://i.ibb.co/7WN6XFp/recycle-symbol.png' }}
                style={styles.loaderIcon}
              />
            </Animatable.View>
          ) : null}
        </Animated.View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Render the search results */}
        {depots.map((depot) => (
          <View key={depot.id} style={styles.card}>
            <View style={styles.cardTitleContainer}>
              {/* Depot Name */}
              <Text style={styles.cardTitle}>{depot.name}</Text>
            </View>
            {/* Depot Picture */}
            <Image source={{ uri: depot.picture }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardText}>Times: {depot.worktime}</Text>
                <Text style={styles.cardText}>Capacity: {depot.capacity.total}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: -10,
    left: 77,
    right: 0,
    zIndex: 1,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 40,
    elevation: 4,
  },
  textInput: {
    flex: 1,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  loaderIcon: {
    width: 30,
    height: 30,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 60, // Adjust the top padding to provide space for the search bar
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    width: 370, // Set a fixed width for the card container
    marginBottom: 10, // Add margin bottom to separate the cards
  },
  cardTitleContainer: {
    flexWrap: 'wrap',
    maxWidth: 300,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardImage: {
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Recycle;
