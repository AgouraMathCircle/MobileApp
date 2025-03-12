// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  SafeAreaView: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  logo: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: 300,
  },
  loginBtn: {
    width: 300,
    backgroundColor: '#408A4E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#408A4E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  forgotText: {
    color: '#666',
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
  },
  registerBtn: {
    width: '80%',
    backgroundColor: '#408A4E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#408A4E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  db_maincontainer: {
    flex: 1,
    backgroundColor: '#f9f9f9', // Light background for contrast
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#43A047', // Dark green for header
    flex: 1,
  },
  logoutIcon: {
    width: 30,
    height: 30,
  },
  
  db_Container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#E8F5E9', // Soft green background
    borderRadius: 10,
  },
  db_Title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43A047', // Green title
    marginBottom: 10,
  },
  db_informationBox: {
    backgroundColor: '#C8E6C9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 5,
  },
  copyrightText: {
    marginTop: 20,
    fontSize: 12,
    textAlign: 'center',
    color: '#aaa', // You can adjust the color as needed
  },
  db_paraText: {
    fontSize: 14,
    color: '#000', // Black text
  },
  db_tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#43A047', // Green header
    padding: 10,
  },
  db_tableHeaderText: {
    flex: 1,
    color: '#fff', // White text for header
    fontWeight: 'bold',
    textAlign: 'center',
  },
  db_tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  db_tableCell: {
    flex: 1,
    textAlign: 'center',
    color: '#000', // Black text
  },
  db_editButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  db_useredit: {
    width: 20,
    height: 20,
  },
  db_errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#E8F5E9', // Light green footer
    elevation: 5,
  },
  db_footerItem: {
    alignItems: 'center',
  },
  db_icon: {
    width: 25,
    height: 25,
  },
  db_footerText: {
    fontSize: 12,
    color: '#000', // Black text for footer
  },
});

