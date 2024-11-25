import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, ActivityIndicator, Linking, ScrollView, StyleSheet } from 'react-native';
import pdfIcon from '../assets/pdf.png';
import videoIcon from '../assets/video.png';
import GlobalVariable from './gobal';

const ClassMaterialScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [classMaterials, setClassMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userName = GlobalVariable.userName;

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
    for (let i = 0; i < text.length; i += 10) {
      formatted.push(text.slice(i, i + 10));
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
    </View>
  ), [handleOpenPDF, handleOpenYouTube]);

  return (
    <View style={styles.container}>
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
            </View>

            <FlatList
              data={filteredData}
              renderItem={renderItem}
              keyExtractor={(item) => item.mDocID.toString()}
              initialNumToRender={10} // Controls initial batch of items rendered
              windowSize={5} // Controls amount of items to render in advance
              ListEmptyComponent={<Text style={styles.noResultText}>No Results Found</Text>}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#357a38',
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
    backgroundColor: '#357a38',
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
    whiteSpace: 'pre-line', // Ensures newlines from `\n` are rendered.
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
});

export default ClassMaterialScreen;
