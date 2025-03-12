import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import logo from '../assets/ACElogo.png'; // Replace with your actual logo path
import styles from '../Styles/MainStyles';

const AboutUsScreen = () => {
    return (
        <ScrollView style={styles.AboutUsScreen_container}>
            <View style={styles.AboutUsScreen_header}>
                <Image source={logo} style={styles.AboutUsScreen_logo} />
                <Text style={styles.AboutUsScreen_title}>WHO ARE WE</Text>
                <Text style={styles.AboutUsScreen_subtitle}>Agoura Math Circle</Text>
            </View>
            <Text style={styles.AboutUsScreen_paragraph}>
                Agoura Math Circle offers diverse opportunities to cater to students' varied interests. Currently, we provide both online and on-site programs for math, and online programs for engineering and test preparation. Agoura Engineering Circle specifically allows high school students to apply their math skills in engineering contexts, and our test preparation courses assist students in achieving their desired scores in standardized tests such as the PSAT, SAT, and ACT.
            </Text>
            <Text style={styles.AboutUsScreen_paragraph}>
                As part of our Satellite program, we also collaborate with students, teachers, schools, and educational institutions to support the setup of their own clubs, study groups, or enrichment classes. Additionally, for young learners worldwide seeking to explore mathematical concepts, we maintain a dedicated YouTube channel.
            </Text>
            <Text style={styles.AboutUsScreen_paragraph}>
                The Agoura Math Circle, established by Pranav Kalyan in September 2015, is a student-led nonprofit community service organization registered as a 501(c)(3). Our mission is to provide free educational programs that emphasize problem-solving skills, equipping students for success in academics and real-world challenges.
            </Text>
            <Text style={styles.AboutUsScreen_paragraph}>
                We aim to boost students' confidence and problem-solving abilities, preparing them for any academic or practical task. Our ultimate objective is to lay a strong foundation for children, enhancing their critical thinking skills and inspiring them to aspire to prestigious universities, all within an engaging and enjoyable environment.
            </Text>
        </ScrollView>
    );
};



export default AboutUsScreen;
