import React, { Component, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import nodemailer from 'nodemailer';


const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password',
      },
    });

    const mailOptions = {
      from: email,
      to: 'recipient_email@example.com',
      subject: 'Contact Us Form',
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        Alert.alert('Error', 'An error occurred while sending the email.');
      } else {
        console.log('Email sent: ' + info.response);
        Alert.alert('Success', 'Email sent successfully.');
      }
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
      />
      <Button title="Send" onPress={handleSendEmail} />
    </View>
  );
};

export default ContactUs;
