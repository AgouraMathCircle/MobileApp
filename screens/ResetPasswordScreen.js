import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import GlobalVariable from './gobal';

const ResetPasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntryCurrent, setSecureTextEntryCurrent] = useState(true);
  const [secureTextEntryNew, setSecureTextEntryNew] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const userName = GlobalVariable.userName;
  const navigation = useNavigation();

  const handleResetPassword = () => {
    return new Promise(async (resolve, reject) => {
      if (!userName) {
        Alert.alert('Error', 'Please enter your email');
        reject('Please enter your email');
        return;
      }
      if (!currentPassword) {
        Alert.alert('Error', 'Please enter your current password');
        reject('Please enter your current password');
        return;
      }
      if (!newPassword || newPassword.length < 6) {
        Alert.alert('Error', 'New password must be at least 6 characters long.');
        reject('New password must be at least 6 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match. Please try again.');
        reject('Passwords do not match. Please try again.');
        return;
      }

      try {
        const response = await axios.post(
          GlobalVariable.AMCApiurl + 'ChangePassword',
          {
            userName: userName.trim(),
            currentPassword: currentPassword.trim(),
            newPassword: newPassword.trim(),
          },
          {
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
            }
          }
        );

        if (response.data.isSuccess) {
          // Show success alert
          Alert.alert('Success', response.data.message || 'Your password has been updated!');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          resolve(response.data);
        } else {
          // Show error alert
          Alert.alert('Error', response.data.errorMessage || 'Failed to update the password.');
          reject(response.data.errorMessage || 'Failed to update the password.');
        }
      } catch (error) {
        console.error('Error during password reset:', error);
        // Show generic error alert
        Alert.alert('Error', 'Something went wrong. Please try again.');
        reject(error);
      }
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header Section with Back Button */}
      <View style={styles.UserProfileScreen_header}>
        <TouchableOpacity
          style={styles.UserProfileScreen_backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.UserProfileScreen_headerTitle}>Reset Password</Text>
      </View>

      <ScrollView contentContainerStyle={styles.ResetPasswordScreen_scrollContainer}>
        <View style={styles.ResetPasswordScreen_container}>
          <Text style={styles.ResetPasswordScreen_subHeaderText}>
            Enter your email, current, and new password to reset your password
          </Text>

          <View style={styles.ResetPasswordScreen_inputContainer}>
            <Text style={styles.ResetPasswordScreen_label}>Email</Text>
            <View style={styles.ResetPasswordScreen_inputWrapper}>
              <Text style={styles.ResetPasswordScreen_input}>{userName}</Text>
            </View>
          </View>

          <View style={styles.ResetPasswordScreen_inputContainer}>
            <Text style={styles.ResetPasswordScreen_label}>Current Password</Text>
            <View style={styles.ResetPasswordScreen_inputWrapper}>
              <TextInput
                style={styles.ResetPasswordScreen_input}
                placeholder="Enter current password"
                secureTextEntry={secureTextEntryCurrent}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.ResetPasswordScreen_eyeIcon}
                onPress={() => setSecureTextEntryCurrent(!secureTextEntryCurrent)}
              >
                <Ionicons name={secureTextEntryCurrent ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ResetPasswordScreen_inputContainer}>
            <Text style={styles.ResetPasswordScreen_label}>New Password</Text>
            <View style={styles.ResetPasswordScreen_inputWrapper}>
              <TextInput
                style={styles.ResetPasswordScreen_input}
                placeholder="Enter new password"
                secureTextEntry={secureTextEntryNew}
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.ResetPasswordScreen_eyeIcon}
                onPress={() => setSecureTextEntryNew(!secureTextEntryNew)}
              >
                <Ionicons name={secureTextEntryNew ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.ResetPasswordScreen_inputContainer}>
            <Text style={styles.ResetPasswordScreen_label}>Confirm New Password</Text>
            <View style={styles.ResetPasswordScreen_inputWrapper}>
              <TextInput
                style={styles.ResetPasswordScreen_input}
                placeholder="Confirm new password"
                secureTextEntry={secureTextEntryConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.ResetPasswordScreen_eyeIcon}
                onPress={() => setSecureTextEntryConfirm(!secureTextEntryConfirm)}
              >
                <Ionicons name={secureTextEntryConfirm ? 'eye-off' : 'eye'} size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.ResetPasswordScreen_button} onPress={handleResetPassword}>
            <Text style={styles.ResetPasswordScreen_buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ResetPasswordScreen_forgotPasswordButton}
            onPress={() => navigation.navigate('Forgot password')}
          >
            <Text style={styles.ResetPasswordScreen_forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  UserProfileScreen_header: {
    backgroundColor: 'darkgreen', // Example color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centers the title
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  UserProfileScreen_backButton: {
    position: 'absolute', // Ensures the back button stays on the left
    left: 10,
    zIndex: 1, // Keeps it above the centered title
  },

  UserProfileScreen_headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1, // Allows the title to occupy the remaining space
  },
  
  ResetPasswordScreen_scrollContainer: {
    padding: 20,
  },
  
  ResetPasswordScreen_container: {
    flex: 1,
    justifyContent: 'center',
  },

  ResetPasswordScreen_subHeaderText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },

  ResetPasswordScreen_inputContainer: {
    marginBottom: 20,
  },

  ResetPasswordScreen_label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  ResetPasswordScreen_inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  ResetPasswordScreen_input: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },

  ResetPasswordScreen_eyeIcon: {
    marginLeft: 10,
  },

  ResetPasswordScreen_button: {
    backgroundColor: 'darkgreen',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15,
  },

  ResetPasswordScreen_buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  ResetPasswordScreen_forgotPasswordButton: {
    alignSelf: 'center',
  },

  ResetPasswordScreen_forgotPasswordText: {
    color: 'darkgreen',
  },
});

export default ResetPasswordScreen;
