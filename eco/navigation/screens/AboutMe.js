import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet ,Text} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import BackButton from "../../components/BackButton/BackButton";
import { useNavigation } from '@react-navigation/native';
const AboutMe = () => {
    const navigation = useNavigation();
  const route = useRoute();
  const { userDetails } = route.params;

  return (
    <View style={styles.container}>
    <BackButton style={{top:-50}} fn={() => navigation.navigate("MainContainer")}/>
      <View style={styles.section}>
        <Text style={styles.title}>
          <FontAwesome name="user" size={18} color="black" /> Personal Information
        </Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="user-circle-o" size={16} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            value="ala bosri"
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={16} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={userDetails.phone}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="address-card-o" size={16} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={userDetails.address}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={16} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={userDetails.email}
            editable={false}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>
          <FontAwesome name="lock" size={18} color="black" /> Change Password
        </Text>
        <View style={styles.inputContainer}>
          <FontAwesome name="unlock" size={16} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={userDetails.password}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={16} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={userDetails.newPassword}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={16} color="black" style={styles.icon} />
          <TextInput
            style={styles.input}
            value={userDetails.confirmPassword}
            editable={false}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => console.log('onPressSaveSetting')}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    top: 100,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    left: 20,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  saveButton: {
    top: 200,
    backgroundColor: '#09E4AF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutMe;
