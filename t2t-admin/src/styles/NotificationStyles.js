// src/screens/HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const NotificationStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#E0E2F0',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#4F5892',
      marginRight: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: '500',
      color: '#4F5892',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 16,
      color: '#272635',
      marginTop: 20,
    },
    modalBody: {
      fontSize: 16,
      color: '#333',
      marginBottom: 15,
    },
    modalPriority: {
      fontSize: 14,
      color: '#666',
      marginBottom: 20,
    },
  });


export default NotificationStyles;