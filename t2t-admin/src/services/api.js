import { Platform } from 'react-native';
import { API_BASE_URL, ANDROID_API_BASE_URL, IOS_API_BASE_URL } from '@env';

// Get base URL based on platform
const getBaseUrl = () => {
    if (Platform.OS === 'ios') {
        console.log('iOS detected, using:', IOS_API_BASE_URL);
        return IOS_API_BASE_URL;
    } else if (Platform.OS === 'android') {
        console.log('Android detected, using:', ANDROID_API_BASE_URL);
        return ANDROID_API_BASE_URL;
    }
    console.log('Default platform, using:', API_BASE_URL);
    return API_BASE_URL;
};

export const BASE_URL = getBaseUrl();

// API endpoints
export const ENDPOINTS = {
    LOGIN: '/login/',
    REGISTER: '/register/',
    // Add more endpoints as needed
};

// Generic API call function
export const apiCall = async (endpoint, method = 'GET', body = null) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            ...(body && { body: JSON.stringify(body) }),
        });

        const text = await response.text();
        console.log('Response status:', response.status);
        console.log('Raw response:', text);

        try {
            const data = JSON.parse(text);
            if (!response.ok) {
                throw new Error(data.detail || 'API call failed');
            }
            return data;
        } catch (e) {
            console.error('Failed to parse response as JSON:', e);
            throw new Error('Invalid JSON response from server');
        }
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};