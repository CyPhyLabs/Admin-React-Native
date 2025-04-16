import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchMessages } from '../services/sendMessage';
import { AuthContext } from './AuthContext'; // Import your AuthContext

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useContext(AuthContext); // Get auth state

    // Function to load notifications
    const loadNotifications = async () => {
        // Don't try to load notifications if not authenticated
        if (!isAuthenticated) {
            setNotifications([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const messages = await fetchMessages();
            const formattedNotifications = messages.map(item => ({
                title: item.message.title,
                body: item.message.body,
                priority: item.message.priority,
                id: item.message.message_id,
                createdAt: item.created_at,
                acknowledged: item.acknowledged,
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

    // Add isAuthenticated to the dependency array to reload when auth state changes
    useEffect(() => {
        loadNotifications();
    }, [isAuthenticated]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
    
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
    
        if (diffInSeconds < 60) {
          return `${diffInSeconds} seconds ago`;
        } else if (diffInSeconds < 3600) {
          const minutes = Math.floor(diffInSeconds / 60);
          return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
          const hours = Math.floor(diffInSeconds / 3600);
          return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
          const days = Math.floor(diffInSeconds / 86400);
          return `${days} day${days > 1 ? 's' : ''} ago`;
        }
      };

    return (
        <NotificationContext.Provider value={{ notifications, loading, reloadNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};