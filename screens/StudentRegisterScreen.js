// Import Modules
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import GlobalVariable from './gobal';

// Create the Student Registration Form
const StudentRegistration = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    pfirstName: '',
    plastName: '',
    pEmail: '',
    username: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    sfirstname: '',
    slastname: '',
    sEmail: '',
    school: '',
    grade: '',
    location: '',
    session: '',
    liabsignature: '',
    photopermission: false,
  });
  const [countries, setCountries] = useState([]);
  const [locations, setLocations] = useState([]);
  const [courseSessions, setCourseSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usernameOptions = [
    { label: `Student Username (${form.sEmail})`, value: form.sEmail },
    { label: `Parent Username (${form.pEmail})`, value: form.pEmail }
  ];

  const gradeSelect = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];

  // API Fetch Request to get the data required for the form dropdowns
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

  const handleSubmit = async () => {
    // Make sure all fields are filled out
    if (
      !form.pfirstName ||
      !form.plastName ||
      !form.pEmail ||
      !form.username ||
      !form.phone ||
      !form.city ||
      !form.state ||
      !form.country ||
      !form.sfirstname ||
      !form.slastname ||
      !form.sEmail ||
      !form.school ||
      !form.grade ||
      !form.location ||
      !form.session ||
      !form.liabsignature
    ) {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }

    // Transform form data to match API endpoint
    const data = {
      parentEmail: form.pEmail,
      username: form.username,
      parentFirstName: form.pfirstName,
      parentLastName: form.plastName,
      state: form.state,
      city: form.city,
      parentPhoneNo: form.phone,
      country: form.country,
      studentFirstName: form.sfirstname,
      studentLastName: form.slastname,
      studentEmail: form.sEmail,
      studentSchoolName: form.school,
      studentGrade: form.grade,
      locationId: form.location,
      sessionId: form.session,
      locationName: form.location,
      sessionName: form.session,
      liabilitySignature: form.liabsignature,
      ruleSignature: form.liabsignature,
      picturePermission: form.photopermission
    };

    try {
      // API Post Request to Submit Registration Form (Modify endpoint to Student Registration)
      const response = await fetch(GlobalVariable.AMCApiurl + 'StudentRegistration', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Clear form fields if successful
      if (response.ok) {
        setForm({
          pfirstName: '',
          plastName: '',
          pEmail: '',
          username: '',
          phone: '',
          city: '',
          state: '',
          country: '',
          sfirstname: '',
          slastname: '',
          sEmail: '',
          school: '',
          grade: '',
          location: '',
          session: '',
          liabsignature: '',
          photopermission: false,
        });
        navigation.navigate('ConfirmationScreen');
      } else {
        Alert.alert('Error', 'Failed to submit form. Please try again later.');
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to submit form. Please try again later.');
      console.error('Error submitting form:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#357a38" />;
  }

  // Form UI
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {step === 1 && (
          <View style={styles.formContainer}>
            <Text style={styles.header}>Student Registration</Text>
            <Text>Thank you for your interest in Agoura Math Circle!</Text>
            <Text style={{ fontWeight: 'bold', color: 'red' }}>
              Existing students, please do not use this page to register for ONLINE or ONSITE Math Circle classes. Instead, follow the separate registration instructions provided for returning students. This page is for new students only.
            </Text>
            <Text></Text>
            {/* Parent Information */}
            <Text style={styles.subHeader}>Parental Information</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={form.pfirstName}
              onChangeText={(value) => handleInputChange('pfirstName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={form.plastName}
              onChangeText={(value) => handleInputChange('plastName', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={form.pEmail}
              onChangeText={(value) => handleInputChange('pEmail', value)}
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
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('country', value)}
              items={countries}
              value={form.country}
              placeholder={{ label: 'Select your Country', value: null }}
              style={pickerSelectStyles}
            />
            <Button title="Next" onPress={nextStep} color="#357a38" />
          </View>
        )}

        {step === 2 && (
          <View style={styles.formContainer}>
            <Text style={styles.header}>Student Registration</Text>
            {/* Student Information */}
            <Text style={styles.subHeader}>Student Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Student First Name"
              value={form.sfirstname}
              onChangeText={(value) => handleInputChange('sfirstname', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Student Last Name"
              value={form.slastname}
              onChangeText={(value) => handleInputChange('slastname', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Student Email"
              value={form.sEmail}
              onChangeText={(value) => handleInputChange('sEmail', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="School"
              value={form.school}
              onChangeText={(value) => handleInputChange('school', value)}
            />
            {/* Grade Picker */}
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('grade', value)}
              items={gradeSelect}
              value={form.grade}
              placeholder={{ label: 'Select your Grade', value: null }}
              style={pickerSelectStyles}
            />
            {/* Course Location Picker */}
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('location', value)}
              items={locations}
              value={form.location}
              placeholder={{ label: 'Select your Course Location', value: null }}
              style={pickerSelectStyles}
            />

            {/* Course Session Picker */}
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('session', value)}
              items={courseSessions}
              value={form.session}
              placeholder={{ label: 'Register For', value: null }}
              style={pickerSelectStyles}
            />

            {/* Username Picker */}
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('username', value)}
              items={usernameOptions}
              value={form.username}
              placeholder={{ label: 'Username', value: null }}
              style={pickerSelectStyles}
            />

            <View style={styles.navigationButtons}>
              <Button title="Back" onPress={previousStep} color="#357a38" />
              <Button title="Next" onPress={nextStep} color="#357a38" />
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.formContainer}>
            <Text style={styles.header}>Student Registration</Text>
            {/* Legal Information */}
            <Text style={styles.subHeader}>Legal</Text>
            <Text style={styles.title}>Assumption of Risk, Waiver of Liability, and Indemnity Agreement</Text>
            <Text>
              I will not attempt to hold Agoura Math Circle, its directors, officers, teachers, volunteers, shareholders, members, employees, affiliates, sponsors, and/or insurers (all together, "Releasees") liable for any damages, injury, and/or loss to person or property one might sustain while participating in the Agoura Math Circle Program. I knowingly and voluntarily release Releasees from any and all liability whatsoever for any personal injury (including death) or property damage arising from participation in Agoura Math Circle's program including, without limitation, any incidental travel.
            </Text>
            <Text style={styles.title}>Rules/Expectations</Text>
            <Text>
              By joining the Agoura Math Circle students and parents agree to abide by the following rules:
              {/* List of rules */}
            </Text>
            {/* Signature */}
            <Text style={styles.title}>Sign Here:</Text>
            <Text>
              I have read and agree to the terms of the Assumption of Risk, Waiver of Liability, Indemnity Agreement, and Rules/Expectations
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Signature"
              value={form.liabsignature}
              onChangeText={(value) => handleInputChange('liabsignature', value)}
            />
            <TouchableOpacity onPress={() => handleInputChange('photopermission', !form.photopermission)}>
              <Text style={styles.checkbox}>
                {form.photopermission ? '✓' : '☐'} I give consent to use pictures and videos of my child for publicity purposes.
              </Text>
            </TouchableOpacity>

            <View style={styles.navigationButtons}>
              <Button title="Back" onPress={previousStep} color="#357a38" />
              <Button title="Submit" onPress={handleSubmit} color="#357a38" />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4' },
  scrollView: { padding: 20 },
  formContainer: { marginBottom: 20, backgroundColor: '#ffffff', borderRadius: 10, padding: 20, elevation: 5 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#357a38' },
  subHeader: { fontSize: 20, fontWeight: '600', marginVertical: 10, color: '#2c3e50' },
  input: { borderBottomWidth: 1, marginBottom: 15, padding: 12, borderColor: 'darkgreen', borderRadius: 8, fontSize: 16, color: '#34495e' },
  navigationButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  checkbox: { fontSize: 16, marginVertical: 10, color: '#7f8c8d' },
  title: { fontSize: 16, fontWeight: '600', marginVertical: 10, color: '#2c3e50', alignSelf: 'center' },
});

const pickerSelectStyles = {
  inputIOS: { fontSize: 16, paddingVertical: 12, paddingHorizontal: 10, borderWidth: 1, borderColor: 'darkgreen', borderRadius: 8, color: 'black', paddingRight: 30, marginVertical: 10 },
  inputAndroid: { fontSize: 16, paddingVertical: 8, paddingHorizontal: 10, borderWidth: 0.5, borderColor: 'darkgreen', borderRadius: 8, color: 'black', paddingRight: 30 },
};

export default StudentRegistration;
