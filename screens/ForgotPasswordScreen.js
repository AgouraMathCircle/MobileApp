import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import axios from 'axios';
import styles from '../Styles/MainStyles';
import GlobalVariable from './gobal';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // State to store the API response message
  const [inputError, setInputError] = useState(false); // State to manage input error
  const shakeAnimation = useRef(new Animated.Value(0)).current; // Animation value for shaking

  const handleForgotPassword = async () => {
    // Check if the email is empty
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post(GlobalVariable.AMCApiurl+`ForgetPassword`, 
        {
          userName: email.trim(),
          Device: 'mobile',
          IPAddress: 'localhost',
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

      // Check the response from the server
      if (response.data.isSuccess) {
        setEmail(''); // Clear the input field on success
        setInputError(false); // Reset input error

        // Navigate to ForgotConfirmationScreen
        navigation.navigate('ForgotConfirmationScreen');

      } else {
        setMessage(response.data.errorMessage || 'User not found.');

        // Highlight the input field in red and trigger the shake animation
        setInputError(true);
        shakeInput();

        // Hide the message and reset input error after 5 seconds
        setTimeout(() => {
          setMessage('');
          setInputError(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setMessage('Failed to send the reset link. Please try again.');

      // Hide the message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const shakeInput = () => {
    // Trigger the shake animation by animating the value from 0 to 1 and back
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <View style={styles.ForgotPasswordScreen_container}>
      <Text style={styles.ForgotPasswordScreen_title}>Forgot Password</Text>
      <Text style={styles.ForgotPasswordScreen_subtitle}>Please enter your email to receive your password in an email</Text>

      {/* Animated TextInput for shake effect */}
      <Animated.View style={{ transform: [{ translateX: shakeAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: [-10, 10],
      }) }] }}>
        <TextInput
          style={[styles.ForgotPasswordScreen_input, inputError && styles.ForgotPasswordScreen_inputError]} // Apply red border if inputError is true
          placeholder="Enter your email"
          placeholderTextColor={inputError ? '#ff0000' : '#aaa'} // Change placeholder color if error
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </Animated.View>

      <TouchableOpacity style={styles.ForgotPasswordScreen_button} onPress={handleForgotPassword}>
        <Text style={styles.ForgotPasswordScreen_buttonText}>Send</Text>
      </TouchableOpacity>

      {/* Conditionally render the response message */}
      {message ? (
        <Text style={styles.ForgotPasswordScreen_message}>{message}</Text>
      ) : null}

      <TouchableOpacity style={styles.ForgotPasswordScreen_backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.ForgotPasswordScreen_backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ForgotPasswordScreen;
