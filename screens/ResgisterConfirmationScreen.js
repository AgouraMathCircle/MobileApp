import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ACElogo from '../assets/ACElogo.png'
import styles from '../Styles/MainStyles'

const RegisterConfirmationScreen = ({ navigation }) => {
  const handleSignIn = () => {
    
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles. RegisterConfirmationScreen_container}>
      <Image
        source={ACElogo}  // replace with your logo URL
        style={styles. RegisterConfirmationScreen_logo}
        resizeMode="contain"
      />
      <Text style={styles. RegisterConfirmationScreen_thankYouText}>Thank you!</Text>
      <Text style={styles. RegisterConfirmationScreen_infoText}>
        We've sent you a confirmation email, please check your inbox and follow the instructions to confirm your account.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles. RegisterConfirmationScreen_signInText}>Sign in here</Text>
      </TouchableOpacity>
    </View>
  );
};



export default RegisterConfirmationScreen;