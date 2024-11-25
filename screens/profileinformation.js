import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import GlobalVariable from './gobal';

export default function App() {
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const userName = GlobalVariable.userName;
   const userFirstName = GlobalVariable.userFirstName;
   const chapterID = GlobalVariable.chapterID;

  useEffect(() => {
    fetch(GlobalVariable.AMCApiurl+'GetStudentsList', {
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
        <TouchableOpacity onPress={() => toggleExpand(index)}>
          <Text style={styles.profile_info_heading}>Student Name: {student.StudentName}</Text>
          <Text style={styles.profile_info_classText}>Class: {student.Class}</Text>
          <Text style={styles.profile_info_expandIcon}>{isExpanded ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.profile_info_details}>
            <Text style={styles.profile_info_detailText}>School: {student.School}</Text>
            <Text style={styles.profile_info_detailText}>Grade: {student.Grade}</Text>
            <Text style={styles.profile_info_detailText}>Parent Name: {student.ParentName}</Text>
            <Text style={styles.profile_info_detailText}>City: {student.City}, {student.SState}</Text>
            <Text style={styles.profile_info_detailText}>Country: {student.Country}</Text>
            <Text style={styles.profile_info_detailText}>Email: {student.EmailAddress}</Text>
            <Text style={styles.profile_info_detailText}>Event Session: {student.EventSession}</Text>
            <Text style={styles.profile_info_detailText}>Program: {student.Program}</Text>
            <Text style={styles.profile_info_detailText}>Event Location: {student.EventLocation}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.profile_info_container}>
      <View style={styles.profile_info_header}>
        <Text style={styles.profile_info_title}>Student Info</Text>
      </View>
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
  );
}

const styles = StyleSheet.create({
  profile_info_container: {
    flex: 1,
    backgroundColor: '#e8f5e9', // Light green background
    padding: 10,
  },
  profile_info_header: {
    backgroundColor: '#1b5e20', // Dark green header
    padding: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 20,
  },
  profile_info_title: {
    color: '#ffffff', // White title text
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  profile_info_card: {
    backgroundColor: '#ffffff', // White background for each card
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#1b5e20',
  },
  profile_info_heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b5e20', // Dark green for the heading
    marginBottom: 5,
  },
  profile_info_classText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#388e3c', // Slightly lighter shade for class text
  },
  profile_info_expandIcon: {
    fontSize: 18,
    color: '#1b5e20',
    alignSelf: 'flex-end',
  },
  profile_info_details: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white', // Light green for details background
    borderRadius: 8,
  },
  profile_info_detailText: {
    color: 'black', // Green shade for detail text
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
