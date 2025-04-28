import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize with empty values instead of dummy data
  const [userData, setUserData] = useState({
    name: '',
    jobTitle: '',
    department: '',
    email: '',
    profileImage: '', 
    phoneNumber: '',
    dob: '',
    address: '',
    emergency: '',
    allergies: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      const personalInfo = await AsyncStorage.getItem('personalInfo');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      const username = await AsyncStorage.getItem('username');
      
      let updatedData = {...userData};
      
      if (profileData) {
        const parsedProfile = JSON.parse(profileData);
        updatedData = {...updatedData, ...parsedProfile};
      }
      
      if (personalInfo) {
        const parsedPersonal = JSON.parse(personalInfo);
        updatedData = {...updatedData, ...parsedPersonal};
      }
      
      if (phoneNumber) {
        updatedData.phoneNumber = phoneNumber;
      }

      // Set the name from username if available and name is not set
      if (username && !updatedData.name) {
        updatedData.name = username;
      }
      
      setUserData(updatedData);
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const updateUserData = async (newData) => {
    try {
      const updatedData = { ...userData, ...newData };
      setUserData(updatedData);
      
      // Determine which AsyncStorage keys need updating
      if (newData.name || newData.jobTitle || newData.department || 
          newData.email || newData.profileImage) {
        await AsyncStorage.setItem('profileData', JSON.stringify({
          name: updatedData.name,
          jobTitle: updatedData.jobTitle,
          department: updatedData.department,
          email: updatedData.email,
          profileImage: updatedData.profileImage,
        }));

        // Also update username if name is updated
        if (newData.name) {
          await AsyncStorage.setItem('username', updatedData.name);
        }
      }
      
      if (newData.name || newData.dob || newData.address || 
          newData.emergency || newData.allergies) {
        await AsyncStorage.setItem('personalInfo', JSON.stringify({
          name: updatedData.name,
          dob: updatedData.dob,
          address: updatedData.address,
          emergency: updatedData.emergency,
          allergies: updatedData.allergies,
        }));
      }
      
      if (newData.phoneNumber) {
        await AsyncStorage.setItem('phoneNumber', newData.phoneNumber);
      }
      
      return true;
    } catch (error) {
      console.log('Error updating user data:', error);
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (!profileData) {
        await AsyncStorage.setItem('profileData', JSON.stringify({
          name: username, 
          jobTitle: '',
          department: '',
          email: '',
          profileImage: '',
        }));
        
        await AsyncStorage.setItem('personalInfo', JSON.stringify({
          name: username,
          dob: '',
          address: '',
          emergency: '',
          allergies: '',
        }));
        
        await AsyncStorage.setItem('username', username);
      }
      
      await AsyncStorage.setItem('userToken', userToken);
      dispatch({ type: 'LOGIN', token: userToken });
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const clearUserData = async () => {
    try {
      const keysToRemove = [
        'profileData', 
        'personalInfo', 
        'phoneNumber', 
        'username',
        // Any other user data keys
      ];
      
      await AsyncStorage.multiRemove(keysToRemove);
      
      // Reset the userData state
      setUserData({
        name: '',
        jobTitle: '',
        department: '',
        email: '',
        profileImage: '', 
        phoneNumber: '',
        dob: '',
        address: '',
        emergency: '',
        allergies: ''
      });
      
      return true;
    } catch (error) {
      console.log('Error clearing user data:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      updateUserData, 
      loadUserData, 
      clearUserData  // Add this
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);