import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import defaultProfPic from '../assets/profile-pic.png';
import RNPickerSelect from 'react-native-picker-select';
import { useRoute, useNavigation } from '@react-navigation/native';
import GlobalVariable from './gobal';

export default function StudentUserprofile() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    studentID,
    studentName,
    school,
    grade,
    city,
    phoneNumber,
    state,
    country,
  } = route.params || {};

  const [profileImage, setProfileImage] = useState(defaultProfPic);
  const [fName, setFName] = useState(studentName || '');
  const [schoolName, setSchoolName] = useState(school || '');
  const [cityName, setCityName] = useState(city || '');
  const [stateName, setStateName] = useState(state || '');
  const [countryName, setCountryName] = useState(country || 'united states');
  const [gradeValue, setGradeValue] = useState(grade || 'N/A');
  const [loading, setLoading] = useState(false);
  const [registerStatus, setRegisterStatus] = useState('Yes'); 

  const countryItems = [
    { label: 'United States', value: 'united states' },
    { label: 'Canada', value: 'canada' },
    { label: 'United Kingdom', value: 'united kingdom' },
    { label: 'China', value: 'china' },
    { label: 'India', value: 'india' },
    { label: 'Singapore', value: 'singapore' },
    { label: 'Mexico', value: 'mexico' },
    { label: 'Malaysia', value: 'malaysia' },
    { label: 'Other', value: 'other' },
  ];

  const grades = [
    { label: 'Grade 1', value: '1' },
    { label: 'Grade 2', value: '2' },
    { label: 'Grade 3', value: '3' },
    { label: 'Grade 4', value: '4' },
    { label: 'Grade 5', value: '5' },
    { label: 'Grade 6', value: '6' },
    { label: 'Grade 7', value: '7' },
    { label: 'Grade 8', value: '8' },
    { label: 'Grade 9', value: '9' },
    { label: 'Grade 10', value: '10' },
    { label: 'Grade 11', value: '11' },
    { label: 'Grade 12', value: '12' },
  ];

  const handleChangeAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);  // Set loading state to true while awaiting API response

    try {
      const response = await fetch(GlobalVariable.AMCApiurl+'UpdateStudentDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
        },
        body: JSON.stringify({
          studentId: studentID,
          studentFirstName: fName,
          studentLastName: '',
          studentEmailID: '',
          school: schoolName,
          gradeLevel: gradeValue,
          studentPhone: phoneNumber || '',
          city: cityName,
          country: countryName,
          state: stateName,
          memberType: '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Profile updated successfully!');
        navigation.navigate('Studentuser profile', {
          studentID,
          studentName: fName,
          school: schoolName,
          grade: gradeValue,
          city: cityName,
          phoneNumber,
          state: stateName,
          country: countryName,
        });
      } else {
        const data = await response.json();
        console.error('API Response:', data);
        throw new Error(data.message || 'Failed to update student details');
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', error.message || 'An error occurred while updating the profile.');
    } finally {
      setLoading(false);  // Set loading state back to false
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.rectangleContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handleChangeAvatar}>
            <Image
              source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Student ID:</Text>
          <Text style={styles.nonEditableText}>{studentID}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Student Name:</Text>
          <TextInput
            style={styles.input}
            value={fName}
            onChangeText={setFName}
            placeholder="Name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>School:</Text>
          <TextInput
            style={styles.input}
            value={schoolName}
            onChangeText={setSchoolName}
            placeholder="School"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Grade:</Text>
          <RNPickerSelect
            onValueChange={setGradeValue}
            items={grades}
            value={gradeValue}
            placeholder={{ label: 'Select your Grade', value: null }}
            style={pickerSelectStyles}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>City:</Text>
          <TextInput
            style={styles.input}
            value={cityName}
            onChangeText={setCityName}
            placeholder="City"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>State:</Text>
          <TextInput
            style={styles.input}
            value={stateName}
            onChangeText={setStateName}
            placeholder="State"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country:</Text>
          <RNPickerSelect
            onValueChange={setCountryName}
            items={countryItems}
            value={countryName}
            placeholder={{ label: 'Select your Country', value: null }}
            style={pickerSelectStyles}
          />
        </View>
        {registerStatus === 'Yes' ? (
  <>
    <Text style={styles.forFallText}>For Fall 2025</Text>
    <TouchableOpacity style={styles.updateButton} onPress={() => Alert.alert('Registered!')}>
      <Text style={styles.updateButtonText}>Click to Register</Text>
    </TouchableOpacity>
  </>
) : (
  <Text style={styles.comingSoonText}>Coming Soon...</Text>
)}


        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate} disabled={loading}>
          <Text style={styles.updateButtonText}>{loading ? 'Updating...' : 'Update'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  rectangleContainer: {
    width: '100%',
    backgroundColor: '#2E7D32',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 45,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  formContainer: {
    padding: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  inputContainer: {
    marginBottom: 10,
    width: '90%',
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  nonEditableText: {
    fontSize: 16,
    color: '#555',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  updateButton: {
    marginTop: 20,
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  forFallText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkgreen',
    marginBottom: 10,
    textAlign: 'center',
  },
});

const pickerSelectStyles = {
  inputIOS: {
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    marginBottom: 10,
  },
  inputAndroid: {
    height: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#000',
    marginBottom: 10,
  },
};
