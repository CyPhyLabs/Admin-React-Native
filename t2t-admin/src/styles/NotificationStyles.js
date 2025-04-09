// src/screens/HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const NotificationStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#D7E3F1', // set the background color for the safe area
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#D7E3F1', // make sure container background color matches the safeArea color
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#637D92',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#4F5892',
    },
    emptyText: {
        fontSize: 16,
        color: '#4F5892',
        textAlign: 'center',
        marginTop: 20,
    },
    modalBody: {
        fontSize: 16,
        marginBottom: 12,
    },
    modalPriority: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 16,
    },
    priorityIconContainer: {
        position: 'absolute',
        right: 12,
        top: '105%',
        transform: [{ translateY: -12 }],
        justifyContent: 'center',
        alignItems: 'center',

    }, notificationDate: {
        fontSize: 12,
        color: '#9BA9BF',
        position: 'absolute',
        top: -2, // Adjust this value as needed
        right: 2, // Adjust this value as needed
    },
});

export default NotificationStyles;