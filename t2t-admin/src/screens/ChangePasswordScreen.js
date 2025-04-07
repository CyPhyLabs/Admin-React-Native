import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const ChangePasswordScreen = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePassword = async () => {
    // Simple validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters long');
      return;
    }

    // In a real app, you'd verify the current password against the stored one
    // Here we'll just store the new password
    try {
      await AsyncStorage.setItem('userPassword', newPassword);
      Alert.alert('Success', 'Password changed successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.log('Error saving password:', error);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#637D92" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.instruction}>
          Create a new password that is at least 8 characters long. A strong password contains a mix of letters, numbers, and symbols.
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry={!showCurrentPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowCurrentPassword}>
              <Icon name={showCurrentPassword ? "eye" : "eye-off"} size={20} color="#637D92" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowNewPassword}>
              <Icon name={showNewPassword ? "eye" : "eye-off"} size={20} color="#637D92" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowConfirmPassword}>
              <Icon name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#637D92" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.changePasswordButton,
            (!currentPassword || !newPassword || !confirmPassword) ? styles.disabledButton : null
          ]}
          onPress={handleChangePassword}
          disabled={!currentPassword || !newPassword || !confirmPassword}
        >
          <Text style={styles.changePasswordButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 125, 146, 0.1)',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#29384B',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  instruction: {
    fontSize: 14,
    color: '#637D92',
    lineHeight: 20,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#29384B',
    marginBottom: 8,
    fontWeight: '500',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFE4EA',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#29384B',
  },
  eyeIcon: {
    padding: 12,
  },
  changePasswordButton: {
    backgroundColor: '#885053',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  changePasswordButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default ChangePasswordScreen;