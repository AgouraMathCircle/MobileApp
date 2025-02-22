import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import the useNavigation hook

const DocumentPublishing = () => {
  const [isChecked, setIsChecked] = useState(false); // State for the checkbox
  const [documentTitle, setDocumentTitle] = useState(''); // State for document title
  const navigation = useNavigation();  // Get the navigation object

  const handlePublish = () => {
    if (!documentTitle) {
      alert('Please enter a document title.');
      return;
    }
    // Logic for publishing the document and sending email if checked
    const emailMessage = isChecked ? 'Document will be sent via email.' : 'No email will be sent.';
    alert(`Document Published: ${documentTitle}\n${emailMessage}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Publish Document</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter document title"
          value={documentTitle}
          onChangeText={setDocumentTitle}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Send email notification</Text>
        </View>

        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.buttonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#357a38',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#357a38',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#357a38',
  },
  publishButton: {
    backgroundColor: '#357a38',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  backButtonText: {
    color: '#357a38',
    fontSize: 18,
  },
});

export default DocumentPublishing;
