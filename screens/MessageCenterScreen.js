import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Image, ActivityIndicator,  ScrollView, SafeAreaView, useAnimatedValue } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import
import pickerSelectStyles from '../Styles/pickerSelectStyles';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GlobalVariable from './gobal';
import NavigationStyles from '../Styles/NavigationStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';






const MessageItem = ({ from, subject, message, status, date, onViewPress, onReplyPress, onDeletePress, isSentMessage, index }) => {
    return (
        <View style={styles.messageContainer}>
            <View style={styles.buttonSection}>
                <TouchableOpacity style={styles.viewButton} onPress={onViewPress}>
                    <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
                {!isSentMessage && (
                    <>
                        <TouchableOpacity style={styles.replyButton} onPress={onReplyPress}>
                            <Text style={styles.viewButtonText}>Reply</Text>
                        </TouchableOpacity>
                        
                    </>
                )}
            </View>

            <View style={styles.messageDetails}>
                {isSentMessage && <Text style={styles.detailText}>Message #: {index + 1}</Text>}
                <Text style={styles.detailText}>From: {from}</Text>
                <Text style={styles.detailText}>Subject: {subject}</Text>
                <Text style={styles.detailText} numberOfLines={1}>Message: {message}</Text>
                <Text style={styles.detailText}>Date: {date}</Text>
                {!isSentMessage && <Text style={styles.detailText}>Status: {status}</Text>}
            </View>
        </View>
    );
};

const MessageCenterScreen = () => {
    const [messages, setMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [newMessageModalVisible, setNewMessageModalVisible] = useState(false);
    const [sendFrom, setSendFrom] = useState('');
    const [newSubject, setNewSubject] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [viewMessageModalVisible, setViewMessageModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyModalVisible, setReplyModalVisible] = useState(false);
    const [replyMessage, setReplyMessage] = useState('');
    const [showSentMessages, setShowSentMessages] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [instructorEmails, setInstructorEmails] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [messageHeight, setMessageHeight] = useState(40);
    const userName = GlobalVariable.userName;
    const userFirstName = GlobalVariable.userFirstName;
    const chapterID = GlobalVariable.chapterID;
    const userType = GlobalVariable.userType;
    const navigation = useNavigation();


    useEffect(() => {
        const fetchMessagesAndInstructors = async () => {
            setLoading(true);
            try {
                const response = await fetch(GlobalVariable.AMCApiurl+'GetMessageCenter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({ userName, userTypeMode: 'i' }),
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
    
                const data = await response.json();
    
                // Parse message data from the API response (now a JSON string in `messageList`)
      
                const messageList = JSON.parse(data.messageList).map(msg => ({
                    id: msg.EmailID.toString(),
                    from: msg.Emailinfo.split('~#')[1],
                    sendby:msg.Emailinfo.split('~#')[4],
                    subject: msg.Subject,
                    message: msg.Message,
                    status: msg.Status,
                    date: msg.SendDate,
                    
                }));
    
                // Parse instructor email data from `studentDetailUtillity` (assuming this field contains instructor emails)
                const instructorList = data.studentDetailUtillity.map(instructor => ({
                    label: instructor.textField,
                    value: instructor.valueField,
                }));
    
                // Set state with the combined data
                setMessages(messageList);
                setInstructorEmails(instructorList);
    
                // Set the default "Send From" value if available
                if (instructorList.length > 0) {
                    setSendFrom(instructorList[0].value);
                }
    
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchMessagesAndInstructors();
    }, [userName]);

    const handleViewPress = async (message) => {
        setSelectedMessage(message);
        setViewMessageModalVisible(true);

        try {
            const response = await fetch(GlobalVariable.AMCApiurl + 'UpdateMessageView', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ trackingID: message.id, mode: 'T' }),
            });

            if (!response.ok) {
                console.error('Failed to update message view status');
                return;
            }

            // Update the message status to 'Viewed' locally
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === message.id ? { ...msg, status: 'Viewed' } : msg
                )
            );
        } catch (error) {
            console.error('Error updating message view status:', error);
        }
    };
    

   

    const handleReplyPress = (message) => {
        setSelectedMessage(message);
        setSendFrom(message.from);
        setNewSubject(`Re: ${message.subject}`);
        setReplyModalVisible(true);
    };

    const handleSendReply = async () => {
        const replyData = {
            userName: userName,
            sendTo: selectedMessage.from,
            sendFrom: userName,
            subject: newSubject,
            mode: 'Reply',
            message: replyMessage,
            chapterID: chapterID,
            messageID: selectedMessage.id,
            memberType: userType,
            sendBy:selectedMessage.sendby,
            userFirstName: userFirstName
        };

        try {
            const response = await fetch(GlobalVariable.AMCApiurl+'SendMessage', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(replyData),
            });

            if (!response.ok) {
                throw new Error('Failed to send reply');
            }

            const responseData = await response.json();
            setSentMessages(prev => [...prev, replyData]);
            setSuccessMessage('Your reply has been sent successfully!');
            setErrorMessage('');
            setReplyModalVisible(false);
            setReplyMessage('');
            setNewSubject('');
        } catch (error) {
            console.error('Error sending reply:', error);
            setErrorMessage('Failed to send reply. Please try again.');
            setSuccessMessage('');
        }
    };

    const sendNewMessageModal = () => {
        setNewSubject('');
        setNewMessage('');
        setNewMessageModalVisible(true);
    };

    const handleNewSendMessage = async () => {
        Keyboard.dismiss(); 
        const sendToEmail = sendFrom.split('~')[0];  // Extract the email part before ~
        
        const newMessageData = {
            userName: userName,
            sendTo: sendToEmail,  // Use the extracted email
            sendFrom: userName,
            subject: newSubject,
            mode: 'New',
            message: newMessage,
            chapterID: chapterID,
            messageID: 1,
            memberType: userType,
            sendBy:  sendFrom.split('~')[1],
            userFirstName: userFirstName,
        };

        try {
            const response = await fetch(GlobalVariable.AMCApiurl+'SendMessage', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessageData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            const responseData = await response.json();
            const sentMessageItem = {
                id: (sentMessages.length + 1).toString(),
                from: 'Me',
                to: sendFrom,
                subject: newSubject,
                message: newMessage,
                status: 'Sent',
                date: new Date().toLocaleString(),
            };
            setSentMessages(prev => [...prev, sentMessageItem]);
            setSuccessMessage('Your message has been sent successfully!');
            setErrorMessage('');
            setNewMessageModalVisible(false);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('Failed to send message. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleDeletePress = (messageId) => {
        setMessages(prevMessages => 
            prevMessages.map(message =>
                message.id === messageId && message.status === 'Unread'
                    ? { ...message, status: 'Viewed' }
                    : message
            )
        );
    };

    const toggleSentMessages = () => {
        setShowSentMessages(!showSentMessages);
    };

    const renderMessage = ({ item, index }) => (
        <MessageItem
            {...item}
            index={index}
            onViewPress={() => handleViewPress(item)} // This triggers the handleViewPress function
            onReplyPress={() => handleReplyPress(item)}
            onDeletePress={() => handleDeletePress(item.id)}
            isSentMessage={showSentMessages}
        />
    );


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading messages...</Text>
            </View>
        );
    }

    return (
         <View style={{ flex: 3}}>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Message Center</Text>
                <TouchableOpacity onPress={toggleSentMessages} style={styles.toggleButton}>
                    <Text style={styles.toggleButtonText}>
                        {showSentMessages ? 'Show Received Messages' : 'Show Sent Messages'}
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={sendNewMessageModal} style={styles.newMessageButton}>
                <Text style={styles.newMessageButtonText}>New Message</Text>
            </TouchableOpacity>

            <FlatList
                data={showSentMessages ? sentMessages : messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
            />

<Modal
    visible={newMessageModalVisible}
    animationType="slide"
    onRequestClose={() => setNewMessageModalVisible(false)}
>
    <View style={styles.modalContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <Text style={styles.modalTitle}>New Message</Text>

            {/* Button Container with Send and Close buttons at the top */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleNewSendMessage} style={styles.sendButton}>
                    <Text style={styles.sendButtonText}>Send Message</Text>
                </TouchableOpacity>
                <TouchableOpacity 
    onPress={() => {
        setNewMessageModalVisible(false);
        setNewSubject('');
        setNewMessage('');
    }} 
    style={styles.cancelButton}
>
    <Icon name="cancel" size={24} color="white" />
</TouchableOpacity>
            </View>

            <Picker
                selectedValue={sendFrom}
                onValueChange={(itemValue) => setSendFrom(itemValue)}
                style={pickerSelectStyles.picker}
            >
                {instructorEmails.map(email => (
                    <Picker.Item key={email.value} label={email.label} value={email.value} />
                ))}
            </Picker>
            <TextInput
                placeholder="Subject"
                placeholderTextColor="black"
                value={newSubject}
                onChangeText={setNewSubject}
                style={styles.input}
            />
            <TextInput
                placeholder="Message"
                placeholderTextColor="black"
                value={newMessage}
                onChangeText={setNewMessage}
                style={[styles.input, styles.messageInput]}
                multiline
                onContentSizeChange={(event) => {
                    setMessageHeight(event.nativeEvent.contentSize.height);
                }}
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                    handleNewSendMessage();
                }}
                returnKeyType="send"
            />
        </ScrollView>
    </View>
</Modal>
            {/* Modal for View Message */}
            <Modal
                visible={viewMessageModalVisible}
                animationType="slide"
                onRequestClose={() => setViewMessageModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Message Details</Text>
                    {selectedMessage && (
                        <>
                            <Text>From: {selectedMessage.from}</Text>
                            <Text>Subject: {selectedMessage.subject}</Text>
                            <Text>Message: {selectedMessage.message}</Text>
                            <Text>Date: {selectedMessage.date}</Text>
                        </>
                    )}
                    <TouchableOpacity onPress={() => setViewMessageModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal for Reply */}
            <Modal
    visible={replyModalVisible}
    animationType="slide"
    onRequestClose={() => setReplyModalVisible(false)}
>
    <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Reply to Message</Text>
        {selectedMessage && (
        <Text>{selectedMessage.from}</Text>)}

        <TextInput
            placeholder="Subject"
            value={newSubject}
            onChangeText={setNewSubject}
            style={styles.input}
        />
        
        <TextInput
            placeholder="Reply Message"
            value={replyMessage}
            onChangeText={setReplyMessage}
            style={[styles.input, styles.messageInput]}
            multiline
        />

        {/* Send Button */}
        <TouchableOpacity onPress={handleSendReply} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send Reply</Text>
        </TouchableOpacity>

        {/* Close Button */}
        <TouchableOpacity onPress={() => setReplyModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Close</Text>
        </TouchableOpacity>
    </View>
</Modal>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
      //  padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    toggleButton: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#007bff',
    },
    toggleButtonText: {
        color: '#ffffff',
    },
    newMessageButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: '#28a745',
        marginBottom: 8,
    },
    newMessageButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    messageContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    viewButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: '#007bff',
    },
    viewButtonText: {
        color: '#ffffff',
    },
    replyButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: 'darkgreen',
    },
    deleteButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: '#dc3545',
    },
    scrollViewContainer: {
        flexGrow: 1, // Allow scrolling when the content overflows
        paddingBottom: 16, // Add some padding at the bottom
    },
    trashIcon: {
        width: 16,
        height: 16,
        tintColor: '#ffffff',
    },
    messageDetails: {
        marginTop: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#333333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'top',
        padding: 16,
        backgroundColor: 'white',
    },
    modalTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        paddingTop: 30, // Align title to center
        color: 'darkgreen'
    },
    input: {
        borderWidth: 1,
        borderColor: '#357a38',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    messageInput: {
        minHeight: 40, // Default height like subject box
        maxHeight: 200, // Maximum height for message box
        textAlignVertical: 'top',
    },
    sendButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 4,
    },
    sendButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 4,
        marginTop: 16,
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#dc3545', // Red color for cancellation
        padding: 10,
        borderRadius: 4,
        marginTop: 8,
    },
    cancelButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16, // Add some margin for spacing
    },
    
});

export default MessageCenterScreen;