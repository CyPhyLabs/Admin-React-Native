import React, { createContext, useState, useEffect } from 'react';
import { fetchMessages } from '../services/sendMessage';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to load notifications
    const loadNotifications = async () => {
        try {
            setLoading(true);
            const messages = await fetchMessages();
            const formattedNotifications = messages.map(item => ({
                title: item.message.title,
                body: item.message.body,
                priority: item.message.priority,
                id: item.message.message_id,
                createdAt: item.created_at,
            })).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            setNotifications(formattedNotifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    // Expose reloadNotifications for pull-to-refresh
    const reloadNotifications = async () => {
        await loadNotifications();
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, loading, reloadNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
