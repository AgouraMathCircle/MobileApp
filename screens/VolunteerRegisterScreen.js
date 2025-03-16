import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import GlobalVariable from './gobal';

const VolunteerRegistration = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    school: '',
    grade: '',
    registerFor: '',
    course: '',
    interest: '',
    about: '',
    signature: '',
    permission: false,
  });
  const [countries, setCountries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [interests, setInterests] = useState([]);
  const [courseSessions, setCourseSessions] = useState([]);
  const [volunteerGrades, setVolunteerGrades] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUtilityData = async () => {
    try {
      const response = await fetch(GlobalVariable.AMCApiurl + 'UtilityList');
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const data = await response.json();

      // Filter data by type and set to respective state
      setLocations(
        data.filter(item => item.type === 'Location').map(item => ({
          label: item.textField,
          value: item.valueField,
        }))
      );

      setCourseSessions(
        data.filter(item => item.type === 'Session').map(item => ({
          label: item.textField,
          value: item.valueField,
        }))
      );

      setCountries(
        data.filter(item => item.type === 'Country').map(item => ({
          label: item.textField,
          value: item.valueField,
        }))
      );

      setInterests(
        data.filter(item => item.type === 'Interest').map(item => ({
          label: item.textField,
          value: item.valueField,
        }))
      );

      setVolunteerGrades(
        data.filter(item => item.type === 'VolunteerGrade').map(item => ({
          label: item.textField,
          value: item.valueField,
        }))
      );

      setGrades(
        data.filter(item => item.type === 'Grade').map(item => ({
          label: item.textField,
          value: item.valueField,
        }))
      );

    } catch (error) {
      setError(error.message);
      Alert.alert('Error', 'Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUtilityData();
  }, []);

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const isFormComplete = () => {
    const { firstName, lastName, email, phone, city, state, country, school, grade, interest, about, signature } = form;
    return firstName && lastName && email && phone && city && state && country && school && grade && interest && about && signature && form.permission;
  };

  const handleSubmit = async () => {
    const data = {
      firstName: form.firstName,
      lastName: form.lastName,
      phoneNo: form.phone,
      city: form.city,
      state: form.state,
      country: form.country,
      email: form.email,
      schoolName: form.school,
      grade: form.grade,
      locationId: form.course, // Use selected course location
      sessionId: form.registerFor, // Use selected session
      interestedFor: form.interest,
      aboutyourself: form.about,
    };

    try {
      const response = await fetch(GlobalVariable.AMCApiurl + 'VolunteerRegistration', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          city: '',
          state: '',
          country: '',
          school: '',
          grade: '',
          registerFor: '',
          course: '',
          interest: '',
          about: '',
          signature: '',
          permission: false,
        });
        navigation.navigate('ConfirmationScreen');
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#357a38" />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {step === 1 && (
          <View style={styles.formContainer}>
            <Text style={styles.header}>Volunteer Registration</Text>
            <Text style={styles.subHeader}>Personal Information</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={form.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={form.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.email}
              onChangeText={(value) => handleInputChange('email', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={form.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={form.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={form.state}
              onChangeText={(value) => handleInputChange('state', value)}
            />
            {/* Country Picker */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('country', value)}
                items={countries}
                value={form.country}
                placeholder={{ label: 'Select your Country', value: null }}
                style={pickerSelectStyles}
                Icon={() => <Text style={styles.dropdownIcon}>▼</Text>}
              />
            </View>

            <Button title="Next" onPress={nextStep} color='#357a38' />
          </View>
        )}

        {step === 2 && (
          <View style={styles.formContainer}>
            <Text style={styles.header}>Volunteer Registration</Text>
            <Text style={styles.subHeader}>Educational Information</Text>
            <TextInput
              style={styles.input}
              placeholder="School/University"
              value={form.school}
              onChangeText={(value) => handleInputChange('school', value)}
            />
            {/* Grade Picker */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('grade', value)}
                items={grades}
                value={form.grade}
                placeholder={{ label: 'Select your Grade', value: null }}
                style={pickerSelectStyles}
                Icon={() => <Text style={styles.dropdownIcon}>▼</Text>}
              />
            </View>
            {/* Course Location Picker */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('course', value)}
                items={locations}
                value={form.course}
                placeholder={{ label: 'Select your Course Location', value: null }}
                style={pickerSelectStyles}
                Icon={() => <Text style={styles.dropdownIcon}>▼</Text>}
              />
            </View>

            {/* Interest Picker */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('interest', value)}
                items={interests}
                value={form.interest}
                placeholder={{ label: 'Select your Field of Interest', value: null }}
                style={pickerSelectStyles}
                Icon={() => <Text style={styles.dropdownIcon}>▼</Text>}
              />
            </View>

            {/* Course Session Picker */}
            <View style={styles.pickerContainer}>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange('registerFor', value)}
                items={courseSessions}
                value={form.registerFor}
                placeholder={{ label: 'Select your Course Session', value: null }}
                style={pickerSelectStyles}
                Icon={() => <Text style={styles.dropdownIcon}>▼</Text>}
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="About yourself"
              value={form.about}
              onChangeText={(value) => handleInputChange('about', value)}
            />
            <View style={styles.navigationButtons}>
              <Button title="Back" onPress={previousStep} color='#357a38' />
              <Button title="Next" onPress={nextStep} color='#357a38' />
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.formContainer}>
            <Text style={styles.header}>Volunteer Registration</Text>
            <Text style={styles.subHeader}>Confirmation</Text>
            <TextInput
              style={styles.input}
              placeholder="Signature"
              value={form.signature}
              onChangeText={(value) => handleInputChange('signature', value)}
            />
            <TouchableOpacity onPress={() => handleInputChange('permission', !form.permission)}>
              <Text style={styles.checkbox}>{form.permission ? '✓' : '☐'} I give permission to use my information.</Text>
            </TouchableOpacity>

            <View style={styles.navigationButtons}>
              <Button title="Back" onPress={previousStep} color='#357a38' />
              <Button title="Submit" onPress={handleSubmit} color='#357a38' disabled={!isFormComplete()} />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  scrollView: { padding: 20 },
  formContainer: { marginBottom: 20, backgroundColor: '#ffffff', borderRadius: 10, padding: 20, elevation: 5 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#357a38' },
  subHeader: { fontSize: 18, fontWeight: '600', marginVertical: 10, color: '#2c3e50' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 12, borderColor: 'darkgreen', borderRadius: 8, fontSize: 16, color: '#34495e' },
  pickerContainer: { marginBottom: 15, borderBottomWidth: 1, borderColor: 'darkgreen', borderRadius: 8 },
  dropdownIcon: { position: 'absolute', right: 10, top: 12, fontSize: 16, color: '#357a38' },
  navigationButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  checkbox: { fontSize: 16, marginVertical: 10, color: '#7f8c8d' },
});

const pickerSelectStyles = {
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 0, color: 'black', paddingRight: 30 },
  inputAndroid: { fontSize: 16, paddingVertical: 8, paddingHorizontal: 10, borderWidth: 0, color: 'black', paddingRight: 30 },
};

export default VolunteerRegistration;