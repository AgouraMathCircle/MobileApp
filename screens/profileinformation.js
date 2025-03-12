import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView
import GlobalVariable from './gobal';

export default function App() {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const userName = GlobalVariable.userName;

  const navigation = useNavigation();

  useEffect(() => {
    fetch(GlobalVariable.AMCApiurl + 'GetStudentsList', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        chapterID: 0,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          try {
            const parsedData = JSON.parse(data.message);
            if (Array.isArray(parsedData)) {
              setStudentsData(parsedData);
            } else {
              console.error('Invalid data format:', parsedData);
            }
          } catch (error) {
            console.error('Error parsing student data:', error);
          }
        } else {
          console.error('No message field in the response:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
        setLoading(false);
      });
  }, [userName]);

  const toggleExpand = (index) => {
    setExpandedStudent(expandedStudent === index ? null : index);
  };

  const StudentCard = ({ student, index }) => {
    const isExpanded = expandedStudent === index;

    return (
      <View style={styles.profile_info_card}>
        <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.profile_info_headerRow}>
          <Text style={styles.profile_info_heading}>Student Name: {student.StudentName}</Text>
          
          <Text style={styles.profile_info_expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.profile_info_details}>
            <Text style={styles.profile_info_detailText}>Class: {student.Class}</Text>
            <Text style={styles.profile_info_detailText}>School: {student.School}</Text>
            <Text style={styles.profile_info_detailText}>Grade: {student.Grade}</Text>
            <Text style={styles.profile_info_detailText}>Parent Name: {student.ParentName}</Text>
            <Text style={styles.profile_info_detailText}>City: {student.City}, {student.SState}</Text>
            <Text style={styles.profile_info_detailText}>Country: {student.Country}</Text>
            <Text style={styles.profile_info_detailText}>Event Session: {student.EventSession}</Text>
            <Text style={styles.profile_info_detailText}>Program: {student.Program}</Text>
            <Text style={styles.profile_info_detailText}>Event Location: {student.EventLocation}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Section */}
      <View style={styles.profile_info_header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()} // Go back to the previous screen
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.profile_info_title}>Student Info</Text>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.profile_info_container}>
        {loading ? (
          <ActivityIndicator size="large" color="#1b5e20" />
        ) : studentsData.length > 0 ? (
          studentsData.map((student, index) => (
            <StudentCard key={index} student={student} index={index} />
          ))
        ) : (
          <Text style={styles.profile_info_errorText}>No student data available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e8f5e9', // Light green background
  },
  profile_info_container: {
    flex: 1,
    padding: 10,
  },
  profile_info_header: {
    backgroundColor: '#1b5e20', // Dark green header
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  backButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  backButtonText: {
    color: '#1b5e20', // Dark green text
    fontWeight: 'bold',
    fontSize: 16,
  },
  profile_info_title: {
    color: '#ffffff', // White title text
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40, // Space for back button
  },
  profile_info_card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#388e3c',
  },
  profile_info_headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profile_info_heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1b5e20',
  },
  profile_info_classText: {
    fontSize: 16,
    color: '#388e3c',
  },
  profile_info_expandIcon: {
    fontSize: 18,
    color: '#1b5e20',
  },
  profile_info_details: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f8e9',
    borderRadius: 8,
  },
  profile_info_detailText: {
    color: '#333',
    fontSize: 15,
    lineHeight: 22,
  },
  profile_info_errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
