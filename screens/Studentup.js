import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ACElogo from '../assets/ACElogo.png';
import styles from '../Styles/MainStyles'; // Adjust the path as necessary
import GlobalVariable from './gobal';
import NavigationStyles from '../Styles/NavigationStyles';

import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const userName = GlobalVariable.userName;
    const userFirstName = GlobalVariable.userFirstName;
    const userType = GlobalVariable.userType;

    const openYouTubeChannel = () => {
        Linking.openURL('http://www.youtube.com/@AgouraMathCircle');
    };

    return (
        <View style={{ flex: 3}}>
            {/* SafeAreaView for Profile Content */}
            <SafeAreaView style={styles.UserProfileScreen_container}>
                {/* Header */}
                <View style={styles.UserProfileScreen_header}>
                    <Text style={styles.UserProfileScreen_headerTitle}>Profile</Text>
                </View>

                {/* Profile Card */}
                <View style={styles.UserProfileScreen_profileCard}>
                    <Image
                        source={ACElogo} // Replace with the actual image URL
                        style={styles.UserProfileScreen_profileImage}
                    />
                    <View style={styles.UserProfileScreen_profileInfo}>
                        <Text style={styles.UserProfileScreen_profileName}>{userFirstName}</Text>
                        <Text style={styles.UserProfileScreen_profileUsername}>{userName}</Text>
                    </View>
                </View>

                {/* Menu Options */}
                <ScrollView style={styles.UserProfileScreen_menuContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('course', { userName })} style={styles.UserProfileScreen_menuItem}>
                        <MaterialIcons name="menu-book" size={24} color="#66BB6A" />
                        <View style={styles.UserProfileScreen_menuTextContainer}>
                            <Text style={styles.UserProfileScreen_menuTitle}>My Courses</Text>
                            <Text style={styles.UserProfileScreen_menuSubtitle}>View your courses</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Profileinformation', { userName })} style={styles.UserProfileScreen_menuItem}>
                        <MaterialIcons name="person-outline" size={24} color="#66BB6A" />
                        <View style={styles.UserProfileScreen_menuTextContainer}>
                            <Text style={styles.UserProfileScreen_menuTitle}>Profile Information</Text>
                            <Text style={styles.UserProfileScreen_menuSubtitle}>Manage your profile</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Reset Password', { userName })} style={styles.UserProfileScreen_menuItem}>
                        <MaterialIcons name="lock-outline" size={24} color="#66BB6A" />
                        <View style={styles.UserProfileScreen_menuTextContainer}>
                            <Text style={styles.UserProfileScreen_menuTitle}>Change Password</Text>
                            <Text style={styles.UserProfileScreen_menuSubtitle}>Secure your account</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.UserProfileScreen_menuItem}>
                        <MaterialIcons name="logout" size={24} color="#66BB6A" />
                        <View style={styles.UserProfileScreen_menuTextContainer}>
                            <Text style={styles.UserProfileScreen_menuTitle}>Log out</Text>
                            <Text style={styles.UserProfileScreen_menuSubtitle}>Log out of this account</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.UserProfileScreen_sectionTitle}>More</Text>

                    <TouchableOpacity onPress={openYouTubeChannel} style={styles.UserProfileScreen_menuItem}>
                        <AntDesign name="youtube" size={24} color="#66BB6A" />
                        <View style={styles.UserProfileScreen_menuTextContainer}>
                            <Text style={styles.UserProfileScreen_menuTitle}>Youtube channel</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('HelpAndSupportScreen')} style={styles.UserProfileScreen_menuItem}>
                        <MaterialIcons name="help-outline" size={24} color="#66BB6A" />
                        <View style={styles.UserProfileScreen_menuTextContainer}>
                            <Text style={styles.UserProfileScreen_menuTitle}>Help & Support</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Aboutus')} style={styles.UserProfileScreen_menuItem}>
                        <MaterialIcons name="info-outline" size={24} color="#66BB6A" />
                        <View style={styles.UserProfileScreen_menuTextContainer}>
                            <Text style={styles.UserProfileScreen_menuTitle}>About App</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>

               {/* Bottom Navigation */}
<View style={NavigationStyles.bottomNav}>
  <TouchableOpacity style={NavigationStyles.navItem} onPress={() => {
    if (GlobalVariable.userType === 'S') {
      navigation.navigate('Student Dashboard');
    } else if (GlobalVariable.userType === 'V') {
      navigation.navigate('Volunteer Dashboard');
    } else if (GlobalVariable.userType === 'I') {
      navigation.navigate('Instructor Dashboard');
    } else if (GlobalVariable.userType === 'A') {
      navigation.navigate('Administrator Dashboard');
    } else if (GlobalVariable.userType === 'C') {
      navigation.navigate('Coordinator Dashboard');
    } else {
      console.error('Unknown usertype:', GlobalVariable.userType);
    }
  }}>
    <MaterialIcons name="home" size={28} color="#fff" />
    <Text style={NavigationStyles.navText}>Home</Text>
  </TouchableOpacity>

  {/* Common Class Material option */}
  <TouchableOpacity onPress={() => navigation.navigate('Documents', { userName })} style={NavigationStyles.navItem}>
    <MaterialIcons name="description" size={28} color="#fff" />
    <Text style={NavigationStyles.navText}>Material</Text>
  </TouchableOpacity> {/* Timesheet Button - For Volunteers, Administrators, Instructors, and Coordinators */}
  {(userType === 'V' || userType === 'A' || userType === 'I' || userType === 'C') && (
    <TouchableOpacity onPress={() => navigation.navigate('Timesheet', { userName })} style={NavigationStyles.navItem}>
      <MaterialIcons name="assessment" size={28} color="#fff" />
      <Text style={NavigationStyles.navText}>Timesheets</Text>
    </TouchableOpacity>
  )}

  {/* Report Card Button - For Admin, Instructor, and Student */}
  {(userType === 'A' || userType === 'S' || userType === 'I' || userType === 'C') && (
    <TouchableOpacity onPress={() => {
      if (userType === 'A' || userType === 'I') {
        navigation.navigate('Admin ReportCard', { userName });
      } else if (userType === 'C') {
        navigation.navigate('Admin ReportCard', { userName });
      } else {
        navigation.navigate('Report Card');
      }
    }} style={NavigationStyles.navItem}>
      <MaterialIcons name="insert-chart-outlined" size={28} color="#fff" />
      <Text style={NavigationStyles.navText}>Scores</Text>
    </TouchableOpacity>
  )}


  {/* Messages Button - Common for all user types */}
  {userType !== 'V' && (
    <TouchableOpacity onPress={() => navigation.navigate('Message Center', { userName })} style={NavigationStyles.navItem}>
      <MaterialIcons name="mail-outline" size={28} color="#fff" />
      <Text style={NavigationStyles.navText}>Messages</Text>
    </TouchableOpacity>
  )}
  {/* Profile Button - Common for all user types */}
  <TouchableOpacity onPress={() => {
    if (GlobalVariable.userType === 'S') {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('User Profile', { userName, userFirstName });
    }
  }} style={NavigationStyles.navItem}>
    <MaterialIcons name="person" size={28} color="#fff" />
    <Text style={NavigationStyles.navText}>Profile</Text>
  </TouchableOpacity>
</View>
        </View>
    );
};

export default ProfileScreen;
