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
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';

const Recycle = () => {
  const inputAnim = useRef(new Animated.Value(300)).current;
  const [inputWidth, setInputWidth] = useState(200);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [depots, setDepots] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMedal, setSelectedMedal] = useState('');

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

  const handleCardPress = (depot) => {
    setSelectedDepot(depot);
    setModalVisible(true);
  };

  const handleMedalChange = (medal) => {
    setSelectedMedal(medal);

    // Update the selectedDepot based on the selected medal
    if (medal === 'Location') {
      setSelectedDepot({ ...selectedDepot, selectedMedal: 'Location' });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Animated.View
          style={[styles.input, { transform: [{ translateY: inputAnim }], width: inputWidth }]}
        >
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
          <TouchableOpacity
            key={depot.id}
            style={styles.card}
            onPress={() => handleCardPress(depot)}
          >
            <View style={styles.cardTitleContainer}>
              {/* Depot Name */}
              <Text style={styles.cardTitle}>{depot.name}</Text>
            </View>
            {/* Depot Picture */}
            <Image source={{ uri: depot.picture }} style={styles.cardImage} />
            <Text style={styles.cardText}>Times: {depot.worktime}</Text>
            <View style={styles.cardDetails}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <ScrollView contentContainerStyle={styles.modalContent}>
          {selectedDepot && (
            <>
              <Text style={styles.modalTitle}>
                {selectedDepot.name}{selectedDepot.worktime.substring(4)}
              </Text>
              <Image source={{ uri: selectedDepot.picture }} style={styles.modalImage} />
              
              {/* Medal Picker */}
              <Picker
                selectedValue={selectedMedal}
                style={styles.medalPicker}
                onValueChange={handleMedalChange}
              >
                <Picker.Item label="Location" value={"Location"} />
                <Picker.Item label="Capacity" value={selectedDepot.capacity.total} />
                <Picker.Item label="Accepted Products" value={selectedDepot.items} />
                <Picker.Item label="Certificate of Use" value={selectedDepot.certif} />
              </Picker>
             
              {/* Depot Location Map */}
              {selectedMedal === 'Location' && (
                <MapView
                  style={styles.map}
                  region={{
                    latitude: selectedDepot.latitude,
                    longitude: selectedDepot.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: selectedDepot.latitude,
                      longitude: selectedDepot.longitude,
                    }}
                  />
                </MapView>
              )}
              {/* Selected Medal */}
              {selectedMedal !== 'Location' && (
                <Text style={styles.modalText}>{selectedMedal}</Text>
              )}
            </>
          )}
        </ScrollView>
      </Modal>
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
    paddingTop: 60,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    elevation: 4,
    width: 370,
    marginBottom: 20,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modal: {
    top: 40,
    margin: 0,
    justifyContent: 'flex-end',
    padding: 10,
    elevation: 4,
    width: 400,
    marginLeft: 10,
    borderTopLeftRadius: 20, // Add this line
    borderTopRightRadius: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  medalPicker: {
    marginBottom: 10,
    borderTopLeftRadius: 10, // Add this line
    borderTopRightRadius: 10,
    borderRadius: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
  },
});

export default Recycle;
