import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../Styles/MainStyles';
import GlobalVariable from './gobal';

const ResetPasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntryCurrent, setSecureTextEntryCurrent] = useState(true);
  const [secureTextEntryNew, setSecureTextEntryNew] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);
  const [message, setMessage] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const userName = GlobalVariable.userName;
   const userFirstName = GlobalVariable.userFirstName;
   const chapterID = GlobalVariable.chapterID;
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
          GlobalVariable.AMCApiurl+'ChangePassword',
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
          setMessage(response.data.message || 'Your password has been updated!');
          setMessageVisible(true);
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          resolve(response.data);
        } else {
          setMessage(response.data.errorMessage || 'Failed to update the password.');
          setMessageVisible(true);
          reject(response.data.errorMessage || 'Failed to update the password.');
        }
      } catch (error) {
        console.error('Error during password reset:', error);
        setMessage('Something went wrong. Please try again.');
        setMessageVisible(true);
        reject(error);
      }
    });
  };

  useEffect(() => {
    if (messageVisible) {
      const timer = setTimeout(() => {
        setMessageVisible(false);
        setMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [messageVisible]);

  return (
    <ScrollView contentContainerStyle={styles.ResetPasswordScreen_scrollContainer}>
      <View style={styles.UserProfileScreen_header}>
        <Text style={styles.UserProfileScreen_headerTitle}>Reset Password</Text>
      </View>
      <View style={styles.ResetPasswordScreen_container}>
        <Text style={styles.ResetPasswordScreen_subHeaderText}>
          Enter your email, current, and new password to reset your password
        </Text>

        {messageVisible && (
          <View style={styles.ResetPasswordScreen_messageBox}>
            <Text style={styles.ResetPasswordScreen_messageText}>{message}</Text>
          </View>
        )}

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
          <Text style={styles.ResetPasswordScreen_buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.ResetPasswordScreen_forgotPasswordButton}
          onPress={() => navigation.navigate('Forgot password')}
        >
          <Text style={styles.ResetPasswordScreen_forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ResetPasswordScreen;