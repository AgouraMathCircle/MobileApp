import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Alert, SafeAreaView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import RNPickerSelect from 'react-native-picker-select';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import styles from '../Styles/styles.js';
import pickerSelectStyles from '../Styles/pickerSelectStyles.js';

const SubmitScreen = ({navigation}) => {
    return (
        <SafeAreaView style={[styles.container, {alignItems: 'center'},]}>
            <Text style={[styles.titleReportCard, { marginBottom: 30 }, {marginHorizontal: 70}, {marginTop: 40}]}>Registered Successfully</Text>

            <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>Return to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('StudentRegister')}>
                <Text style={styles.loginText}>Add Another Student</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default SubmitScreen