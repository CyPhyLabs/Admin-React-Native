import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    jobTitle: 'Software Engineer',
    department: 'IT Department',
    email: 'john.doe@example.com',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    phoneNumber: '+1 (555) 123-4567'
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      
      if (profileData) {
        const parsedData = JSON.parse(profileData);
        setUserData(prevData => ({
          ...prevData,
          ...parsedData,
          phoneNumber: phoneNumber || prevData.phoneNumber
        }));
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const updateUserData = async (newData) => {
    try {
      const updatedData = { ...userData, ...newData };
      setUserData(updatedData);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('profileData', JSON.stringify({
        name: updatedData.name,
        jobTitle: updatedData.jobTitle,
        department: updatedData.department,
        email: updatedData.email,
        profileImage: updatedData.profileImage,
      }));
      
      // If phone number is updated
      if (newData.phoneNumber) {
        await AsyncStorage.setItem('phoneNumber', newData.phoneNumber);
      }
      
      return true;
    } catch (error) {
      console.log('Error updating user data:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, loadUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);