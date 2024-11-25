import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    paddingBottom: 45,
    flex: 1,
    backgroundColor: '#fff',
  },
  reportCardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },
  line: {
    height: 1, // Height of the line
    backgroundColor: 'black', // Color of the line
    alignSelf: 'center', // Center the line horizontally
  },
  asterisk: {
    color: 'red',
  },
  dropdownContainer: {
    height: 38,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    flex: 1,
    borderColor: 'black',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dropdownContainerReportCard: {
    height: 38,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    flex: 0,
    borderColor: 'black',
    borderRadius: 4,
    overflow: 'hidden',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10, // Optional: Adds space above and below the line
  },
  title: {
    paddingTop: 20,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#33793d',
    textAlign: 'left',
    marginLeft: 20,
    marginVertical: 5,
  },
  titleReportCard: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#33793d',
  },
  inputReportCard: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
},
error: {
  color: 'red',
  marginBottom: 10,
  },
  section: {
    margin: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
    backgroundColor: '#538854',
  },
  header: {
    fontSize: 18,
    color: '#4B576B',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#d1d5dd'
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  link: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  checkedCheckbox: {
    backgroundColor: '#4CAF50',
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  modalContainer: {
    paddingTop: 50,
    paddingBottom: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 10,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  submitButton: {
    marginBottom: 50,
    paddingBottom: 50,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#4CAF50',
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
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#4CAF50',
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
  });

export default styles;