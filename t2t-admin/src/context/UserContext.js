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
    phoneNumber: '+1 (555) 123-4567',
    dob: '01/15/1985',
    address: '123 Main St, Anytown, USA',
    emergency: 'Jane Doe (555) 123-4567',
    allergies: 'None'
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profileData = await AsyncStorage.getItem('profileData');
      const personalInfo = await AsyncStorage.getItem('personalInfo');
      const phoneNumber = await AsyncStorage.getItem('phoneNumber');
      
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

  return (
    <UserContext.Provider value={{ userData, updateUserData, loadUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);