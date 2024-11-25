import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import pickerSelectStyles from '../Styles/pickerSelectStyles';
import GlobalVariable from './gobal';

const ReportCard = () => {
    const [homeworkScore, setHomeworkScore] = useState('');
    const [quizScore, setQuizScore] = useState('');
    const [classworkScore, setClassworkScore] = useState('');
    const [session, setSession] = useState('');
    const [records, setRecords] = useState([]);
    const [students, setStudents] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showInputFields, setShowInputFields] = useState(false);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [allow, setAllow] = useState('yes');
    const userName = GlobalVariable.userName;
    const usertype = GlobalVariable.userType;

    useEffect(() => {
        fetchReportCardData();
    }, []);

    const fetchReportCardData = async () => {
        try {
            const response = await fetch(GlobalVariable.AMCApiurl + 'GetReportcard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName, userTypeMode: 'e' }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();

            if (data.isSuccess) {
                setRecords(JSON.parse(data.reportcard));
                setSessions(data.session.map(({ textField, valueField }) => ({ label: textField, value: valueField })));
                setStudents(data.studentDetailUtillity.map(({ textField, valueField }) => ({
                    label: textField,
                    value: valueField.trim().split("~")[1],
                })));
            } else {
                showMessage(data.errorMessage || 'Failed to load data.', 'error');
            }
        } catch (error) {
            console.error('Error fetching report card data:', error);
            showMessage('Failed to load report card data.', 'error');
        }
    };

    const addRecord = async () => {
        if (!homeworkScore || !quizScore || !classworkScore || !selectedStudent || !session) {
            showMessage('All fields are required.', 'error');
            return;
        }
        if ([quizScore, classworkScore, homeworkScore].some(score => isNaN(score))) {
            showMessage('Please enter valid numeric scores.', 'error');
            return;
        }

        const newRecord = {
            StudentName: selectedStudent,
            Session: session,
            HomeworkScore: homeworkScore,
            QuizScore: quizScore,
            ClassworkScore: classworkScore,
        };

        try {
            const response = await fetch(GlobalVariable.AMCApiurl + 'UpdateStudentsReportCard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentID: selectedStudent,
                    session,
                    quizTotalScore: 5,
                    quizReceivedScore: parseFloat(quizScore),
                    classTotalScore: 20,
                    classReceivedScore: parseFloat(classworkScore),
                    homeWorkTotalScore: 10,
                    homeWorkReceivedScore: parseFloat(homeworkScore),
                    homeWorkComments: comment,
                }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            setRecords(prev => [...prev, newRecord]);
            showMessage('Record added successfully.', 'success');
            resetForm();
        } catch (error) {
            console.error('Error updating report card:', error);
            showMessage('Failed to update report card.', 'error');
        }
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    const resetForm = () => {
        setHomeworkScore('');
        setQuizScore('');
        setClassworkScore('');
        setSession('');
        setSelectedStudent(null);
        setComment('');
    };

    const handleScoreChange = (setter, value, max) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue <= max) {
            setter(numericValue);
        } else {
            setter(max.toString());
        }
    };

    const formatText = (text) => {
        if (typeof text !== 'string') return text;
        const formatted = [];
        for (let i = 0; i < text.length; i += 10) {
            formatted.push(text.slice(i, i + 10));
        }
        return formatted.join('\n');
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            <View style={styles.reportCardContainer}>
                <Text style={styles.title}>Report Card</Text>
                <View style={styles.line} />

                {allow === 'yes' && usertype === 'S' && (
                    <TouchableOpacity style={styles.button} onPress={() => setShowInputFields(!showInputFields)}>
                        <Text style={styles.buttonText}>{showInputFields ? "Hide Input Fields" : "Update Score"}</Text>
                    </TouchableOpacity>
                )}

                {message.text ? (
                    <Text style={message.type === 'success' ? styles.successText : styles.errorText}>
                        {message.text}
                    </Text>
                ) : null}

                {showInputFields && (
                    <>
                        <PickerInput placeholder="--Student Name--" items={students} onValueChange={setSelectedStudent} />
                        <PickerInput placeholder="--Session--" items={sessions} onValueChange={setSession} />

                        <TextInput
                            style={styles.input}
                            placeholder="Quiz Score out of 5"
                            value={quizScore}
                            onChangeText={(value) => handleScoreChange(setQuizScore, value, 5)}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Classwork Score out of 20"
                            value={classworkScore}
                            onChangeText={(value) => handleScoreChange(setClassworkScore, value, 20)}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Homework Score out of 10"
                            value={homeworkScore}
                            onChangeText={(value) => handleScoreChange(setHomeworkScore, value, 10)}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity style={styles.button} onPress={addRecord}>
                            <Text style={styles.buttonText}>Add Record</Text>
                        </TouchableOpacity>
                    </>
                )}

                <ScrollView horizontal>
                    <View style={styles.tableContainer}>
                        <View style={styles.tableHeader}>
                            {["Name", "Semester", "Exam Type", "Total Score", "Your Score", "Exam Date"].map(header => (
                                <Text key={header} style={styles.tableHeaderText}>{header}</Text>
                            ))}
                        </View>
                        <FlatList
                            data={records}
                            renderItem={({ item, index }) => (
                                <View style={[styles.tableRow, index % 2 ? styles.oddRow : styles.evenRow]}>
                                    <Text style={styles.tableCell}>{formatText(item.StudentName)}</Text>
                                    <Text style={styles.tableCell}>{formatText(item.Semester)}</Text>
                                    <Text style={styles.tableCell}>{formatText(item.ExamType)}</Text>
                                    <Text style={styles.tableCell}>{formatText(item.TotalCredit)}</Text>
                                    <Text style={styles.tableCell}>{formatText(item.ReceivedCredit)}</Text>
                                    <Text style={styles.tableCell}>{formatText(item.ExamDate)}</Text>
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    );
};

const PickerInput = ({ placeholder, items, onValueChange }) => (
    <View style={styles.dropdownContainer}>
        <RNPickerSelect
            onValueChange={onValueChange}
            items={items}
            style={pickerSelectStyles}
            placeholder={{ label: placeholder, value: null, color: 'black' }}
        />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 20 },
    reportCardContainer: { backgroundColor: 'white', borderRadius: 10, padding: 15, elevation: 3, marginBottom: 20 },
    title: { fontSize: 24, fontWeight: 'bold', color: '#357a38', textAlign: 'center', marginBottom: 10 },
    line: { borderBottomColor: '#357a38', borderBottomWidth: 2, marginBottom: 10 },
    button: { backgroundColor: '#357a38', borderRadius: 5, paddingVertical: 10, alignItems: 'center', marginVertical: 10 },
    buttonText: { color: 'white', fontWeight: 'bold' },
    dropdownContainer: { marginVertical: 10 },
    input: { borderColor: '#357a38', borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 5, backgroundColor: '#fff' },
    successText: { color: 'green', fontSize: 16, textAlign: 'center', marginVertical: 8 },
    errorText: { color: 'red', fontSize: 16, textAlign: 'center', marginVertical: 8 },
    tableContainer: { width: '100%' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#357a38', justifyContent: 'space-between' },
    tableHeaderText: { padding: 8, fontWeight: 'bold', color: 'white', flex: 1, minWidth: 120, textAlign: 'center' },
    tableRow: { flexDirection: 'row', justifyContent: 'space-between' },
    evenRow: { backgroundColor: '#e1f5e1' },
    oddRow: { backgroundColor: '#f9f9f9' },
    tableCell: {
        padding: 8,
        color: '#000',
        flex: 1,
        minWidth: 120,
        textAlign: 'center',
        textAlignVertical: 'center',
        overflow: 'hidden',
    },
});

export default ReportCard;
