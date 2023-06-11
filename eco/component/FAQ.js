import React from 'react';
import { View, Text, StyleSheet,ScrollView,Image } from 'react-native';

const FAQ = () => {
  return (
    <scroll>
         <View style={styles.container}>
      <Image source={require('./component/faq.png')} style={styles.image} />
    </View>
    <View style={styles.container}>
      <Text style={styles.heading}>FAQ</Text>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>What is RuntahPedia?</Text>
        <Text style={styles.answer}>
          RuntahPedia is an online waste buying and selling application (Recycling platform). RuntahPedia connects waste producers (households, businesses, and offices) with the nearest local collectors, making it easier to sell waste.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>How is RuntahPedia different from a Waste Bank or other waste management services?</Text>
        <Text style={styles.answer}>
          RuntahPedia is not a garbage pick-up service company. It aims to provide more value by ensuring that the garbage picked up by their partners gets recycled instead of being thrown into the landfill. RuntahPedia offers trash-selling services and a recycling program where everything gets recycled again.
        </Text>
      </View>

      

    </View>
    </scroll>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQ;
