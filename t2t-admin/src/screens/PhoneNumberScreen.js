import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../context/UserContext';

const PhoneNumberScreen = ({ navigation }) => {
  const { userData, updateUserData } = useUser();
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    const loadPhoneNumber = async () => {
      try {
        const savedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        if (savedPhoneNumber) {
          setPhoneNumber(savedPhoneNumber);
        }
      } catch (error) {
        console.log('Error loading phone number:', error);
      }
    };

    loadPhoneNumber();
  }, []);

  const savePhoneNumber = async () => {
    // Simple validation - you might want to improve this
    if (!phoneNumber || phoneNumber.length < 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }

    // Update phone number through context instead of directly with AsyncStorage
    const success = await updateUserData({ phoneNumber });
    
    if (success) {
      setIsEditing(false);
    }
  };

  // Format the phone number for display
  const formatPhoneNumber = (number) => {
    // Basic formatting, you can use a library for more advanced formatting
    return number;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#637D92" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phone Number</Text>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={savePhoneNumber}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.container}>
        <View style={styles.phoneNumberCard}>
          <View style={styles.cardHeader}>
            <Icon name="call-outline" size={24} color="#885053" />
            <Text style={styles.cardTitle}>Your Phone Number</Text>
          </View>
          
          {isEditing ? (
            <TextInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              autoFocus
            />
          ) : (
            <View style={styles.phoneDisplay}>
              <Text style={styles.phoneNumber}>{formatPhoneNumber(phoneNumber)}</Text>
              <View style={styles.verifiedBadge}>
                <Icon name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
          <Icon name="information-circle-outline" size={22} color="#637D92" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Your phone number is used for account security and communication purposes.
          </Text>
        </View>
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
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#885053',
    borderRadius: 6,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  editButtonText: {
    color: '#885053',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  phoneNumberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#29384B',
    marginLeft: 10,
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#DFE4EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    color: '#29384B',
  },
  phoneDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  phoneNumber: {
    fontSize: 22,
    color: '#29384B',
    fontWeight: '500',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#4CAF50',
    marginLeft: 4,
    fontWeight: '500',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(99, 125, 146, 0.05)',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    color: '#637D92',
    fontSize: 14,
    flex: 1,
  },
};

export default PhoneNumberScreen;