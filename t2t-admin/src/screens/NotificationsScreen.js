// NotificationsScreen.js
import React, { useContext, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Modal, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NotificationContext } from '../context/NotificationContext'
import HomeStyles from '../styles/HomeStyles';
import NotificationStyles from '../styles/NotificationStyles';
import { useEffect } from 'react';
import { acknowledgeMessage } from '../services/sendMessage'; // or wherever you put it




const NotificationsScreen = ({route}) => {
    const { reloadNotifications } = useContext(NotificationContext);
    const { notifications, loading } = useContext(NotificationContext);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeNotificationTab, setActiveNotificationTab] = useState('unread');
    const [refreshing, setRefreshing] = useState(false);
    const [acknowledging, setAcknowledging] = useState(false);
    

    useEffect(() => {
        const openAndAcknowledge = async () => {
            if (route?.params?.openNotification) {
                const notif = route.params.openNotification;
                setSelectedNotification(notif);
                setModalVisible(true);
                try {
                    setAcknowledging(true);
                    if (notif && notif.id) {
                        console.log(`Acknowledging message with ID: ${notif.id}`);
                        await acknowledgeMessage(notif.id);
                    } else {
                        console.error('No notification ID available for acknowledgment');
                    }
                } catch (error) {
                    console.error('Failed to acknowledge message', error);
                } finally {
                    setAcknowledging(false);
                }
            }
        };
    
        openAndAcknowledge();
    }, [route?.params]);


    const onRefresh = async () => {
        setRefreshing(true); // Show spinner
        try {
            await reloadNotifications(); // Fetch new notifications (update context logic)
        } catch (error) {
            console.error('Error refreshing notifications:', error);
        } finally {
            setRefreshing(false); // Hide spinner
        }
    };


    const openModal = async (notification) => {
        setSelectedNotification(notification);
        setModalVisible(true);
        
        // Add acknowledgment logic
        try {
            setAcknowledging(true);
            if (notification && notification.id) {
                console.log(`Acknowledging message with ID: ${notification.id}`);
                await acknowledgeMessage(notification.id);
            } else {
                console.error('No notification ID available for acknowledgment');
            }
        } catch (error) {
            console.error('Failed to acknowledge message', error);
        } finally {
            setAcknowledging(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedNotification(null);
    };

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

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => openModal(item)}
            style={[HomeStyles.notificationItem]}
        >
            <View style={HomeStyles.notificationContent}>
                <Text style={HomeStyles.notificationTitle}>{item.title}</Text>
                <Text style={HomeStyles.notificationBody}>{item.body}</Text>
                <Text style={NotificationStyles.notificationDate}>
                    {formatDate(item.createdAt)}
                </Text>
            </View>
            {item.priority === 'high' && (
                <View style={NotificationStyles.priorityIconContainer}>
                    <Icon name="alert-circle" size={24} color="#FF4500" />
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={NotificationStyles.safeArea}>
            <View style={NotificationStyles.container}>
                <View style={NotificationStyles.headerContainer}>
                    <Text style={NotificationStyles.header}>Notifications</Text>
                    <Icon name="notifications-outline" size={24} color="#4F5892" />
                </View>
                <View style={HomeStyles.ovalContainer}>
                    <TouchableOpacity
                        style={[HomeStyles.tab, activeNotificationTab === 'unread' && HomeStyles.activeTab]}
                        onPress={() => setActiveNotificationTab('unread')}
                    >
                        <Text style={[HomeStyles.tabText, activeNotificationTab === 'unread' && HomeStyles.activeTabText]}>
                            Unread
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[HomeStyles.tab, activeNotificationTab === 'read' && HomeStyles.activeTab]}
                        onPress={() => setActiveNotificationTab('read')}
                    >
                        <Text style={[HomeStyles.tabText, activeNotificationTab === 'read' && HomeStyles.activeTabText]}>
                            Read
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[HomeStyles.tab, activeNotificationTab === 'priority' && HomeStyles.activeTab]}
                        onPress={() => setActiveNotificationTab('priority')}
                    >
                        <Text style={[HomeStyles.tabText, activeNotificationTab === 'priority' && HomeStyles.activeTabText]}>
                            Priority
                        </Text>
                    </TouchableOpacity>
                </View>
                {loading ? (
                    <View style={NotificationStyles.loadingContainer}>
                        <ActivityIndicator size="large" color="#4F5892" />
                        <Text style={NotificationStyles.loadingText}>Loading...</Text>
                    </View>
                ) : (
                    <FlatList
                    data={
                        activeNotificationTab === 'priority'
                            ? notifications.filter(item => item.priority === 'high')
                            : activeNotificationTab === 'read'
                                ? notifications.filter(item => item.acknowledged === true)
                                : notifications.filter(item => !item.acknowledged) // unread tab shows only unread notifications
                    }
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={
                        <Text style={NotificationStyles.emptyText}>
                            {activeNotificationTab === 'priority'
                                ? 'No priority notifications available'
                                : activeNotificationTab === 'read'
                                    ? 'No read notifications'
                                    : 'No unread notifications'}
                        </Text>
                    }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
                )}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={HomeStyles.modalContainer}>
                        <View style={HomeStyles.modalContent}>
                            <Text style={HomeStyles.modalTitle}>{selectedNotification?.title}</Text>
                            <Text style={NotificationStyles.modalBody}>{selectedNotification?.body}</Text>
                            <Text style={NotificationStyles.modalPriority}>Priority: {selectedNotification?.priority}</Text>
                            <TouchableOpacity style={HomeStyles.closeButton} onPress={closeModal}>
                                <Text style={HomeStyles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default NotificationsScreen;