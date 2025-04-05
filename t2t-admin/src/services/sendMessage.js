import { apiCall, ENDPOINTS } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const fetchMessages = async () => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        const messages = await apiCall(
            ENDPOINTS.MESSAGES,
            'GET',
            null,
            {
                Authorization: `Bearer ${token}`
            }
        );
        console.log('Fetched messages:', messages);
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const sendMessage = async ({ title, target_audience, body, priority }) => {
    try {
        const token = await AsyncStorage.getItem('access_token');
        const priorityValue = priority === true ? 'high' : 'false';
        const response = await apiCall(ENDPOINTS.SEND_MESSAGE, 'POST', {
            title,
            target_audience,
            body,
            priority: priorityValue,
        }, {
            Authorization: `Bearer ${token}`
        });
        console.log('Message sent:', response);
        return response;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};