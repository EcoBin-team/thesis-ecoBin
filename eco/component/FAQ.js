import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { server_url } from '../secret';
const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState({});

  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(3000);

  useEffect(() => {
    fetchFAQs();
    fadeIn();
    slideIn();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/helps/faqs`);
      setFaqs(response.data);
      setExpanded({});
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

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 3333, 
      useNativeDriver: true,
    }).start();
  };

  const toggleAnswer = (faqId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [faqId]: !prevExpanded[faqId],
    }));
  };

  const getQuestionContainerStyle = (faqId) => {
    const isExpanded = expanded[faqId];

    return {
      marginBottom: 16,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      padding: 16,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
      transform: [
        {
          translateX: slideAnim.interpolate({
            inputRange: [-200, 0],
            outputRange: [0, 0],
          }),
        },
      ],
      alignItems: 'center',
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Frequently Asked Questions
      </Animated.Text>

      {faqs.map((faq) => (
        <TouchableOpacity
          key={faq.id}
          style={[styles.questionContainer, getQuestionContainerStyle(faq.id)]}
          onPress={() => toggleAnswer(faq.id)}
          activeOpacity={0.8}
        >
          <Text style={styles.question}>{faq.question}</Text>
          {expanded[faq.id] && <Text style={styles.answer}>{faq.answer}</Text>}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    top:60,
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#8ff180',
  },
  questionContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  answer: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FAQ;
