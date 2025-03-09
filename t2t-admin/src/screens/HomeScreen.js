// src/screens/HomeScreen.js
import React, {
    useEffect,
    useState,
    useContext,
    useCallback,
    useMemo,
  } from 'react';
  import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Modal,
    TextInput,
  } from 'react-native';
  import { useAsyncStorage } from '@react-native-async-storage/async-storage';
  import { AuthContext } from '../context/AuthContext';
  import Icon from 'react-native-vector-icons/Ionicons';
  import { useNavigation } from '@react-navigation/native';
  import HomeStyles from '../styles/HomeStyles';
  import { Button } from 'react-native';
  
  const HomeScreen = () => {
    // #region Authentication and User Data
    const { logout } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const { getItem } = useAsyncStorage('username');
    // #endregion
  
    // #region State Variables
    const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [activeNotificationTab, setActiveNotificationTab] = useState('unread');
    const [recipient, setRecipient] = useState('all');
    const [priority, setPriority] = useState('low');
    const [isRecipientDropdownVisible, setIsRecipientDropdownVisible] =
      useState(false);
    const [isPriorityDropdownVisible, setIsPriorityDropdownVisible] =
      useState(false);
    // #endregion
  
    // #region Navigation Hook
    const navigation = useNavigation();
    // #endregion
  
    // #region useEffect Hooks
    useEffect(() => {
      const fetchUsername = async () => {
        const storedUsername = await getItem();
        if (storedUsername) {
          setUsername(storedUsername);
        }
      };
  
      fetchUsername();
    }, [getItem]);
    // #endregion
  
    // #region Modal Toggles
    const toggleSettingsModal = useCallback(() => {
      setIsSettingsModalVisible((prev) => !prev);
    }, []);
  
    const toggleAddModal = useCallback(() => {
      setIsAddModalVisible((prev) => !prev);
    }, []);
    // #endregion
  
    // #region Dropdown Toggles
    const toggleRecipientDropdown = useCallback(() => {
      setIsRecipientDropdownVisible((prev) => !prev);
    }, []);
  
    const togglePriorityDropdown = useCallback(() => {
      setIsPriorityDropdownVisible((prev) => !prev);
    }, []);
    // #endregion
  
    // #region Dropdown Selectors
    const selectRecipient = useCallback((value) => {
      setRecipient(value);
      setIsRecipientDropdownVisible(false);
    }, []);
  
    const selectPriority = useCallback((value) => {
      setPriority(value);
      setIsPriorityDropdownVisible(false);
    }, []);
    // #endregion
  
    // #region Message Handling
    const sendMessage = useCallback(() => {
      console.log('Message:', message);
      console.log('Recipient:', recipient);
      console.log('Priority:', priority);
  
      toggleAddModal();
      setMessage('');
    }, [message, recipient, priority, toggleAddModal]);
    // #endregion
  
    // #region Rendered Components
    const HeaderSection = useMemo(
      () => (
        <View style={HomeStyles.header}>
          <View style={HomeStyles.usernameContainer}>
            <Text style={HomeStyles.username}>Welcome, {username}!</Text>
          </View>
  
          <TouchableOpacity
            style={HomeStyles.settingsButton}
            onPress={toggleSettingsModal}
          >
            <Icon name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      ),
      [username, toggleSettingsModal],
    );
  
    const NotificationsSection = useMemo(
      () => (
        <View style={HomeStyles.sectionContainer}>
          <View style={HomeStyles.sectionTextContainer}>
            <Text style={HomeStyles.sectionText}>Notifications</Text>
            <Icon
              name="notifications-outline"
              size={20}
              color="#272635"
              style={HomeStyles.sectionIcon}
            />
          </View>
  
          <View style={HomeStyles.ovalContainer}>
            <TouchableOpacity
              style={[
                HomeStyles.tab,
                activeNotificationTab === 'unread' && HomeStyles.activeTab,
              ]}
              onPress={() => setActiveNotificationTab('unread')}
            >
              <Text
                style={[
                  HomeStyles.tabText,
                  activeNotificationTab === 'unread' && HomeStyles.activeTabText,
                ]}
              >
                Unread
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                HomeStyles.tab,
                activeNotificationTab === 'read' && HomeStyles.activeTab,
              ]}
              onPress={() => setActiveNotificationTab('read')}
            >
              <Text
                style={[
                  HomeStyles.tabText,
                  activeNotificationTab === 'read' && HomeStyles.activeTabText,
                ]}
              >
                Read
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ),
      [activeNotificationTab],
    );
  
    const UpcomingEventsSection = useMemo(
      () => (
        <View style={HomeStyles.sectionContainer}>
          <View style={HomeStyles.sectionTextContainer}>
            <Text style={HomeStyles.sectionText}>Upcoming Events</Text>
            <Icon
              name="calendar-outline"
              size={20}
              color="#272635"
              style={HomeStyles.sectionIcon}
            />
          </View>
        </View>
      ),
      [],
    );
  
    const PersonalRemindersSection = useMemo(
      () => (
        <View style={HomeStyles.sectionContainer}>
          <View style={HomeStyles.sectionTextContainer}>
            <Text style={HomeStyles.sectionText}>Personal Reminders</Text>
            <Icon
              name="time-outline"
              size={20}
              color="#272635"
              style={HomeStyles.sectionIcon}
            />
          </View>
        </View>
      ),
      [],
    );
  
    const SettingsModal = useMemo(
      () => (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isSettingsModalVisible}
          onRequestClose={toggleSettingsModal}
        >
          <View style={HomeStyles.modalContainer}>
            <View style={HomeStyles.modalContent}>
              <Text style={HomeStyles.modalTitle}>Settings</Text>
              <Button title="Logout" onPress={logout} />
              <TouchableOpacity
                onPress={toggleSettingsModal}
                style={HomeStyles.closeButton}
              >
                <Text style={HomeStyles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ),
      [isSettingsModalVisible, toggleSettingsModal, logout],
    );
  
    const AddItemModal = useMemo(
      () => (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddModalVisible}
          onRequestClose={toggleAddModal}
        >
          <View style={HomeStyles.modalContainer}>
            <View
              style={[HomeStyles.modalContent, { width: '90%', height: '50%' }]}
            >
              <Text style={HomeStyles.modalTitle}>Add New Item</Text>
  
              <TextInput
                placeholder="Write your message here..."
                value={message}
                onChangeText={(text) => setMessage(text)}
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
                      onPress={() => selectRecipient('all')}
                    >
                      <Text>All</Text>
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
  
              <TouchableOpacity
                style={HomeStyles.dropdownButton}
                onPress={togglePriorityDropdown}
              >
                <Text>{`Priority: ${priority}`}</Text>
                <Icon name="chevron-down" size={20} color="#333" />
              </TouchableOpacity>
  
              <Modal
                animationType="fade"
                transparent={true}
                visible={isPriorityDropdownVisible}
                onRequestClose={togglePriorityDropdown}
              >
                <TouchableOpacity
                  style={HomeStyles.dropdownBackdrop}
                  activeOpacity={1}
                  onPress={togglePriorityDropdown}
                >
                  <View style={HomeStyles.dropdownContent}>
                    <TouchableOpacity
                      style={HomeStyles.dropdownOption}
                      onPress={() => selectPriority('low')}
                    >
                      <Text>Low</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={HomeStyles.dropdownOption}
                      onPress={() => selectPriority('medium')}
                    >
                      <Text>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={HomeStyles.dropdownOption}
                      onPress={() => selectPriority('high')}
                    >
                      <Text>High</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </Modal>
  
              <View style={HomeStyles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    toggleAddModal();
                    setMessage('');
                  }}
                  style={[HomeStyles.button, HomeStyles.closeButton]}
                >
                  <Text style={HomeStyles.closeButtonText}>Close</Text>
                </TouchableOpacity>
  
                <TouchableOpacity
                  onPress={sendMessage}
                  style={[HomeStyles.button, HomeStyles.sendButton]}
                >
                  <Text style={HomeStyles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ),
      [
        isAddModalVisible,
        toggleAddModal,
        message,
        setMessage,
        recipient,
        priority,
        isRecipientDropdownVisible,
        toggleRecipientDropdown,
        selectRecipient,
        togglePriorityDropdown,
        isPriorityDropdownVisible,
        selectPriority,
        sendMessage,
      ],
    );
    // #endregion
  
    return (
      <SafeAreaView style={HomeStyles.container}>
        {HeaderSection}
        {NotificationsSection}
        {UpcomingEventsSection}
        {PersonalRemindersSection}
  
        <TouchableOpacity
          style={HomeStyles.addButton}
          onPress={toggleAddModal}
        >
          <Icon name="add" size={30} color="#FFFFFF" />
        </TouchableOpacity>
  
        {SettingsModal}
        {AddItemModal}
      </SafeAreaView>
    );
  };
  
  export default HomeScreen;
  