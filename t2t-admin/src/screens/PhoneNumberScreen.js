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
    // Set phone number from userData instead of AsyncStorage
    setPhoneNumber(userData.phoneNumber || '');
    
    // No need to fetch from AsyncStorage since userData should be the source of truth
  }, [userData.phoneNumber]); // Add dependency on userData.phoneNumber

  const savePhoneNumber = async () => {
    // Only validate if there is a phone number
    if (phoneNumber && phoneNumber.length < 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number or remove it completely');
      return;
    }

    try {
      // Update user data context
      const success = await updateUserData({ phoneNumber: phoneNumber || null });
      
      // Also clear the AsyncStorage value if phone is empty
      if (phoneNumber === '') {
        await AsyncStorage.removeItem('phoneNumber');
      } else if (phoneNumber) {
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
      }
      
      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.log('Error saving phone number:', error);
      Alert.alert('Error', 'Failed to save phone number');
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
            <View style={styles.phoneInputContainer}>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                autoFocus
              />
              {phoneNumber && (
                <TouchableOpacity 
                  style={styles.clearButton} 
                  onPress={() => setPhoneNumber('')}
                >
                  <Icon name="close-circle" size={20} color="#637D92" />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.phoneDisplay}>
              {phoneNumber ? (
                <>
                  <Text style={styles.phoneNumber}>{formatPhoneNumber(phoneNumber)}</Text>
                  <View style={styles.verifiedBadge}>
                    <Icon name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </>
              ) : (
                <Text style={styles.noPhoneText}>No phone number added</Text>
              )}
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DFE4EA',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  phoneInput: {
    flex: 1,
    padding: 12,
    fontSize: 18,
    color: '#29384B',
    borderWidth: 0,
  },
  clearButton: {
    padding: 8,
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
  noPhoneText: {
    fontSize: 16,
    color: '#637D92',
    fontStyle: 'italic',
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