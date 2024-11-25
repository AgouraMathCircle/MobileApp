import { StyleSheet, Platform } from "react-native";

const pickerSelectStyles = StyleSheet.create({
    placeholder: {
      color: '#696969',
      fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    },
    inputIOS: {
      borderWidth: 1,
      borderColor: '#357a38',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      color: '#000',
    },
    inputAndroid: {
      borderWidth: 1,
      borderColor: '#357a38',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      color: '#000',
    },
  });

export default pickerSelectStyles;