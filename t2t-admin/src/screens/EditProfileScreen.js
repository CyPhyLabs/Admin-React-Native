import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePictureSelector from '../components/ProfilePictureSelector';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('John Doe');
  const [jobTitle, setJobTitle] = useState('Software Engineer');
  const [department, setDepartment] = useState('IT Department');
  const [email, setEmail] = useState('john.doe@example.com');
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [showPictureSelector, setShowPictureSelector] = useState(false);

  useEffect(() => {
    // Load profile data from AsyncStorage
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profileData');
        if (profileData) {
          const data = JSON.parse(profileData);
          setName(data.name || 'John Doe');
          setJobTitle(data.jobTitle || 'Software Engineer');
          setDepartment(data.department || 'IT Department');
          setEmail(data.email || 'john.doe@example.com');
          setProfileImage(data.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg');
        }
      } catch (error) {
        console.log('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, []);

  const saveProfile = async () => {
    try {
      const profileData = {
        name,
        jobTitle,
        department,
        email,
        profileImage
      };
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      navigation.goBack();
    } catch (error) {
      console.log('Error saving profile data:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#637D92" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.profileImageSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity 
            style={styles.changePhotoButton}
            onPress={() => setShowPictureSelector(true)}
          >
            <Icon name="camera" size={18} color="#FFFFFF" style={styles.cameraIcon} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
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
            <Text style={styles.label}>Job Title</Text>
            <TextInput
              style={styles.input}
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholder="Enter your job title"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Department</Text>
            <TextInput
              style={styles.input}
              value={department}
              onChangeText={setDepartment}
              placeholder="Enter your department"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>
        </View>
      </ScrollView>

      <ProfilePictureSelector
        visible={showPictureSelector}
        onClose={() => setShowPictureSelector(false)}
        onSelect={(imageUri) => setProfileImage(imageUri)}
        currentImage={profileImage}
      />
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
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#885053',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  cameraIcon: {
    marginRight: 6,
  },
  changePhotoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formSection: {
    padding: 20,
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DFE4EA',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#29384B',
  },
};

export default EditProfileScreen;