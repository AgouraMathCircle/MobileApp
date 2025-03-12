import React from 'react';
import { View, Text, StyleSheet, Linking, ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import the icons you need
import { Ionicons } from '@expo/vector-icons'; // For the back icon
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const HelpAndSupportScreen = () => {
    const navigation = useNavigation(); // Initialize the navigation hook

    const openEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
    };

    const socialMediaLinks = [
        { icon: 'facebook', url: 'https://www.facebook.com/AgouraMathCircle/' },
        { icon: 'twitter', url: 'https://x.com/i/flow/login?redirect_after_login=%2Fagouramath' },
        { icon: 'instagram', url: 'https://www.instagram.com/agouramathcircle/' },
        { icon: 'linkedin', url: 'https://www.linkedin.com/company/agoura-math-circle/mycompany/' },
    ];

    return (
        <SafeAreaView  style={{ flex: 10 , backgroundColor: '#357a38'  } }>
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#ffffff" />
            </TouchableOpacity>

            <Text style={styles.title}>Contact Us</Text>

            <View style={styles.contactContainer}>
                <Text style={styles.sectionTitle}>Agoura Chapter</Text>
                <Text style={styles.contactText}>El Camino Real High School</Text>
                <Text style={styles.contactText}>5440 Valley Cir Blvd, Woodland Hills</Text>
                <Text style={styles.contactText}>CA 91367</Text>
                <TouchableOpacity onPress={() => openEmail('support@agouramathcircle.org')}>
                    <Text style={styles.emailText}>Email: support@agouramathcircle.org</Text>
                </TouchableOpacity>
            </View>

            {/* Contact Information for Other Sections */}
            {['Agoura Engineering Circle', 'Online Chapter', 'ACT/SAT/PSAT'].map((section, index) => (
                <View key={index} style={styles.contactContainer}>
                    <Text style={styles.sectionTitle}>{section}</Text>
                    <TouchableOpacity onPress={() => openEmail('support@agouramathcircle.org')}>
                        <Text style={styles.emailText}>Email: support@agouramathcircle.org</Text>
                    </TouchableOpacity>
                </View>
            ))}

            <Text style={styles.title}>We're Social</Text>
            <View style={styles.socialContainer}>
                {socialMediaLinks.map((link, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => Linking.openURL(link.url)}
                        style={styles.iconContainer}
                    >
                        <FontAwesome name={link.icon} size={28} color="#ffffff" />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
        </SafeAreaView>

    );      

};
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#357a38', // Green background
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff', // White text
        textAlign: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2a9d8f', // Teal color for section titles
        marginBottom: 5,
    },
    contactContainer: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#ffffff', // White background for contact sections
        borderRadius: 12, // Rounded corners
        elevation: 5, // Shadow for elevation
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    contactText: {
        fontSize: 16,
        color: '#333', // Dark text for readability
        marginBottom: 5, // Spacing between text elements
    },
    emailText: {
        fontSize: 16,
        color: '#007BFF', // Email link color
        textDecorationLine: 'underline',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    iconContainer: {
        marginHorizontal: 15, // More spacing between icons
        borderRadius: 50, // Round button for icon
        backgroundColor: '#007BFF', // Background color for icon container
        padding: 12, // Padding for better touch response
        elevation: 3, // Slight elevation effect
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 1, // Ensure the back button is on top
    },
});

export default HelpAndSupportScreen;
