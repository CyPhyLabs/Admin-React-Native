import { Platform } from 'react-native';
import { API_BASE_URL, ANDROID_API_BASE_URL, IOS_API_BASE_URL } from '@env';

const BASE_URL =
    Platform.OS === 'ios' ? IOS_API_BASE_URL :
        Platform.OS === 'android' ? ANDROID_API_BASE_URL :
            API_BASE_URL;

export const registerUser = async (username, email, password, userType) => {
    try {
        const response = await fetch(`${BASE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, user_type: userType }),
        });

        const text = await response.text();  // Read response as text
        console.log('Raw Response:', text);  // Log response for debugging

        return JSON.parse(text);  // Convert only if it's valid JSON
    } catch (error) {
        console.error('Registration error:', error);
        return null;
    }
};
