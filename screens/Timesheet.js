import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button, IconButton, Divider, Text, Snackbar } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import { useRoute } from '@react-navigation/native';
import GlobalVariable from './gobal';
import { useNavigation } from '@react-navigation/native';
import pickerSelectStyles from '../Styles/pickerSelectStyles';
import NavigationStyles from '../Styles/NavigationStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const taskOptions = [
    { label: 'Miscellaneous Work', value: 'Miscellaneous Work' },
    { label: 'Operational Support', value: 'Operational Support' },
    { label: 'Administrative Work', value: 'Administrative Work' },
    { label: 'Documentation Work', value: 'Documentation Work' },
    { label: 'Tutoring', value: 'Tutoring' },
    { label: 'Class Coordinator', value: 'Class Coordinator' },
    { label: 'Facility Inspection', value: 'Facility Inspection' },
    { label: 'Grading', value: 'Grading' },
    { label: 'Yard Duty', value: 'Yard Duty' },
    { label: 'Others', value: 'Others' },
];

export default function App() {
    const [timeEntries, setTimeEntries] = useState([]);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const userName = GlobalVariable.userName;
    const userFirstName = GlobalVariable.userFirstName;
    const chapterID = GlobalVariable.chapterID;
    const userType = GlobalVariable.userType;
    const navigation = useNavigation();

    const [form, setForm] = useState({
        taskName: '',
        volunteerDate: new Date(),
        startTime: '10:00 AM',
        endTime: '2:00 PM',
        taskDetails: '',
    });
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        fetch(GlobalVariable.AMCApiurl + 'GetTimesheetList', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.isSuccess) {
                    let entries = [];
                    if (typeof data.message === 'string') {
                        entries = JSON.parse(data.message);
                    }
                    if (Array.isArray(entries)) {
                        const formattedEntries = entries.map((entry) => ({
                            id: entry.LogID,
                            name: entry.Name,
                            task: entry.TaskName,
                            date: entry.DateVolunteer,
                            startTime: entry.StartTime,
                            endTime: entry.EndTime,
                            totalHours: entry.TotalHours,
                            taskDetails: entry.TaskDescription,
                        }));
                        setTimeEntries(formattedEntries);
                    }
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [userName]);

    const generateTimeOptions = () => {
        const options = [];
        const periods = ['AM', 'PM'];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${((hour % 12) || 12).toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${periods[Math.floor(hour / 12)]}`;
                options.push({ label: time, value: time });
            }
        }
        return options;
    };

    const timeOptions = generateTimeOptions();

    const handleAddUpdate = () => {
        return new Promise((resolve, reject) => {
            if (!form.taskName || !form.taskDetails || !form.startTime || !form.endTime) {
                console.error('Please fill all fields');
                reject('Please fill all fields');
                return;
            }

            const [startHour, startMinute, startType] = form.startTime.split(/:| /);
            const [endHour, endMinute, endType] = form.endTime.split(/:| /);
            const volunteerDateISO = form.volunteerDate.toISOString();

            const postData = {
                logID: "0",
                userName,
                taskName: form.taskName,
                volunteerDate: volunteerDateISO,
                startHour,
                startmin: startMinute,
                startType,
                endHour,
                endmin: endMinute,
                endType,
                taskDescription: form.taskDetails,
            };

            fetch(GlobalVariable.AMCApiurl + 'TimeSheetEntry', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.isSuccess) {
                        console.log('Time sheet entry submitted successfully:', data);
                        setForm({
                            taskName: '',
                            volunteerDate: new Date(),
                            startTime: '10:00 AM',
                            endTime: '2:00 PM',
                            taskDetails: '',
                        });
                        setSnackbarMessage('Submitted successfully!');
                        setSnackbarVisible(true);
                        resolve(data);
                    } else {
                        console.error('Error submitting time sheet entry:', data.errorMessage || data.message);
                        reject(data.errorMessage || data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    };

    const handleDelete = (logId) => {
        return new Promise((resolve, reject) => {
            const postData = { logid: logId };

            fetch(GlobalVariable.AMCApiurl + 'TimeSheetEntryRemove', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.isSuccess) {
                        console.log('Time sheet entry deleted successfully:', data);
                        setTimeEntries(prevEntries => prevEntries.filter(entry => entry.id !== logId));
                        resolve(data);
                    } else {
                        console.error('Error deleting time sheet entry:', data.errorMessage || data.message);
                        reject(data.errorMessage || data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    };

    const onDismissSnackBar = () => setSnackbarVisible(false);

    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.Timesheet_container}>
                    {/* Headline and Content */}
                    <Text style={styles.Timesheet_headline}>TimeSheet</Text>

                    <ScrollView horizontal>
                        <View>
                            <View style={styles.Timesheet_tableHeader}>
                                <Text style={[styles.Timesheet_tableHeaderText, styles.Timesheet_headerNumber]}>#</Text>
                                <Text style={styles.Timesheet_tableHeaderText}>Task</Text>
                                <Text style={styles.Timesheet_tableHeaderText}>Date</Text>
                                <Text style={styles.Timesheet_tableHeaderText}>Start</Text>
                                <Text style={styles.Timesheet_tableHeaderText}>End</Text>
                                <Text style={styles.Timesheet_tableHeaderText}>Total</Text>
                                <Text style={styles.Timesheet_tableHeaderText}>Actions</Text>
                            </View>
                            <View>
                                {timeEntries.length > 0 ? (
                                    timeEntries.map((entry, index) => (
                                        <View style={styles.Timesheet_tableRow} key={entry.id}>
                                            <Text style={[styles.Timesheet_tableCell, styles.Timesheet_cellNumber]}>{index + 1}</Text>
                                            <Text style={styles.Timesheet_tableCell}>{entry.task}</Text>
                                            <Text style={styles.Timesheet_tableCell}>{entry.date}</Text>
                                            <Text style={styles.Timesheet_tableCell}>{entry.startTime}</Text>
                                            <Text style={styles.Timesheet_tableCell}>{entry.endTime}</Text>
                                            <Text style={styles.Timesheet_tableCell}>{entry.totalHours}</Text>
                                            <View style={styles.Timesheet_actionButtons}>
                                                <IconButton icon="delete" onPress={() => handleDelete(entry.id)} />
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.Timesheet_noEntriesText}>No time entries available</Text>
                                )}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Time Entry Form */}
                    <Text style={styles.Timesheet_formHeader}>Add/Update Time Sheet</Text>
                    <Divider />

                    {/* Task Name Dropdown */}
                    <View style={styles.pickerContainer}>
                        <Text>Task Name:</Text>
                        <RNPickerSelect
                            onValueChange={(itemValue) => setForm({ ...form, taskName: itemValue })}
                            items={taskOptions}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                            }}
                            value={form.taskName}
                            placeholder={{ label: 'Select Task Name', value: null }}
                            Icon={() => {
                                return <MaterialIcons name="arrow-drop-down" size={24} color="gray" />;
                            }}
                        />
                    </View>

                    {/* Picker and Form Fields */}
                    <Button mode="outlined" onPress={() => setShowDatePicker(true)} style={styles.Timesheet_button}>
                        <Text style={styles.Timesheet_buttonText}>
                            Select Volunteer Date: {form.volunteerDate.toDateString()}
                        </Text>
                    </Button>

                    {showDatePicker && (
                        <DateTimePicker
                            value={form.volunteerDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                setForm({ ...form, volunteerDate: selectedDate || form.volunteerDate });
                            }}
                        />
                    )}

                    <View style={styles.pickerContainer}>
                        <Text>Start Time:</Text>
                        <RNPickerSelect
                            onValueChange={(itemValue) => setForm({ ...form, startTime: itemValue })}
                            items={timeOptions}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                            }}
                            value={form.startTime}
                            placeholder={{ label: 'Select Start Time', value: null }}
                            Icon={() => {
                                return <MaterialIcons name="arrow-drop-down" size={24} color="gray" />;
                            }}
                        />
                    </View>

                    <View style={styles.pickerContainer}>
                        <Text>End Time:</Text>
                        <RNPickerSelect
                            onValueChange={(itemValue) => setForm({ ...form, endTime: itemValue })}
                            items={timeOptions}
                            style={{
                                ...pickerSelectStyles,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                            }}
                            value={form.endTime}
                            placeholder={{ label: 'Select End Time', value: null }}
                            Icon={() => {
                                return <MaterialIcons name="arrow-drop-down" size={24} color="gray" />;
                            }}
                        />
                    </View>

                    <TextInput
                        style={styles.Timesheet_input}
                        placeholder="Task Details"
                        value={form.taskDetails}
                        onChangeText={(text) => setForm({ ...form, taskDetails: text })}
                    />

                    <Button mode="contained" onPress={handleAddUpdate} style={styles.Timesheet_button}>
                        <Text style={styles.Timesheet_buttonText}>Submit</Text>
                    </Button>
                </ScrollView>

                {/* Snackbar for success message */}
                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={onDismissSnackBar}
                    duration={3000}
                    action={{
                        label: 'Dismiss',
                        onPress: onDismissSnackBar,
                    }}>
                    {snackbarMessage}
                </Snackbar>
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
                </TouchableOpacity>

                {/* Timesheet Button - For Volunteers, Administrators, Instructors, and Coordinators */}
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
                        navigation.navigate('User Profile', { userName });
                    }
                }} style={NavigationStyles.navItem}>
                    <MaterialIcons name="person" size={28} color="#fff" />
                    <Text style={NavigationStyles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Timesheet_container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    Timesheet_tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        backgroundColor: 'darkgreen',
        borderRadius: 10,
        padding: 8,
    },
    Timesheet_tableHeaderText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        paddingHorizontal: 10,
    },
    Timesheet_headerNumber: {
        flex: 0.5,
    },
    Timesheet_tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 4,
    },
    Timesheet_tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 5,
        paddingHorizontal: 15,
        color: '#000',
    },
    Timesheet_cellNumber: {
        flex: 0.5,
    },
    Timesheet_actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'left',
        flex: 1,
    },
    Timesheet_formHeader: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    Timesheet_input: {
        borderWidth: 1,
        borderColor: 'darkgreen',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    Timesheet_headline: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#357a38',
    },
    pickerContainer: {
        marginVertical: 10,
    },
    Timesheet_button: {
        marginVertical: 10,
        backgroundColor: 'darkgreen',
        borderColor: '#fff',
    },
    Timesheet_buttonText: {
        color: '#fff',
    },
    Timesheet_noEntriesText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});