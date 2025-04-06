import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

const PersonalInfoScreen = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  const [dob, setDob] = useState('01/15/1985');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');
  const [emergency, setEmergency] = useState('Jane Doe (555) 123-4567');
  const [allergies, setAllergies] = useState('None');

  useEffect(() => {
    // Load personal info from AsyncStorage
    const loadPersonalInfo = async () => {
      try {
        const personalInfo = await AsyncStorage.getItem('personalInfo');
        if (personalInfo) {
          const data = JSON.parse(personalInfo);
          setName(data.name || 'John Doe');
          setDob(data.dob || '01/15/1985');
          setAddress(data.address || '123 Main St, Anytown, USA');
          setEmergency(data.emergency || 'Jane Doe (555) 123-4567');
          setAllergies(data.allergies || 'None');
        }
      } catch (error) {
        console.log('Error loading personal info:', error);
      }
    };

    loadPersonalInfo();
  }, []);

  const savePersonalInfo = async () => {
    try {
      const personalInfo = {
        name,
        dob,
        address,
        emergency,
        allergies
      };
      await AsyncStorage.setItem('personalInfo', JSON.stringify(personalInfo));
      navigation.goBack();
    } catch (error) {
      console.log('Error saving personal info:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#637D92" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <TouchableOpacity style={styles.saveButton} onPress={savePersonalInfo}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              value={dob}
              onChangeText={setDob}
              placeholder="MM/DD/YYYY"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={address}
              onChangeText={setAddress}
              placeholder="Enter your address"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emergency Contact</Text>
            <TextInput
              style={styles.input}
              value={emergency}
              onChangeText={setEmergency}
              placeholder="Name and phone number"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Allergies</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={allergies}
              onChangeText={setAllergies}
              placeholder="List any allergies"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 125, 146, 0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#29384B',
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#637D92',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#DFE4EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#29384B',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
};

export default PersonalInfoScreen;