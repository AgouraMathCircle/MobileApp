import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Editicon from '../assets/editusericon.png';
import GlobalVariable from './gobal';

const InstructordbDashboardScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [meetingSchedule, setMeetingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const [error, setError] = useState(null);
  const [scheduleError, setScheduleError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const userName = GlobalVariable.userName;
   const userFirstName = GlobalVariable.userFirstName;
   const chapterID = GlobalVariable.chapterID;
  const fetchData = async () => {
    try {
      const response = await fetch(GlobalVariable.AMCApiurl+'UserDashboardDetail', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName }),
      });

      if (response.ok) {
        const data = await response.json();

        // Process unread count
        const unreadMessageCount = JSON.parse(data.unreadMessageCount || '[]');
        setUnreadCount(unreadMessageCount[0]?.Total || 0);

        // Process announcement
        const dashboardMessages = JSON.parse(data.dashboardMessage || '[]');
        setAnnouncement(dashboardMessages.map(item => item.Message).join('\n\n'));

        // Process students list
        const studentsList = JSON.parse(data.studentsList || '[]');
        setStudents(studentsList);

        // Process meeting schedule
        const meetingScheduleList = JSON.parse(data.meetingSchedule || '[]');
        setMeetingSchedule(meetingScheduleList);
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
      <ScrollView contentContainerStyle={styles.Studentdb_scrollContent}>
        <View style={styles.Studentdb_header}>
          <View style={styles.Studentdb_headerRow}>
            <Text style={styles.Studentdb_headerText}>Welcome, {userFirstName}!</Text>
            <View style={styles.Studentdb_dateContainer}>
              <Text style={styles.Studentdb_headerText}>{new Date().toLocaleDateString()}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Message Center', { userName })} style={styles.Studentdb_navItem}>
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

        {/* Announcement Section */}
        <View style={styles.Studentdb_Container}>
          <View style={styles.Studentdb_announcementBox}>
            <Text style={styles.Studentdb_Title}>Announcement</Text>
            <Text style={styles.Studentdb_paraText}>{announcement || 'No announcements available.'}</Text>
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
                <Text style={styles.Studentdb_paraText}>Location: {meeting.EventLocation}</Text>
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
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>ID</Text>
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>Name</Text>
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>Class</Text>
            <Text style={[styles.Studentdb_tableHeaderText, { color: 'white' }]}>Location</Text>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#43A047" />
          ) : error ? (
            <Text style={styles.Studentdb_errorText}>{error}</Text>
          ) : students.length > 0 ? (
            students.map((student, index) => (
              <View key={`${student.StudentID}-${index}`} style={styles.Studentdb_tableRow}>
                <Text style={styles.Studentdb_tableCell}>{student.StudentID}</Text>
                <Text style={styles.Studentdb_tableCell}>{student.StudentName}</Text>
                <Text style={styles.Studentdb_tableCell}>{student.Class}</Text>
                <Text style={styles.Studentdb_tableCell}>{student.EventLocation}</Text>
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
  <TouchableOpacity onPress={() => navigation.navigate('Documents')} style={styles.Studentdb_navItem}>
          <MaterialIcons name="description" size={28} color="#fff" />
          <Text style={styles.Studentdb_navText}>Material</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Admin ReportCard', { userName })} style={styles.Studentdb_navItem}>
    <MaterialIcons name="insert-chart-outlined" size={28} color="#fff" />
    <Text style={styles.Studentdb_navText}>Report Card</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Timesheet', { userName })} style={styles.Studentdb_navItem}>
    <MaterialIcons name="assessment" size={28} color="#fff" />
    <Text style={styles.Studentdb_navText}>Timesheets</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('Message Center', { userName })} style={styles.Studentdb_navItem}>
    <MaterialIcons name="mail-outline" size={28} color="#fff" />
    <Text style={styles.Studentdb_navText}>Messages</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate('User Profile', { userName, userFirstName })} style={styles.Studentdb_navItem}>
    <MaterialIcons name="person" size={28} color="#fff" />
    <Text style={styles.Studentdb_navText}>Profile</Text>
  </TouchableOpacity>
</View>

   
    </View>
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
  textAlign: 'left',
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
  textAlign: 'left',
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

export default InstructordbDashboardScreen;
