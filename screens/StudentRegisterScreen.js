import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const StudentRegistrationScreen = () => {
  const handleRegisterPress = () => {
    Linking.openURL('https://agouramathcircle.org/studentregistration.aspx');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../assets/ACElogo.png')} // replace with the actual path to your logo
          style={styles.logo}
        />
        <Text style={styles.instruction}>
          Join our program and start your journey! Click below to register.
        </Text>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5, // for Android shadow
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  instruction: {
    fontSize: 18,
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: '600',
    marginVertical: 10,
  },
  registerButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3, // for Android shadow
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentRegistrationScreen;
