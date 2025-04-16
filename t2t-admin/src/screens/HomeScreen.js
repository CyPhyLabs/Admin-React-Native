import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Switch, Platform} from 'react-native';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/AuthContext';
import HomeStyles from '../styles/HomeStyles';
import { fetchMessages, sendMessage } from '../services/sendMessage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);
  const { getItem: getStoredUsername } = useAsyncStorage('username');

  // User state
  const [username, setUsername] = useState('');
  
  // Notifications state
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isRecipientDropdownVisible, setIsRecipientDropdownVisible] = useState(false);
  
  // Message form state
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('everyone');
  const [isPriority, setIsPriority] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await getStoredUsername();
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    fetchUsername();
  }, [getStoredUsername]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const fetchNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchMessages();
      const formattedNotifications = data.map(item => ({
        title: item.message.title,
        body: item.message.body,
        priority: item.message.priority,
        read: false,
        id: item.message.message_id,
        created_at: item.created_at,
      }));

      setNotifications(formattedNotifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleAddModal = useCallback(() => {
    setIsAddModalVisible(prev => !prev);
  }, []);

  const toggleRecipientDropdown = useCallback(() => {
    setIsRecipientDropdownVisible(prev => !prev);
  }, []);

  const selectRecipient = useCallback((value) => {
    setRecipient(value);
    setIsRecipientDropdownVisible(false);
  }, []);

  const resetForm = useCallback(() => {
    setMessage('');
    setTitle('');
    setRecipient('everyone');
    setIsPriority(false);
  }, []);

  const handleSendMessage = useCallback(async () => {
    try {
      const response = await sendMessage({
        title,
        target_audience: recipient,
        body: message,
        priority: isPriority,
        created_at: new Date().toISOString(),
      });
      
      console.log('API Response:', response);
      resetForm();
      toggleAddModal();
      fetchNotifications(); // Refresh notifications after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }, [message, title, recipient, isPriority, resetForm, toggleAddModal, fetchNotifications]);

  const formatDate = useCallback((dateString) => {
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
  }, []);

  const HeaderSection = useMemo(() => (
    <View style={HomeStyles.header}>
      <View style={HomeStyles.usernameContainer}>
        <Text style={HomeStyles.username}>Welcome, {username}!</Text>
      </View>
    </View>
  ), [username]);

  const NotificationsSection = useMemo(() => (
    <View style={HomeStyles.sectionContainer}>
      <View style={HomeStyles.sectionTextContainer}>
        <Text style={HomeStyles.sectionText}>Notifications</Text>
        <Icon name="notifications-outline" size={20} color="#885053" style={HomeStyles.sectionIcon} />
      </View>

      {notifications.length > 0 ? (
        [...notifications]
          .filter(notification => !notification.acknowledged)
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 3)
          .map((notification, index) => (
            <TouchableOpacity 
              key={index} 
              style={HomeStyles.notificationItem}
              onPress={() => {
                const formattedNotification = {
                  id: notification.id,
                  title: notification.title,
                  body: notification.body,
                  priority: notification.priority,
                  createdAt: notification.created_at,
                  acknowledged: notification.acknowledged
                };
                navigation.navigate('Notifications', { openNotification: formattedNotification });
              }}
            >
              <View style={HomeStyles.notificationContent}>
                <View style={HomeStyles.notificationTitleContainer}>
                  <Text style={HomeStyles.notificationTitle}>{notification.title}</Text>
                  {notification.priority === 'high' && (
                    <View style={HomeStyles.priorityIcon}>
                      <Icon name="alert-circle" size={24} color="#FF4500" />
                    </View>
                  )}
                </View>
                <Text style={HomeStyles.notificationBody}>{notification.body}</Text>
                <Text style={HomeStyles.timeAgoText}>{formatDate(notification.created_at)}</Text>
              </View>
            </TouchableOpacity>
          ))
      ) : (
        <Text style={HomeStyles.noNotificationsText}>
          {isLoading ? "Loading notifications" : "No notifications"}
        </Text>
      )}
      <TouchableOpacity
        style={HomeStyles.viewAllButton}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Text style={HomeStyles.viewAllText}>View All</Text>
        <Icon name="chevron-forward" size={16} color="#29384B" />
      </TouchableOpacity>
    </View>
  ), [notifications, isLoading, formatDate, navigation]);

  const UpcomingEventsSection = useMemo(() => (
    <View style={HomeStyles.sectionContainer}>
      <View style={HomeStyles.sectionTextContainer}>
        <Text style={HomeStyles.sectionText}>Upcoming Events</Text>
        <Icon
          name="calendar-outline"
          size={20}
          color="#885053"
          style={HomeStyles.sectionIcon}
        />
      </View>
    </View>
  ), []);

  const AddItemModal = useMemo(() => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAddModalVisible}
      onRequestClose={() => {
        toggleAddModal();
        resetForm();
      }}
    >
      <View style={HomeStyles.modalContainer}>
        <View style={[HomeStyles.modalContent, { width: '90%', height: '50%' }]}>
          <TouchableOpacity
            style={HomeStyles.closeIcon}
            onPress={() => {
              toggleAddModal();
              resetForm();
            }}
          >
            <Icon name="close" size={24} color="#885053" />
          </TouchableOpacity>
          
          <Text style={HomeStyles.modalTitle}>Add New Item</Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={[HomeStyles.textInput, { height: 40 }]}
            maxLength={100}
            autoCapitalize="sentences"
            returnKeyType="next"
          />

          <TextInput
            placeholder="Write your message here..."
            value={message}
            onChangeText={setMessage}
            multiline
            style={[HomeStyles.textInput, { height: 120 }]}
          />

          <TouchableOpacity
            style={HomeStyles.dropdownButton}
            onPress={toggleRecipientDropdown}
          >
            <Text>{`Recipient: ${recipient}`}</Text>
            <Icon name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isRecipientDropdownVisible}
            onRequestClose={toggleRecipientDropdown}
          >
            <TouchableOpacity
              style={HomeStyles.dropdownBackdrop}
              activeOpacity={1}
              onPress={toggleRecipientDropdown}
            >
              <View style={HomeStyles.dropdownContent}>
                <TouchableOpacity
                  style={HomeStyles.dropdownOption}
                  onPress={() => selectRecipient('everyone')}
                >
                  <Text>Everyone</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={HomeStyles.dropdownOption}
                  onPress={() => selectRecipient('veterans')}
                >
                  <Text>Veterans</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={HomeStyles.dropdownOption}
                  onPress={() => selectRecipient('staff')}
                >
                  <Text>Staff</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>

          <View style={HomeStyles.priorityContainer}>
            <Text style={HomeStyles.priorityLabel}>Priority:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#885053" }}
              thumbColor={isPriority ? "#f4f3f4" : "#f4f3f4"}
              value={isPriority}
              onValueChange={setIsPriority}
              style={Platform.OS === 'android' ? { transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] } : {}}
            />
          </View>

          <View style={HomeStyles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSendMessage}
              style={[HomeStyles.button, HomeStyles.sendButton]}
            >
              <Text style={HomeStyles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ), [
    isAddModalVisible,
    toggleAddModal,
    resetForm,
    message,
    title,
    recipient,
    isPriority,
    isRecipientDropdownVisible,
    toggleRecipientDropdown,
    selectRecipient,
    handleSendMessage
  ]);

  return (
    <SafeAreaView style={HomeStyles.container}>
      {HeaderSection}
      {NotificationsSection}
      {UpcomingEventsSection}

      <TouchableOpacity
        style={HomeStyles.addButton}
        onPress={toggleAddModal}
      >
        <Icon name="add" size={30} color="#FFFFFF" />
      </TouchableOpacity>

      {AddItemModal}
    </SafeAreaView>
  );
};

export default HomeScreen;