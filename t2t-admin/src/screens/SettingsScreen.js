import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { HomeStyles } from '../styles/HomeStyles'; // Import your existing styles

const SettingsScreen = () => {
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: () => console.log("User logged out") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Settings</Text>

      {/* Dummy Settings Section */}
      <View style={styles.sectionContainer}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Dummy Setting 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Dummy Setting 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Dummy Setting 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Dummy Setting 4</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...HomeStyles.container, // Use the background color from HomeStyles
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    ...HomeStyles.username, // Use similar styling for the header as in HomeStyles
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    ...HomeStyles.sectionContainer,
    marginBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  rowText: {
    ...HomeStyles.sectionText, // Use similar text styling
    fontSize: 16,
    color: '#29384B',
  },
  logoutButton: {
    backgroundColor: '#885053', // Use a color that matches your app theme
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto', // Push it to the bottom
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
