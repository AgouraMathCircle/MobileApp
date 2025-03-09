import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  View, Text, FlatList, TextInput, TouchableOpacity, Image, 
  ActivityIndicator, Linking, ScrollView, StyleSheet, Dimensions, SafeAreaView 
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import pdfIcon from '../assets/pdf.png';
import videoIcon from '../assets/video.png';
import GlobalVariable from './gobal';
import NavigationStyles from '../Styles/NavigationStyles';

const ClassMaterialScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classMaterials, setClassMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userName = GlobalVariable.userName;
  const userType = GlobalVariable.userType;

  const fetchClassMaterialsAPI = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(GlobalVariable.AMCApiurl + 'GetClassMaterials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ userName }),
        });

        if (!response.ok) {
          return reject('Failed to fetch class materials');
        }

        const data = await response.json();

        if (!data.message) {
          return reject("Invalid data format: 'message' field is missing.");
        }

        const materials = JSON.parse(data.message);
        resolve(materials);
      } catch (err) {
        console.error('Fetch error:', err);
        reject('Failed to load class materials.');
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchClassMaterialsAPI()
      .then((materials) => {
        setClassMaterials(materials);
        setError(null);
      })
      .catch((err) => {
        console.error('Error:', err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userName]);

  const handlePublish = (docID) => {
    setLoading(true); // Set loading to true while publishing and re-fetching
    const url = GlobalVariable.AMCApiurl + 'PublishDocument';
    const headers = {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      docID: docID,
    });

    fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      // Re-fetch class materials after successful publish
      return fetchClassMaterialsAPI();
    })
    .then((materials) => {
      setClassMaterials(materials);
      setError(null);
    })
    .catch((error) => {
      console.error('Error:', error);
      setError('Failed to publish and refresh data.');
    })
    .finally(() => {
      setLoading(false); // Set loading to false after the operation is complete
    });
  };

  const handleOpenYouTube = useCallback((url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  }, []);

  const handleOpenPDF = useCallback((pdfName) => {
    const pdfUrl = `https://agouramathcircle.org/Pstudyware/Documents/${pdfName}`;
    Linking.openURL(pdfUrl).catch((err) => console.error('Failed to open PDF URL:', err));
  }, []);

  const filteredData = useMemo(() => classMaterials.filter((item) =>
    item.mSession && item.mSession.toLowerCase().includes(searchQuery.toLowerCase())
  ), [classMaterials, searchQuery]);

  const formatText = (text) => {
    if (!text || typeof text !== 'string') return text;
    const formatted = [];
    for (let i = 0; i < text.length; i += 20) {
      formatted.push(text.slice(i, i + 20));
    }
    return formatted.join('\n');
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        {item.mDocName && (
          <TouchableOpacity onPress={() => handleOpenPDF(item.mDocName)}>
            <Image source={pdfIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
        {item.mURLName && (
          <TouchableOpacity onPress={() => handleOpenYouTube(item.mURLName)}>
            <Image source={videoIcon} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.cell}>{formatText(item.Class)}</Text>
      <Text style={styles.cell}>{formatText(item.mSession)}</Text>
      <Text style={styles.cell}>{formatText(item.Topics)}</Text>
      <Text style={styles.cell}>{formatText(item.Description)}</Text>
      <Text style={styles.cell}>{new Date(item.InsertDate).toLocaleDateString()}</Text>
      {(userType === 'I' || userType === 'c' || userType === 'A') && (
        <Text style={styles.cell}>
          {item.Status === 'Y' ? 'published' :
            item.Status === 'N' ? (
              <TouchableOpacity style={styles.button} onPress={() => handlePublish(item.DocumentID)}>
                <Text style={styles.buttonText}>Publish</Text>
              </TouchableOpacity>
            ) : formatText(item.Status)
          }
        </Text>
      )}
    </View>
  ), [handleOpenPDF, handleOpenYouTube]);

  return (
    <View style={{ flex: 3 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Class Material</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search the session"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : error ? (
          <Text style={styles.noResultText}>{error}</Text>
        ) : (
          <ScrollView horizontal>
            <View style={styles.tableContainer}>
              <View style={[styles.row, styles.headerRow]}>
                <View style={styles.iconContainer}><Text style={styles.headerCell}>Action</Text></View>
                <Text style={styles.headerCell}>Class</Text>
                <Text style={styles.headerCell}>Session</Text>
                <Text style={styles.headerCell}>Topics</Text>
                <Text style={styles.headerCell}>Description</Text>
                <Text style={styles.headerCell}>Date</Text>
                {(userType === 'I' || userType === 'c' || userType === 'A') && (
                  <Text style={styles.headerCell}>Status</Text>
                )}
              </View>

              <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={(item) => item.mDocID.toString()}
                initialNumToRender={10}
                windowSize={5}
                ListEmptyComponent={<Text style={styles.noResultText}>No Results Found</Text>}
              />
            </View>
          </ScrollView>
        )}
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
            const userFirstName = GlobalVariable.userFirstName || 'DefaultFirstName';
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: 'darkgreen',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    elevation: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerRow: {
    backgroundColor: 'darkgreen',
    paddingVertical: 12,
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    paddingVertical: 8,
    minWidth: 100,
  },
  cell: {
    textAlign: 'center',
    flex: 1,
    paddingVertical: 8,
    color: '#333',
    minWidth: 100,
    whiteSpace: 'pre-line',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  noResultText: {
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default ClassMaterialScreen;