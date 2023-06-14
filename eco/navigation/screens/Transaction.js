import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TransactionScreen({ navigation }) {
  const [code, setCode] = React.useState('');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleSendCode = () => {
    // Perform the necessary action with the code
    console.log('Sending code:', code);
    // Clear the input field
    setCode('');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/fond4.jpg')} style={styles.vector} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.headerIcon} name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>Transaction</Text>
      </View>

      <View style={styles.container2}>
        <Text style={styles.text}>
          Go to nearby recycling center & process affiliated with
          <Text style={{ color: 'green' }}> EcoBin </Text>and write your code.
        </Text>
     
      </View>
      <View style={styles.container3}>
      <TextInput
          style={styles.input}
          placeholder="Enter your code"
          value={code}
          onChangeText={handleCodeChange}
        />
        
        </View>
        <View style={styles.container4}>
        <Button title="Send" onPress={handleSendCode}  />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vector: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: 'white',
    elevation: 4, // Add shadow on Android
    shadowColor: '#000000', // Add shadow on iOS
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    // top: -350,
  },
  headerIcon: {
    left: -100,
  },
  container: {
    width: '100%',
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    top: 50,
  },
  container2: {
   
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    marginTop:50,
    // top: -300,
  },
  container3:{
    
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 25,
    marginTop:280,
  },
  title: {
    color: '#2DCC70',
    fontSize: 25,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 16,
  },
  input: {
    marginTop:10,
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  container4:{
    marginTop:300,
    top:-190
  },
});
