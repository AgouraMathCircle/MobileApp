import { StyleSheet } from 'react-native';

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#357a38',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // Ensure the arrow doesn't overlap the text
        backgroundColor: '#fff',
        marginVertical: 5,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#357a38',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30, // Ensure the arrow doesn't overlap the text
        backgroundColor: '#fff',
        marginVertical: 5,
    },
    iconContainer: {
        top: 15,
        right: 10,
    },
    placeholder: {
        color: '#a9a9a9', // Placeholder text color
    },
});

export default pickerSelectStyles;