import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ACElogo from '../assets/ACElogo.png'
import styles from '../Styles/MainStyles';

const ConfirmationScreen = ({ navigation }) => {
  const handleSignIn = () => {
    
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.ConfirmationScreen_container}>
      <Image
        source={ACElogo}  // replace with your logo URL
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.ConfirmationScreen_thankYouText}>Thank you!</Text>
      <Text style={styles.ConfirmationScreen_infoText}>
        We've sent you a password to your email,Please check your inbox.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.ConfirmationScreen_signInText}>Sign in here</Text>
      </TouchableOpacity>
    </View>
  );
};


export default ConfirmationScreen;