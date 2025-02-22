import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Editicon from '../assets/editusericon.png';
import GlobalVariable from './gobal';

const StudentDashboardScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [meetingSchedule, setMeetingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [scheduleError, setScheduleError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(0); // added state to hold the registration status
  const userName = GlobalVariable.userName;
  const userFirstName = GlobalVariable.userFirstName;
  const chapterID = GlobalVariable.chapterID;

  const fetchData = async () => {
    try {
      const response = await fetch(GlobalVariable.AMCApiurl + 'UserDashboardDetail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ userName, chapterID }),
      });

      const data = await response.json();

      if (data && data.isSuccess) {
        // Unread count
        const unreadData = JSON.parse(data.unreadMessageCount);
        setUnreadCount(unreadData[0].Total || 0);

        // Dashboard messages
        const dashboardMessages = JSON.parse(data.dashboardMessage);
        setAnnouncements(dashboardMessages);

        // Students
        const studentList = JSON.parse(data.studentsList);
        setStudents(studentList);

        // Meeting schedule
        const meetingData = JSON.parse(data.meetingSchedule);
        setMeetingSchedule(meetingData);

        } else {
        setError('Failed to load data.');
        setScheduleError('Failed to load meeting schedule.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data.');
      setScheduleError('Failed to load meeting schedule.');
    } finally {
      setLoading(false);
      setScheduleLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userName, chapterID]);

  return (
     <View style={{ flex: 3}}>
    <SafeAreaView style={styles.Studentdb_container}>
    <View style={styles.Studentdb_header}>
          <View style={styles.Studentdb_headerRow}>
            <Text style={styles.Studentdb_headerText}>Wellcome, {userFirstName}!</Text>
            <View style={styles.Studentdb_dateContainer}>
              <Text style={styles.Studentdb_headerText}>{new Date().toLocaleDateString()}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Message Center', { userName })}
                style={styles.Studentdb_navItem}
              >
                <View style={styles.Studentdb_mailboxContainer}>
                  <MaterialIcons name="mail-outline" size={24} color="#fff" />
                  {unreadCount > 0 && (
                    <View style={styles.Studentdb_unreadBadge}>
                      <Text style={styles.Studentdb_unreadCount}>{unreadCount}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      <ScrollView contentContainerStyle={styles.Studentdb_scrollContent}>
       

        {/* Announcement Section */}
        <View style={styles.Studentdb_Container}>
          <View style={styles.Studentdb_announcementBox}>
            <Text style={styles.Studentdb_Title}>Announcements</Text>
            {announcements.length > 0 ? (
              announcements.map((announcement, index) => (
                <Text key={index} style={styles.Studentdb_paraText}>
                  {announcement.Message}
                </Text>
              ))
            ) : (
              <Text style={styles.Studentdb_paraText}>No announcements available.</Text>
            )}
          </View>
        </View>

        {/* Meeting Schedule Section */}
        <View style={styles.Studentdb_Container}>
          <Text style={styles.Studentdb_Title}>Meeting Schedule</Text>
          {scheduleLoading ? (
            <ActivityIndicator size="large" color="#43A047" />
          ) : scheduleError ? (
            <Text style={styles.Studentdb_errorText}>{scheduleError}</Text>
          ) : meetingSchedule.length > 0 ? (
            meetingSchedule.map((meeting, index) => (
              <View key={`${meeting.StudentID}-${index}`} style={styles.Studentdb_meetingBox}>
                <Text style={styles.Studentdb_paraText}>{meeting.StudentName} ({meeting.ClassName})</Text>
                <Text style={styles.Studentdb_paraText}>Meeting Date: {meeting.MeetingDate}</Text>
                <Text style={styles.Studentdb_paraText}>Meeting ID: {meeting.MeetingID}</Text>
                <Text style={styles.Studentdb_paraText}>Passcode: {meeting.Passcode}</Text>
                <Text
                  style={[styles.Studentdb_paraText, styles.Studentdb_link]}
                  onPress={() => Linking.openURL(meeting.MeetingURL)}
                >
                  Join Zoom Meeting
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.Studentdb_errorText}>No meeting schedule available.</Text>
          )}
        </View>

        {/* Students Table */}
        <View style={styles.Studentdb_Container}>
          <Text style={styles.Studentdb_Title}>Students</Text>
          <View style={styles.Studentdb_tableHeader}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>Edit</Text>
            </View>
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>ID</Text>
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>Name</Text>
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>Semester</Text>
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>Class</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#43A047" />
          ) : error ? (
            <Text style={styles.Studentdb_errorText}>{error}</Text>
          ) : students.length > 0 ? (
            students.map((student, index) => (
              <View key={`${student.StudentID}-${index}`} style={styles.Studentdb_tableRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Studentuserprofile', {
                    studentName: student.StudentName,
                    grade: student.Grade,
                    location: student.EventLocation,
                    city: student.City,
                    state: student.SState,
                    country: student.Country,
                    school: student.School,
                    studentID: student.StudentID,
                    registrationsession:student.IsRegistrationOpen.split('~')[0], 
                    registrationStatus: student.IsRegistrationOpen.split('~')[1], 
                    chapter:student.Chapter, // Passing the registration status
                  })}
                  style={[styles.Studentdb_tableCell, styles.Studentdb_editButton]}
                >
                  <Image source={Editicon} style={styles.Studentdb_useredit} />
                </TouchableOpacity>
                <Text style={styles.Studentdb_tableCell}>{student.StudentID}</Text>
                <Text style={styles.Studentdb_tableCell}>{student.StudentName}</Text>
                <Text style={styles.Studentdb_tableCell}>{student.EventSession}</Text>
                <Text style={styles.Studentdb_tableCell}>{student.Class}-{student.EventLocation}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.Studentdb_errorText}>No students available.</Text>
          )}
        </View>
      </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <View style={styles.Studentdb_bottomNav}>
        <TouchableOpacity style={styles.Studentdb_navItem}>
          <MaterialIcons name="home" size={28} color="#fff" />
          <Text style={styles.Studentdb_navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Documents')} style={styles.Studentdb_navItem}>
          <MaterialIcons name="description" size={28} color="#fff" />
          <Text style={styles.Studentdb_navText}>Material</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Report Card')} style={styles.Studentdb_navItem}>
          <MaterialIcons name="assessment" size={28} color="#fff" />
          <Text style={styles.Studentdb_navText}>Scores</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Message Center')} style={styles.Studentdb_navItem}>
          <MaterialIcons name="message" size={28} color="#fff" />
          <Text style={styles.Studentdb_navText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.Studentdb_navItem}>
          <MaterialIcons name="account-circle" size={28} color="#fff" />
          <Text style={styles.Studentdb_navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
};

// Student User Profile Screen
const StudentUserProfile = ({ route }) => {
  const {
    studentName,
    grade,
    location,
    city,
    state,
    country,
    school,
    studentID,
    isRegistrationOpen,
  } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>{studentName}'s Profile</Text>
      <Text>Grade: {grade}</Text>
      <Text>Location: {location}</Text>
      <Text>City: {city}</Text>
      <Text>State: {state}</Text>
      <Text>Country: {country}</Text>
      <Text>School: {school}</Text>
      <Text>Student ID: {studentID}</Text>
      <Text>Registration Status: {isRegistrationOpen === 1 ? 'Open' : 'Closed'}</Text>
      {/* Other profile details */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  Studentdb_container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
   
  },
  Studentdb_scrollContent: {
    padding: 16,
  },
  Studentdb_header: {
    padding: 16,
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  Studentdb_headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Studentdb_dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Studentdb_mailboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  Studentdb_headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Studentdb_unreadBadge: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 4,
    marginLeft: 4,
  },
  Studentdb_unreadCount: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Studentdb_Container: {
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Studentdb_announcementBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
  },
  Studentdb_meetingBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 16,
    paddingTop: 8,
  },
  Studentdb_Title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'darkgreen'
  },
  Studentdb_paraText: {
    fontSize: 16,
    marginBottom: 8,
  },
  Studentdb_errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  Studentdb_tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    backgroundColor: 'darkgreen',
    borderRadius: 10,
    padding: 8,
  },
  Studentdb_tableHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Studentdb_tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  Studentdb_tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  Studentdb_editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Studentdb_useredit: {
    width: 24,
    height: 24,
  },
  Studentdb_link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  Studentdb_bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: 'darkgreen',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  Studentdb_navItem: {
    alignItems: 'center',
  },
  Studentdb_navText: {
    fontSize: 12,
    color: '#fff',
  },
  });

export default StudentDashboardScreen;
