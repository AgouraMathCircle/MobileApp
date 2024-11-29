import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import defaultProfPic from '../assets/profile-pic.png';
import RNPickerSelect from 'react-native-picker-select';
import { useRoute, useNavigation } from '@react-navigation/native';
import CheckBox from 'react-native-check-box'; // Updated import
import GlobalVariable from './gobal';


export default function ProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const 
  {
    studentID,
    studentName,
    school,
    grade,
    city,
    phoneNumber,
    state,
    country,
    location,
    chapter,
    registrationStatus,
    registrationsession,  
  } = route.params || {};

   
  const [profileImage, setProfileImage] = useState(defaultProfPic);
  const [fName, setFName] = useState(studentName || 'DemoFirst');
  const [schoolName, setSchoolName] = useState(school || '');
  const [cityName, setCityName] = useState(city || '');
  const [stateName, setStateName] = useState(state || '');
  const [countryName, setCountryName] = useState(country || 'united states');
  const [gradeValue, setGradeValue] = useState(grade || 'N/A');
  const [isRegistered, setIsRegistered] = useState(false); // State for checkbox

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
    try {
      const response = await fetch(GlobalVariable.AMCApiurl+'UpdateStudentDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
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
          memberType: GlobalVariable.userType,
          registrationUpdate:  registrationStatus, // Pass 'Y' or 'N'
          registrationUserName: GlobalVariable.userName,
          registrationSession: registrationsession,
          registrationLocation: location,
          registrationChapter: chapter,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update student details');
      }

      Alert.alert('Profile updated successfully!');
      navigation.navigate('ProfileScreen', {
        studentID,
        studentName: fName,
        school: schoolName,
        grade: gradeValue,
        city: cityName,
        phoneNumber,
        state: stateName,
        country: countryName,
      });
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while updating the profile.');
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
            items={[
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
            ]}
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
            items={[
              { label: 'United States', value: 'united states' },
              { label: 'Canada', value: 'canada' },
              { label: 'United Kingdom', value: 'united kingdom' },
              { label: 'China', value: 'china' },
              { label: 'India', value: 'india' },
              { label: 'Singapore', value: 'singapore' },
              { label: 'Mexico', value: 'mexico' },
              { label: 'Malaysia', value: 'malaysia' },
              { label: 'Other', value: 'other' },
            ]}
            value={countryName}
            placeholder={{ label: 'Select your Country', value: null }}
            style={pickerSelectStyles}
          />
        </View>
        
         <View style={styles.checkboxContainer}>
         <Text style={styles.label}>Registration Status:</Text>
         <Text style={styles.nonEditableText}>{registrationStatus}</Text>
         {registrationStatus==='Not Registered' && (
            <CheckBox
             style={{ padding: 10 }}
             onClick={() => {
               const newChecked = !isRegistered;
               setIsRegistered(newChecked);
               setRegistrationStatus(newChecked ? 'Y' : 'N');
             }}
             isChecked={isRegistered}
             rightText="Register for Next Session" 
           />
         )}
      </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update</Text>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    marginVertical: 10,
    width: '90%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
