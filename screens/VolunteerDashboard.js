import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import styles from '../Styles/MainStyles';
import GlobalVariable from './gobal';

const VolunteerDashboardScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [meetingSchedule, setMeetingSchedule] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleLoading, setScheduleLoading] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const [error, setError] = useState(null);
  const [scheduleError, setScheduleError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const userName = GlobalVariable.userName;
  const userFirstName = GlobalVariable.userFirstName;
  const chapterID = GlobalVariable.chapterID;
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Single API request
        const response = await fetch(GlobalVariable.AMCApiurl+'UserDashboardDetail', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, chapterID }),
        });

        if (response.ok) {
          const data = await response.json();

          // Process unread message count
          const unreadCountData = JSON.parse(data.unreadMessageCount || '[]');
          setUnreadCount(unreadCountData[0]?.Total || 0);

          // Announcements
          const announcementData = JSON.parse(data.dashboardMessage || '[]');
          setAnnouncement(announcementData.map(item => item.Message).join('\n\n') || 'No announcements available.');

          // Process students list
          const studentList = JSON.parse(data.studentsList || '[]');
          setStudents(studentList);

          // Meeting schedule
          const meetingData = JSON.parse(data.meetingSchedule || '[]');
          setMeetingSchedule(meetingData);

          // Time entries
          const timeEntriesData = JSON.parse(data.timesheetList || '[]');
          setTimeEntries(timeEntriesData);

        } else {
          setError('Failed to load data.');
          setScheduleError('Failed to load meeting schedule.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
        setScheduleError('Failed to load meeting schedule.');
      } finally {
        setLoading(false);
        setScheduleLoading(false);
      }
    };

    fetchData();
  }, [userName, chapterID]);

  return (
    <View style={{ flex: 3}}>
    <SafeAreaView style={styles.Volunteerdb_container}>
        <View style={styles.Volunteerdb_header}>
          <View style={styles.Volunteerdb_headerRow}>
            <Text style={styles.Volunteerdb_headerText}>Welcome , {userFirstName}!</Text>
            <View style={styles.Volunteerdb_dateContainer}>
              <Text style={styles.Volunteerdb_headerText}>{new Date().toLocaleDateString()}</Text>
             
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.Volunteerdb_scrollContent}>

        {/* Announcement Section */}
        <View style={styles.Volunteerdb_Container}>
          <View style={styles.Volunteerdb_announcementBox}>
            <Text style={styles.Volunteerdb_Title}>Announcement</Text>
            <Text style={styles.Volunteerdb_paraText}>{announcement}</Text>
          </View>
        </View>

        {/* Meeting Schedule Section */}
        <View style={styles.Volunteerdb_Container}>
          <Text style={styles.Volunteerdb_Title}>Meeting Schedule</Text>
          {scheduleLoading ? (
            <ActivityIndicator size="large" color="#43A047" />
          ) : scheduleError ? (
            <Text style={styles.Volunteerdb_errorText}>{scheduleError}</Text>
          ) : meetingSchedule.length > 0 ? (
            meetingSchedule.map((meeting, index) => (
              <View key={`${meeting.StudentID}-${index}`} style={styles.Volunteerdb_meetingBox}>
                <Text style={styles.Volunteerdb_paraText}>{meeting.StudentName} ({meeting.ClassName})</Text>
                <Text style={styles.Volunteerdb_paraText}>Meeting Date: {meeting.MeetingDate}</Text>
                <Text style={styles.Volunteerdb_paraText}>Meeting ID: {meeting.MeetingID}</Text>
                <Text style={styles.Volunteerdb_paraText}>Passcode: {meeting.Passcode}</Text>
                <Text style={styles.Volunteerdb_paraText}>Location: {meeting.EventLocation}</Text>
                <Text
                  style={[styles.Volunteerdb_paraText, styles.Volunteerdb_link]}
                  onPress={() => Linking.openURL(meeting.MeetingURL)}
                >
                  Join Zoom Meeting
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.Volunteerdb_errorText}>No meeting schedule available.</Text>
          )}
        </View>

        {/* Time Sheets Table */}
        <View style={styles.Volunteerdb_Container}>
          <Text style={styles.Volunteerdb_Title}>Time Sheets</Text>
          <View style={styles.Volunteerdb_tableHeader}>
            <Text style={[styles.Volunteerdb_tableHeaderText, styles.Volunteerdb_headerNumber]}>#</Text>
            <Text style={styles.Volunteerdb_tableHeaderText}>Name</Text>
            <Text style={styles.Volunteerdb_tableHeaderText}>Task</Text>
            <Text style={styles.Volunteerdb_tableHeaderText}>Date</Text>
            
            <Text style={styles.Volunteerdb_tableHeaderText}>Total</Text>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#43A047" />
          ) : timeEntries.length > 0 ? (
            timeEntries.map((entry, index) => (
              <View style={styles.Volunteerdb_tableRow} key={entry.LogID}>
                <Text style={[styles.Volunteerdb_tableCell, styles.Volunteerdb_cellNumber]}>{index + 1}</Text>
                <Text style={styles.Volunteerdb_tableCell}>{entry.Name}</Text>
                <Text style={styles.Volunteerdb_tableCell}>{entry.TaskName}</Text>
                <Text style={styles.Volunteerdb_tableCell}>{entry.DateVolunteer}</Text>
              
                <Text style={styles.Volunteerdb_tableCell}>{entry.TotalHours}</Text>
              </View>
            ))
          ) : (
            <Text>No time entries available.</Text>
          )}
        </View>
      </ScrollView>
      </SafeAreaView>


      {/* Bottom Navigation */}
      <View style={styles.Volunteerdb_bottomNav}>
        <TouchableOpacity style={styles.Volunteerdb_navItem}>
          <MaterialIcons name="home" size={28} color="#fff" />
          <Text style={styles.Volunteerdb_navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Documents')} style={styles.Volunteerdb_navItem}>
          <MaterialIcons name="description" size={28} color="#fff" />
          <Text style={styles.Volunteerdb_navText}>Material</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Timesheet', { userName })} style={styles.Volunteerdb_navItem}>
          <MaterialIcons name="assessment" size={28} color="#fff" />
          <Text style={styles.Volunteerdb_navText}>Timesheets</Text>
        </TouchableOpacity>
       
        <TouchableOpacity onPress={() => navigation.navigate('User Profile')} style={styles.Volunteerdb_navItem}>
          <MaterialIcons name="person" size={28} color="#fff" />
          <Text style={styles.Volunteerdb_navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VolunteerDashboardScreen;
