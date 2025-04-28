import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView,
  Platform,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const PersonalInfoScreen = ({ navigation }) => {
  const { userData, updateUserData } = useUser();
  const [name, setName] = useState(userData.name || '');
  const [dob, setDob] = useState(userData.dob || '');
  const [address, setAddress] = useState(userData.address || '');
  const [emergency, setEmergency] = useState(userData.emergency || '');
  const [allergies, setAllergies] = useState(userData.allergies || '');
  
  // Date picker states
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState(() => {
    // If user already has a DOB, use that
    // if (userData.dob) {
    //   return parseDate(userData.dob);
    // }
    
    // Otherwise set a reasonable default date that allows selecting any month
    // Use Jan 1st of 20 years ago
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 20);
    defaultDate.setMonth(0); // January
    defaultDate.setDate(1);
    return defaultDate;
  });

  // Parse date string to Date object
  function parseDate(dateString) {
    if (!dateString) return new Date();
    
    const parts = dateString.split('/');
    if (parts.length === 3) {
      // MM/DD/YYYY format
      return new Date(parseInt(parts[2]), parseInt(parts[0])-1, parseInt(parts[1]));
    }
    return new Date();
  }

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    // Always hide the date picker on Android after selection
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (selectedDate) {
      setDateValue(selectedDate);
      
      // Format date as MM/DD/YYYY
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();
      const year = selectedDate.getFullYear();
      const formattedDate = `${month < 10 ? '0' + month : month}/${day < 10 ? '0' + day : day}/${year}`;
      setDob(formattedDate);
    }
  };

  // Toggle the date picker visibility
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const savePersonalInfo = async () => {
    const success = await updateUserData({
      name,
      dob,
      address,
      emergency,
      allergies
    });
    
    if (success) {
      navigation.goBack();
    }
  };

  // Update the renderFieldIcon function to handle specific icon styling for textareas
  const renderFieldIcon = useCallback((iconName, color = "#637D92", isTextArea = false) => (
    <Icon 
      name={iconName} 
      size={20} 
      color={color} 
      style={[
        styles.inputIcon, 
        isTextArea && styles.textAreaIcon
      ]} 
    />
  ), []);

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

      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="person" size={22} color="#885053" />
            <Text style={styles.sectionTitle}>Basic Information</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              {renderFieldIcon("person-outline")}
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#A0AEC0"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity 
              onPress={toggleDatePicker}
              style={styles.inputContainer}
            >
              {renderFieldIcon("calendar-outline")}
              <Text style={styles.dateText}>
                {dob || "Select date of birth"}
              </Text>
            </TouchableOpacity>
            
            {Platform.OS === 'ios' && showDatePicker ? (
              <Modal
                transparent={true}
                animationType="slide"
                visible={showDatePicker}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <View style={styles.pickerHeader}>
                      <TouchableOpacity
                        style={styles.doneButton}
                        onPress={() => setShowDatePicker(false)}
                      >
                        <Text style={styles.doneButtonText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={dateValue}
                      mode="date"
                      display="spinner"
                      onChange={onDateChange}
                      maximumDate={new Date()}
                      minimumDate={new Date(1900, 0, 1)} // Allow dates back to 1900
                      style={{width: '100%'}}
                    />
                  </View>
                </View>
              </Modal>
            ) : (
              Platform.OS === 'android' && showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateValue}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1900, 0, 1)} // Allow dates back to 1900
                />
              )
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              {renderFieldIcon("location-outline", "#637D92", true)}
              <TextInput
                style={[styles.input, styles.textArea]}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter your address"
                multiline
                numberOfLines={Platform.OS === 'ios' ? null : 3}
                placeholderTextColor="#A0AEC0"
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="medkit" size={22} color="#885053" />
            <Text style={styles.sectionTitle}>Emergency Information</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Emergency Contact</Text>
            <View style={styles.inputContainer}>
              {renderFieldIcon("call-outline")}
              <TextInput
                style={styles.input}
                value={emergency}
                onChangeText={setEmergency}
                placeholder="Name and phone number"
                placeholderTextColor="#A0AEC0"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Allergies</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              {renderFieldIcon("alert-circle-outline", "#637D92", true)}
              <TextInput
                style={[styles.input, styles.textArea]}
                value={allergies}
                onChangeText={setAllergies}
                placeholder="List any allergies"
                multiline
                numberOfLines={Platform.OS === 'ios' ? null : 3}
                placeholderTextColor="#A0AEC0"
              />
            </View>
          </View>
        </View>
        
        <View style={styles.disclaimer}>
          <Icon name="shield-checkmark-outline" size={18} color="#637D92" />
          <Text style={styles.disclaimerText}>
            Your information is securely stored and only accessible by authorized personnel.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 125, 146, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 2,
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
    paddingHorizontal: 16,
    backgroundColor: '#885053',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#29384B',
    marginLeft: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#637D92',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#29384B',
  },
  dateText: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#29384B',
  },
  textAreaContainer: {
    alignItems: 'flex-start',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 125, 146, 0.08)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: '#637D92',
    marginLeft: 10,
  },
  textAreaIcon: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  doneButton: {
    padding: 10,
  },
  doneButtonText: {
    color: '#885053',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default PersonalInfoScreen;