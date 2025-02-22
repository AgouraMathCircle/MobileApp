import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Image, 
  SafeAreaView, 
  StyleSheet 
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo3 from '../assets/Banner6.png';
import { FontAwesome } from '@expo/vector-icons';
import GlobalVariable from './gobal';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadStoredCredentials = async () => {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');
      const remember = await AsyncStorage.getItem('rememberMe') === 'true';
      if (storedUsername && storedPassword && remember) {
        setUsername(storedUsername);
        setPassword(storedPassword);
        setRememberMe(remember);
        handleLoginSkip(storedUsername, storedPassword);
      }
    };
    loadStoredCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        GlobalVariable.AMCApiurl+'UserValidate',
        {
          UserName: username,
          Password: password,
          Device: 'mobile',
          IPAddress: 'MobileApp',
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000,
        }
      );

      if (response.data?.isSuccess) {
        clearInputs();
        const { userFirstName, userLastName, userType, userEmail, userId, chapterID, enableScoreUpdate } = response.data;

        // Update GlobalVariable
        GlobalVariable.userName = username;
        GlobalVariable.userFirstName = userFirstName;
        GlobalVariable.userLastName = userLastName;
        GlobalVariable.userEmail = userEmail;
        GlobalVariable.userId = userId;
        GlobalVariable.chapterID = chapterID;
        GlobalVariable.userType = userType;
        GlobalVariable.enableScoreUpdate = enableScoreUpdate;

        if (rememberMe) {
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
          await AsyncStorage.setItem('rememberMe', 'true');
        } else {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
          await AsyncStorage.removeItem('rememberMe');
        }

        await trackUser(userId, userEmail, userType, userFirstName, userLastName);
        navigateToDashboard(userType, username, userFirstName, chapterID);
      } else {
        handleLoginError(response.data.errorMessage);
      }
    } catch (error) {
      handleServerError(error);
    }
  };

  const handleLoginSkip = async (storedUsername, storedPassword) => {
    try {
      const response = await axios.post(GlobalVariable.AMCApiurl+'UserValidate', {
        UserName: storedUsername,
        Password: storedPassword,
        Device: 'mobile',
        IPAddress: 'localhost',
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000,
      });

      if (response.data?.isSuccess) {
        const { userFirstName, userLastName, userType, userEmail, userId, chapterID } = response.data;
        await trackUser(userId, userEmail, userType, userFirstName, userLastName);
        navigateToDashboard(userType, storedUsername, userFirstName, chapterID);
      } else {
        handleLoginError(response.data.errorMessage);
      }
    } catch (error) {
      handleServerError(error);
    }
  };

  const trackUser = async (userId, userEmail, userType, userFirstName, userLastName) => {
    try {
      const trackingData = {
        userID: String(userId),
        userName: userEmail,
        userType,
        ipAddress: 'MobileApp',
      };

      const response = await axios.post(GlobalVariable.AMCApiurl+'UserTrackingUpdate', trackingData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
      });
    } catch (error) {
      handleTrackingError(error);
    }
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  };

  const navigateToDashboard = (userType, username, firstName, chapterID) => {
    const routes = {
      V: 'Volunteer Dashboard',
      A: 'Administrator Dashboard',
      S: 'Student Dashboard',
      I: 'Instructor Dashboard',
      C: 'Coordinator Dashboard',
    };

    if (routes[userType]) {
      navigation.navigate(routes[userType], { userName: username, userFirstName: firstName, chapterID });
    } else {
      handleLoginError('Invalid user type.');
    }
  };

  const handleLoginError = async (message) => {
    // Clear AsyncStorage in case of login failure
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('rememberMe');
    } catch (e) {
      console.error("Error clearing AsyncStorage", e);
    }

    setServerError(message || 'Login failed.');
    setTimeout(() => setServerError(''), 5000);
  };

  const handleServerError = (error) => {
    if (error.code === 'ECONNABORTED') {
      Alert.alert('Timeout Error', 'The request took too long, please try again.');
    } else if (error.message === 'Network Error') {
      Alert.alert('Network Error', 'Unable to connect to the server. Check your internet connection.');
    } else {
      console.error('Login Error:', error.message);
      Alert.alert('Error', 'Failed to connect to the server. Please try again.');
    }

    // Optionally clear stored credentials in case of failure to avoid re-using old credentials
    handleLoginError('Failed to connect to the server. Please try again.');
  };

  const handleTrackingError = (error) => {
    if (error.response) {
      Alert.alert('Tracking Error', error.response.data.errorMessage || 'An error occurred while tracking user.');
    } else if (error.request) {
      Alert.alert('Tracking Error', 'No response received from the tracking server. Please try again later.');
    } else {
      Alert.alert('Tracking Error', 'An error occurred while setting up the tracking request.');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo3} style={styles.logo} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back! Please login to continue.</Text>
        {serverError && <Text style={styles.errorText}>{serverError}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
        />
        <View style={styles.rememberMeContainer}>
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}>
            <FontAwesome 
              name={rememberMe ? "check-square" : "square-o"} 
              size={24} 
              color="#408A4E" 
            />
            <Text style={styles.rememberMeText}>
              {rememberMe ? 'Uncheck to forget me' : 'Check to remember me'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot password')}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Student Registration')}>
          <Text style={styles.registerText}>Register as Student</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Volunteer Registration')}>
          <Text style={styles.registerText}>Register as Volunteer</Text>
        </TouchableOpacity>

        <Text style={styles.copyrightText}>© Copyright 2015-{currentYear} Agoura Math Circle</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 300,
  },
  rememberMeContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    fontSize: 14,
    color: 'darkgreen',
    marginLeft: 8,
  },
  loginButton: {
    backgroundColor: 'darkgreen',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: 'darkgreen',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  copyrightText: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
  },
});

export default LoginScreen;
