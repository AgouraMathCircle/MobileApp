import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import GlobalVariable from './gobal';

export default function StudentsListScreen() {
  const route = useRoute();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = GlobalVariable.userName;
  const userFirstName = GlobalVariable.userFirstName;
  const chapterID = GlobalVariable.chapterID;

  useEffect(() => {
    const fetchStudentsList = async () => {
      try {
        const response = await fetch(GlobalVariable.AMCApiurl + 'GetStudentsList', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, chapterID }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students list');
        }

        const data = await response.json();
        setStudents(JSON.parse(data.message));
      } catch (error) {
        console.error('Error fetching students:', error);
        Alert.alert('Error fetching students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentsList();
  }, [userName, chapterID]);

  if (loading) {
    return <ActivityIndicator size="large" color="#357a38" style={styles.course_loading} />;
  }

  return (
    <View style={styles.course_container}>
      <Text style={styles.course_title}>Course List</Text>

      <ScrollView horizontal>
        <View style={styles.tableWrapper}>
          <View style={[styles.course_tableHeader, styles.tableRow]}>
            <Text style={[styles.course_tableHeaderText, styles.tableCell]}>ID</Text>
            <Text style={[styles.course_tableHeaderText, styles.tableCell]}>Name</Text>
            <Text style={[styles.course_tableHeaderText, styles.tableCell]}>Session</Text>
            <Text style={[styles.course_tableHeaderText, styles.tableCell]}>Class</Text>
            <Text style={[styles.course_tableHeaderText, styles.tableCell]}>Location</Text>
            <Text style={[styles.course_tableHeaderText, styles.tableCell]}>Reg Date</Text>
          </View>

          <ScrollView style={styles.course_verticalScrollView}>
            {students.map((item, index) => (
              <View key={`${item.StudentID}-${index}`} style={[styles.course_tableRow, styles.tableRow]}>
                <Text style={[styles.course_tableCell, styles.tableCell]}>{item.StudentID}</Text>
                <Text style={[styles.course_tableCell, styles.tableCell]}>{item.StudentName}</Text>
                <Text style={[styles.course_tableCell, styles.tableCell]}>{item.EventSession}</Text>
                <Text style={[styles.course_tableCell, styles.tableCell]}>{item.Class}</Text>
                <Text style={[styles.course_tableCell, styles.tableCell]}>{item.EventLocation}</Text>
                <Text style={[styles.course_tableCell, styles.tableCell]}>
                  {new Date(item.RegisteredDate).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  course_container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  course_title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableWrapper: {
    flex: 1,
    width: '100%',
  },
  course_tableHeader: {
    backgroundColor: '#357a38',
    paddingVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  course_tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    minWidth: 100,
  },
  course_tableCell: {
    color: '#333',
    paddingVertical: 8,
    textAlign: 'center',
    flex: 1,
    minWidth: 100,
  },
  course_tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  course_verticalScrollView: {
    maxHeight: Dimensions.get('window').height - 200, // To ensure scrollability within available space
  },
  course_loading: {
    marginTop: 50,
  },
});
