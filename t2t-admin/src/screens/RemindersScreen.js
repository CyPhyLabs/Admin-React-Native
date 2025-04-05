import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, Platform, Animated, SafeAreaView } from 'react-native';
import { TextInput, Button, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RemindersStyles as styles } from '../styles/RemindersStyles'; 

const RemindersScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0.2)); 
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedReminders, setSelectedReminders] = useState([]);

  // Get count of active (uncompleted) reminders
  const activeRemindersCount = reminders.filter(reminder => !reminder.completed).length;
  const completedRemindersCount = reminders.length - activeRemindersCount;

  const getReminderCountText = () => {
    if (reminders.length === 0) {
      return ""; 
    } else if (reminders.length === 1) {
      return "1 Reminder";
    } else {
      return `${reminders.length} Reminders`;
    }
  };

  const getSubtitleText = () => {
    if (reminders.length === 0) {
      return "Add your first reminder below";
    } else if (completedRemindersCount === 0) {
      return "All tasks pending";
    } else if (completedRemindersCount === reminders.length) {
      return "All tasks completed";
    } else {
      return `${completedRemindersCount} of ${reminders.length} completed`;
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const storedReminders = await AsyncStorage.getItem('reminders');
      if (storedReminders) {
        setReminders(JSON.parse(storedReminders));
      }
    } catch (error) {
      console.error('Failed to load reminders', error);
    }
  };

  const saveReminders = async (reminders) => {
    try {
      await AsyncStorage.setItem('reminders', JSON.stringify(reminders));
    } catch (error) {
      console.error('Failed to save reminders', error);
    }
  };

  const addReminder = () => {
    const newReminder = { 
      title: newReminderTitle, 
      time: newReminderTime.toISOString(), 
      completed: false 
    };
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
    setNewReminderTitle('');
    setNewReminderTime(new Date());
    setDialogVisible(false);
  };

  const editReminder = () => {
    const updatedReminders = reminders.map((reminder, index) => {
      if (index === currentReminder) {
        return { 
          ...reminder, 
          title: newReminderTitle, 
          time: newReminderTime.toISOString() 
        };
      }
      return reminder;
    });
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
    setNewReminderTitle('');
    setNewReminderTime(new Date());
    setDialogVisible(false);
    setEditMode(false);
    setCurrentReminder(null);
  };

  const deleteReminder = (index) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedReminders = reminders.filter((_, i) => i !== index);
            setReminders(updatedReminders);
            saveReminders(updatedReminders);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const toggleReminderCompletion = (index) => {
    const updatedReminders = reminders.map((reminder, i) => {
      if (i === index) {
        return { ...reminder, completed: !reminder.completed };
      }
      return reminder;
    });
    setReminders(updatedReminders);
    saveReminders(updatedReminders);
  };

  const openEditDialog = (index) => {
    setCurrentReminder(index);
    setNewReminderTitle(reminders[index].title);
    
    try {
      const reminderTime = new Date(reminders[index].time);
      
      if (isNaN(reminderTime.getTime())) {
        console.log("Invalid date detected, using current date as fallback");
        setNewReminderTime(new Date());
      } else {
        setNewReminderTime(reminderTime);
      }
    } catch (error) {
      console.log("Error parsing date:", error);
      setNewReminderTime(new Date());
    }
    
    setEditMode(true);
    setDialogVisible(true);
  };

  const showDatePickerModal = () => {
    if (showTimePicker) {
      setShowTimePicker(false);
      setTimeout(() => setShowDatePicker(true), 50);
    } else {
      setShowDatePicker(!showDatePicker);
    }
  };

  const showTimePickerModal = () => {
    if (showDatePicker) {
      setShowDatePicker(false);
      setTimeout(() => setShowTimePicker(true), 50);
    } else {
      setShowTimePicker(!showTimePicker);
    }
  };

  const handleDateChange = useCallback((event, selectedDate) => {
    // Prevent unnecessary state updates if user cancels
    if (selectedDate) {
      const currentTime = newReminderTime;
      selectedDate.setHours(currentTime.getHours(), currentTime.getMinutes());
      
      setNewReminderTime(selectedDate);
    }
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setShowDatePicker(false);
      fadeAnim.setValue(0.2);
    });
  }, [newReminderTime, fadeAnim]);

  const handleTimeChange = useCallback((event, selectedTime) => {
    if (selectedTime) {
      const currentDate = newReminderTime;
      selectedTime.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      
      setNewReminderTime(selectedTime);
    }
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      setShowTimePicker(false);
      fadeAnim.setValue(0.2);
    });
  }, [newReminderTime, fadeAnim]);

  const renderCheckbox = (item, index) => {
    return (
      <TouchableOpacity 
        style={[
          styles.checkboxContainer, 
          item.completed && styles.checkboxContainerChecked
        ]} 
        onPress={() => toggleReminderCompletion(index)}
      >
        {item.completed && <Icon name="checkmark" size={18} color="#FFFFFF" />}
      </TouchableOpacity>
    );
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (showDatePicker || showTimePicker) {
      // Fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [showDatePicker, showTimePicker]);

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    setSelectedReminders([]);
  };

  const toggleReminderSelection = (index) => {
    setSelectedReminders(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const deleteSelectedReminders = () => {
    if (selectedReminders.length === 0) return;
    
    Alert.alert(
      'Delete Reminders',
      `Are you sure you want to delete ${selectedReminders.length} reminder${selectedReminders.length > 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedReminders = reminders.filter((_, index) => !selectedReminders.includes(index));
            setReminders(updatedReminders);
            saveReminders(updatedReminders);
            setSelectionMode(false);
            setSelectedReminders([]);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteCompletedReminders = () => {
    if (completedRemindersCount === 0) return;
    
    Alert.alert(
      'Delete Completed Reminders',
      `Are you sure you want to delete all ${completedRemindersCount} completed reminder${completedRemindersCount > 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedReminders = reminders.filter(reminder => !reminder.completed);
            setReminders(updatedReminders);
            saveReminders(updatedReminders);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const formatReminderTime = (timeString) => {
    try {
      const date = new Date(timeString);
      if (isNaN(date.getTime())) {
        return timeString; 
      }
      
      return date.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return timeString;
    }
  };

  const ReminderDialog = useMemo(() => (
    <Dialog 
      visible={dialogVisible} 
      onDismiss={() => setDialogVisible(false)}
      style={{ backgroundColor: '#FFFFFF', borderRadius: 10 }}
    >
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => setDialogVisible(false)}
      >
        <Icon name="close" size={22} color="#637D92" />
      </TouchableOpacity>
      
      <Dialog.Title style={styles.modalTitle}>
        {editMode ? 'Edit Reminder' : 'Add Reminder'}
      </Dialog.Title>
      
      <Dialog.Content>
        <TextInput
          placeholder="Enter reminder title"
          value={newReminderTitle}
          onChangeText={(text) => setNewReminderTitle(text)}
          style={styles.input}
        />
        
        <TouchableOpacity 
          style={styles.dateTimePicker}
          onPress={showDatePickerModal}
        >
          <View style={styles.dateTimePickerContainer}>
            <Icon name="calendar-outline" size={20} color="#637D92" style={styles.dateTimePickerIcon} />
            <View style={styles.dateTimePickerTextContainer}>
              <Text style={styles.dateTimePickerLabel}>Date</Text>
              <Text style={styles.dateTimePickerValue}>{formatDate(newReminderTime)}</Text>
            </View>
            <Icon name="chevron-down" size={20} color="#637D92" />
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.dateTimePicker}
          onPress={showTimePickerModal}
        >
          <View style={styles.dateTimePickerContainer}>
            <Icon name="time-outline" size={20} color="#637D92" style={styles.dateTimePickerIcon} />
            <View style={styles.dateTimePickerTextContainer}>
              <Text style={styles.dateTimePickerLabel}>Time</Text>
              <Text style={styles.dateTimePickerValue}>{formatTime(newReminderTime)}</Text>
            </View>
            <Icon name="chevron-down" size={20} color="#637D92" />
          </View>
        </TouchableOpacity>
        
        <View style={styles.pickerContainer}>
          {showDatePicker && (
            <Animated.View style={{ opacity: fadeAnim, position: 'absolute', width: '100%' }}>
              <DateTimePicker
                testID="datePicker"
                value={newReminderTime}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
              />
            </Animated.View>
          )}
          
          {showTimePicker && (
            <Animated.View style={{ opacity: fadeAnim, position: 'absolute', width: '100%' }}>
              <DateTimePicker
                testID="timePicker"
                value={newReminderTime}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
                is24Hour={false}
              />
            </Animated.View>
          )}
          
          {!showDatePicker && !showTimePicker && <View style={styles.placeholderPicker} />}
        </View>
      </Dialog.Content>
      
      <Dialog.Actions style={styles.buttonContainer}>
        <Button 
          onPress={() => setDialogVisible(false)}
          color="#637D92"
          style={styles.button}
        >
          Cancel
        </Button>
        <Button 
          onPress={editMode ? editReminder : addReminder}
          color="#FFFFFF"
          style={[styles.button, styles.sendButton]}
          mode="contained"
        >
          {editMode ? 'Edit' : 'Add'}
        </Button>
      </Dialog.Actions>
    </Dialog>
  ), [dialogVisible, editMode, newReminderTitle, newReminderTime, showDatePicker, showTimePicker]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {reminders.length > 0 && (
            <View style={styles.headerContainer}>
              <View style={styles.headerTopRow}>
                <Text style={styles.reminderCountText}>
                  {getReminderCountText()}
                </Text>
                
                <View style={styles.headerActions}>
                  {(selectionMode || selectedReminders.length > 0) && (
                    <>
                      {selectionMode && (
                        <TouchableOpacity 
                          style={styles.headerButton}
                          onPress={toggleSelectionMode}
                        >
                          <Icon name="close" size={22} color="#637D92" />
                        </TouchableOpacity>
                      )}
                      
                      {selectedReminders.length > 0 && (
                        <TouchableOpacity 
                          style={[styles.headerButton, styles.deleteButton]}
                          onPress={deleteSelectedReminders}
                          activeOpacity={0.6}
                        >
                          <Icon name="trash" size={22} color="#885053" />
                          <Text style={styles.deleteButtonText}>
                            Delete ({selectedReminders.length})
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}

                  {completedRemindersCount > 0 && !selectionMode && (
                    <TouchableOpacity 
                      style={[styles.headerButton, styles.deleteCompletedButton]}
                      onPress={deleteCompletedReminders}
                      activeOpacity={0.6}
                    >
                      <Icon name="trash" size={22} color="#885053" />
                      <Text style={styles.deleteButtonText}>
                        Delete ({completedRemindersCount})
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              
              <View style={styles.reminderStatusIndicator}>
                {reminders.length > 0 && (
                  <>
                    {activeRemindersCount > 0 && (
                      <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 15}}>
                        <View style={[styles.statusDot, styles.pendingDot]} />
                        <Text style={styles.reminderSubtitleText}>
                          {activeRemindersCount} pending
                        </Text>
                      </View>
                    )}
                    
                    {completedRemindersCount > 0 && (
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[styles.statusDot, styles.completedDot]} />
                        <Text style={styles.reminderSubtitleText}>
                          {completedRemindersCount} completed
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </View>
            </View>
          )}

          <FlatList
            data={reminders}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onLongPress={() => {
                  if (!selectionMode) {
                    setSelectionMode(true);
                    setSelectedReminders([index]);
                  } else {
                    toggleReminderSelection(index);
                  }
                }}
                onPress={() => {
                  if (selectionMode) {
                    toggleReminderSelection(index);
                  } else {
                  }
                }}
                activeOpacity={0.7}
                delayLongPress={300}
              >
                <View style={[
                  styles.reminderBanner,
                  selectedReminders.includes(index) && styles.selectedReminderBanner
                ]}>
                  {selectionMode ? (
                    <View style={[
                      styles.selectionCheckbox, 
                      selectedReminders.includes(index) && styles.selectionCheckboxSelected
                    ]}>
                      {selectedReminders.includes(index) && <Icon name="checkmark" size={16} color="#FFFFFF" />}
                    </View>
                  ) : (
                    renderCheckbox(item, index)
                  )}
                  
                  <View style={styles.reminderDetails}>
                    <Text style={[
                      styles.reminderTitle, 
                      item.completed && styles.completedText
                    ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.reminderTime}>{formatReminderTime(item.time)}</Text>
                  </View>
                  
                  {!selectionMode && (
                    <View style={styles.buttonActions}>
                      <Button 
                        icon="pencil" 
                        onPress={() => openEditDialog(index)} 
                        textColor="#885053"
                        style={styles.actionButton}
                      />
                      <Button 
                        icon="delete" 
                        onPress={() => deleteReminder(index)} 
                        textColor="#885053"
                        style={styles.actionButton}
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Icon name="calendar-outline" size={80} color="#885053" style={styles.emptyIcon} />
                <Text style={styles.emptyTitle}>No Reminders Yet</Text>
                <Text style={styles.emptyText}>
                  Tap the + button below to add your first reminder.
                </Text>
                <TouchableOpacity 
                  style={styles.emptyButton}
                  onPress={() => setDialogVisible(true)}
                >
                  <Text style={styles.emptyButtonText}>Create Reminder</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={reminders.length === 0 ? {flex: 1} : {}}
          />
          <TouchableOpacity style={styles.plusButton} onPress={() => setDialogVisible(true)}>
            <Icon name="add" size={30} color="#fff" />
          </TouchableOpacity>
          
          <Portal>
            {ReminderDialog}
          </Portal>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default RemindersScreen;