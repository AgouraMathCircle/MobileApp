import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; // Install expo-linear-gradient for gradients
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalVariable from './gobal';

export default function StudentsListScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = GlobalVariable.userName;
  const chapterID = GlobalVariable.chapterID;

  useEffect(() => {
    const fetchStudentsList = async () => {
      try {
        const response = await fetch(GlobalVariable.AMCApiurl + 'GetStudentsList', {
          method: 'POST',
          headers: {
            Accept: '*/*',
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
    return <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={['darkgreen', 'darkgreen']}
        style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Student List</Text>
      </LinearGradient>

      {/* Table Section */}
      <ScrollView horizontal>
        <View style={styles.tableWrapper}>
          {/* Table Header */}
          <View style={[styles.tableHeader, styles.tableRow]}>
            <Text style={[styles.headerText, styles.tableCell]}>ID</Text>
            <Text style={[styles.headerText, styles.tableCell]}>Name</Text>
            <Text style={[styles.headerText, styles.tableCell]}>Session</Text>
            <Text style={[styles.headerText, styles.tableCell]}>Class</Text>
            <Text style={[styles.headerText, styles.tableCell]}>Location</Text>
            <Text style={[styles.headerText, styles.tableCell]}>Reg Date</Text>
          </View>

          {/* Table Rows */}
          <ScrollView style={styles.verticalScrollView}>
            {students.map((item, index) => (
              <View key={`${item.StudentID}-${index}`} style={[styles.tableRow, styles.card]}>
                <Text style={[styles.cardText, styles.tableCell]}>{item.StudentID}</Text>
                <Text style={[styles.cardText, styles.tableCell]}>{item.StudentName}</Text>
                <Text style={[styles.cardText, styles.tableCell]}>{item.EventSession}</Text>
                <Text style={[styles.cardText, styles.tableCell]}>{item.Class}</Text>
                <Text style={[styles.cardText, styles.tableCell]}>{item.EventLocation}</Text>
                <Text style={[styles.cardText, styles.tableCell]}>
                  {new Date(item.RegisteredDate).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableWrapper: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    padding: 10,
  },
  tableHeader: {
    backgroundColor: 'darkgreen',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    minWidth: 100,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardText: {
    color: '#333',
    textAlign: 'center',
    flex: 1,
    minWidth: 100,
    fontSize: 14,
  },
  verticalScrollView: {
    maxHeight: Dimensions.get('window').height - 300,
  },
  loadingIndicator: {
    marginTop: 50,
  },
});
