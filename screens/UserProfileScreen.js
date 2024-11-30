// ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Linking } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ACElogo from '../assets/ACElogo.png';
import styles from '../Styles/MainStyles'; // Adjust the path as necessary
import GlobalVariable from './gobal';


const ProfileScreen = () => {
    const navigation = useNavigation();
    const userName = GlobalVariable.userName;
    const userFirstName = GlobalVariable.userFirstName;
    const chapterID = GlobalVariable.chapterID;

    const openYouTubeChannel = () => {
        Linking.openURL('http://www.youtube.com/@AgouraMathCircle');
    };

    return (
        <View style={styles.UserProfileScreen_container}>
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
                        <Text style={styles.UserProfileScreen_menuTitle}>Student Courses</Text>
                        <Text style={styles.UserProfileScreen_menuSubtitle}>View your courses</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Profileinformation', { userName })} style={styles.UserProfileScreen_menuItem}>
                    <MaterialIcons name="person-outline" size={24} color="#66BB6A" />
                    <View style={styles.UserProfileScreen_menuTextContainer}>
                        <Text style={styles.UserProfileScreen_menuTitle}>Profile Information</Text>
                        <Text style={styles.UserProfileScreen_menuSubtitle}>Student profile</Text>
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
        </View>
    );
};



export default ProfileScreen;
