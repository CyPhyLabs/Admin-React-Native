import React, { useState, useContext, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image, Switch, Alert, Modal, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { SettingsStyles as styles } from '../styles/SettingsStyles'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfilePictureSelector from '../components/ProfilePictureSelector';
import { useUser } from '../context/UserContext';

const SettingsScreen = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const { userData } = useUser();
  
  const [darkMode, setDarkMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [showPictureSelector, setShowPictureSelector] = useState(false);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profileData');
        if (profileData) {
          const data = JSON.parse(profileData);
          setProfileImage(data.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg');
        }
      } catch (error) {
        console.log('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: () => logout(), style: "destructive" }
      ]
    );
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
    setModalVisible(true);
  };

  const renderModalContent = () => {
    switch (activeModal) {
      case 'appUsage':
        return (
          <View>
            <Text style={styles.modalTitle}>How to Use the App</Text>
            <ScrollView style={styles.modalScrollContent}>
              <Text style={styles.modalSubtitle}>Navigation</Text>
              <Text style={styles.modalText}>
                The app has five main tabs: Notifications, Home, Events, Reminders, and Settings.
                Tap on the icons at the bottom of the screen to switch between tabs.
              </Text>
              
              <Text style={styles.modalSubtitle}>Home Screen</Text>
              <Text style={styles.modalText}>
                The home screen displays important notifications and upcoming events.
                Use the "+" button to create new announcements.
              </Text>
              
              <Text style={styles.modalSubtitle}>Reminders</Text>
              <Text style={styles.modalText}>
                Keep track of tasks with the Reminders feature. Create new reminders,
                mark them as complete, and set due dates.
              </Text>
              
              <Text style={styles.modalSubtitle}>Events</Text>
              <Text style={styles.modalText}>
                View and manage upcoming events on the Events tab. Create new events
                and get reminders for important dates.
              </Text>
            </ScrollView>
          </View>
        );
      
      case 'mirrorUsage':
        return (
          <View>
            <Text style={styles.modalTitle}>How to Use the Mirror</Text>
            <ScrollView style={styles.modalScrollContent}>
              <Text style={styles.modalSubtitle}>Getting Started</Text>
              <Text style={styles.modalText}>
                The mirror display shows important information that you've set up in this app.
                It automatically syncs with your account.
              </Text>
              
              <Text style={styles.modalSubtitle}>Display Options</Text>
              <Text style={styles.modalText}>
                The mirror can show notifications, reminders, events, and other important information.
                Customize what appears on the mirror through the app settings.
              </Text>
              
              <Text style={styles.modalSubtitle}>Troubleshooting</Text>
              <Text style={styles.modalText}>
                If the mirror isn't displaying correctly, ensure it's connected to power and wifi.
                Check that your account is properly linked in the app settings.
              </Text>
            </ScrollView>
          </View>
        );
      
      case 'faq':
        return (
          <View>
            <Text style={styles.modalTitle}>Frequently Asked Questions</Text>
            <ScrollView style={styles.modalScrollContent}>
              <Text style={styles.modalSubtitle}>How do I reset my password?</Text>
              <Text style={styles.modalText}>
                Go to Settings {'>'} Change Password. You'll need to enter your current password
                and then create a new one.
              </Text>
              
              <Text style={styles.modalSubtitle}>Can I use this app offline?</Text>
              <Text style={styles.modalText}>
                Some features work offline, but you'll need an internet connection
                to sync with the mirror and receive notifications.
              </Text>
              
              <Text style={styles.modalSubtitle}>How do I update my profile?</Text>
              <Text style={styles.modalText}>
                Go to Settings {'>'} Profile to update your personal information,
                including your name, job title, department, and profile picture.
              </Text>
              
              <Text style={styles.modalSubtitle}>How do I contact support?</Text>
              <Text style={styles.modalText}>
                Go to Settings {'>'} Contact Support to send a message to our support team.
                We typically respond within 24 hours.
              </Text>
            </ScrollView>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editProfileImageButton}
              onPress={() => setShowPictureSelector(true)}
            >
              <Icon name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userData.name}</Text>
            
            {userData.jobTitle && userData.jobTitle.trim() !== '' && (
              <Text style={styles.profilePosition}>{userData.jobTitle}</Text>
            )}
            
            {userData.department && userData.department.trim() !== '' && (
              <Text style={styles.profileDepartment}>{userData.department}</Text>
            )}
          </View>
          
          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
            <Icon name="pencil" size={16} color="#885053" />
          </TouchableOpacity>
        </View>

        {/* Settings Sections */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('PersonalInfo')}
          >
            <View style={styles.settingIconContainer}>
              <Icon name="person-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Personal Information</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#637D92" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('PhoneNumber')}
          >
            <View style={styles.settingIconContainer}>
              <Icon name="call-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Phone Number</Text>
              {userData.phoneNumber && userData.phoneNumber.trim() !== '' && (
                <Text style={styles.settingSubtext}>{userData.phoneNumber}</Text>
              )}
            </View>
            <Icon name="chevron-forward" size={20} color="#637D92" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={styles.settingIconContainer}>
              <Icon name="lock-closed-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Change Password</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#637D92" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="moon-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: "#D0D0D0", true: "rgba(136, 80, 83, 0.4)" }}
              thumbColor={darkMode ? "#885053" : "#F5F5F5"}
              onValueChange={() => setDarkMode(!darkMode)}
              value={darkMode}
            />
          </View>
          
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Manual</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => openModal('appUsage')}>
            <View style={styles.settingIconContainer}>
              <Icon name="phone-portrait-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>How to Use the App</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#637D92" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => openModal('mirrorUsage')}>
            <View style={styles.settingIconContainer}>
              <Icon name="tablet-landscape-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>How to Use the Mirror</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#637D92" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => openModal('faq')}>
            <View style={styles.settingIconContainer}>
              <Icon name="help-circle-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>FAQ</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#637D92" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
              <Icon name="headset-outline" size={22} color="#637D92" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingText}>Contact Support</Text>
            </View>
            <Icon name="chevron-forward" size={20} color="#637D92" />
          </TouchableOpacity>
        </View>
        
        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#FFFFFF" style={styles.logoutIcon} />
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>

      {/* Modal for manuals and FAQ */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color="#637D92" />
            </TouchableOpacity>
            
            {renderModalContent()}
          </View>
        </View>
      </Modal>

      <ProfilePictureSelector
        visible={showPictureSelector}
        onClose={() => setShowPictureSelector(false)}
        onSelect={async (imageUri) => {
          setProfileImage(imageUri);
          // Save the image to AsyncStorage
          try {
            const profileData = await AsyncStorage.getItem('profileData') || '{}';
            const parsedData = JSON.parse(profileData);
            await AsyncStorage.setItem('profileData', JSON.stringify({
              ...parsedData,
              profileImage: imageUri
            }));
          } catch (error) {
            console.log('Error saving profile image:', error);
          }
        }}
        currentImage={profileImage}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;