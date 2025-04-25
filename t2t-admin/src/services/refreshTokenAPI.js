import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './api';

export const refreshAccessToken = async () => {
    try {
        const refresh = await AsyncStorage.getItem('refresh_token');
        const access = await AsyncStorage.getItem('access_token');

        if (!refresh) {
            throw new Error('Refresh token missing');
        }

        const response = await fetch(`${BASE_URL}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`,
            },
            body: JSON.stringify({ refresh }),
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(`Failed to refresh token: ${response.status} - ${text}`);
        }

        const data = JSON.parse(text);


        await AsyncStorage.setItem('access_token', data.access);
        return data.access;
    } catch (error) {
        console.error('Error refreshing access token:', error.message);
        throw error;
    }
};
