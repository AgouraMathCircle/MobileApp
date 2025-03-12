import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ACElogo from '../assets/ACElogo.png'; // Logo image

const ConfirmationScreen = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('Login'); // Navigate to SignIn screen
  };

  return (
    <View style={styles.ConfirmationScreen_container}>
      {/* Logo */}
      <Image 
        source={ACElogo} 
        style={styles.logo} 
        resizeMode="contain" 
        accessibilityLabel="ACE logo" 
      />
      
      {/* Thank you message */}
      <Text style={styles.ConfirmationScreen_thankYouText}>
        Thank you!
      </Text>

      {/* Information message */}
      <Text style={styles.ConfirmationScreen_infoText}>
        We've sent a password reset link to your email. Please check your inbox.
      </Text>

      {/* Sign In button */}
      <TouchableOpacity 
        style={styles.ConfirmationScreen_signInButton} 
        onPress={handleSignIn}
        activeOpacity={0.7}  // Feedback effect
        accessibilityLabel="Navigate to Sign In"
      >
        <Text style={styles.ConfirmationScreen_signInText}>
          Sign in here
        </Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  // Container for the screen
  ConfirmationScreen_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  
  // Logo styling
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  
  // Thank you text style
  ConfirmationScreen_thankYouText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  
  // Info text style
  ConfirmationScreen_infoText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  // Sign-in button text style
  ConfirmationScreen_signInText: {
    fontSize: 16,
    color: '#007BFF', // Blue color for the button text
    textDecorationLine: 'underline',
  },
  
  // Button container style
  ConfirmationScreen_signInButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
});
export default ConfirmationScreen;