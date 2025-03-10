import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, Platform } from 'react-native';
import { TextInput, Button, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const RemindersScreen = () => {
  const [reminders, setReminders] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [newReminderTitle, setNewReminderTitle] = useState('');
  const [newReminderTime, setNewReminderTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    loadReminders();
  }, [])

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
    const newReminder = { title: newReminderTitle, time: newReminderTime.toLocaleString(), completed: false };
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
        return { ...reminder, title: newReminderTitle, time: newReminderTime.toLocaleString() };
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
    setNewReminderTime(new Date(reminders[index].time));
    setEditMode(true);
    setDialogVisible(true);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || newReminderTime;
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setNewReminderTime((prevTime) => {
        const newTime = new Date(prevTime);
        newTime.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        return newTime;
      });
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || newReminderTime;
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setNewReminderTime((prevTime) => {
        const newTime = new Date(prevTime);
        newTime.setHours(currentTime.getHours(), currentTime.getMinutes());
        return newTime;
      });
    }
  };

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

  return (
    <PaperProvider>
      <View style={styles.container}>
        <FlatList
          data={reminders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.reminderBanner}>
              {renderCheckbox(item, index)}
              <View style={styles.reminderDetails}>
                <Text style={[styles.reminderTitle, item.completed && styles.completedText]}>{item.title}</Text>
                <Text style={styles.reminderTime}>{item.time}</Text>
              </View>
              <Button icon="pencil" onPress={() => openEditDialog(index)} />
              <Button icon="delete" color="#f44336" onPress={() => deleteReminder(index)} />
            </View>
          )}
        />
        <TouchableOpacity style={styles.plusButton} onPress={() => setDialogVisible(true)}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
            <Dialog.Title>{editMode ? 'Edit Reminder' : 'Add Reminder'}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Title"
                value={newReminderTitle}
                onChangeText={setNewReminderTitle}
                style={styles.input}
              />
              
              <TouchableOpacity 
                style={styles.dateTimePicker}
                onPress={showDatePickerModal}
              >
                <View style={styles.dateTimePickerContainer}>
                  <Icon name="calendar-outline" size={20} color="#777DA7" style={styles.dateTimePickerIcon} />
                  <View style={styles.dateTimePickerTextContainer}>
                    <Text style={styles.dateTimePickerLabel}>Date</Text>
                    <Text style={styles.dateTimePickerValue}>{formatDate(newReminderTime)}</Text>
                  </View>
                  <Icon name="chevron-down" size={20} color="#777DA7" />
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.dateTimePicker}
                onPress={showTimePickerModal}
              >
                <View style={styles.dateTimePickerContainer}>
                  <Icon name="time-outline" size={20} color="#777DA7" style={styles.dateTimePickerIcon} />
                  <View style={styles.dateTimePickerTextContainer}>
                    <Text style={styles.dateTimePickerLabel}>Time</Text>
                    <Text style={styles.dateTimePickerValue}>{formatTime(newReminderTime)}</Text>
                  </View>
                  <Icon name="chevron-down" size={20} color="#777DA7" />
                </View>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  testID="datePicker"
                  value={newReminderTime}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleDateChange}
                />
              )}
              
              {showTimePicker && (
                <DateTimePicker
                  testID="timePicker"
                  value={newReminderTime}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={handleTimeChange}
                  is24Hour={false}
                />
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
              <Button onPress={editMode ? editReminder : addReminder}>{editMode ? 'Edit' : 'Add'}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default RemindersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8E9F3', padding: 20 },
  reminderBanner: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#e0e0e0', borderRadius: 10, marginVertical: 5 },
  reminderDetails: { flex: 1, marginLeft: 10 },
  reminderTitle: { fontSize: 16, fontWeight: 'bold' },
  reminderTime: { fontSize: 14, color: '#555' },
  completedText: { textDecorationLine: 'line-through', color: '#999' },
  plusButton: { position: 'absolute', bottom: 20, right: 20, width: 50, height: 50, borderRadius: 25, backgroundColor: '#777DA7', justifyContent: 'center', alignItems: 'center' },
  input: { marginBottom: 15 },
  checkboxContainer: { 
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#777DA7',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  checkboxContainerChecked: {
    backgroundColor: '#777DA7',
    borderColor: '#777DA7',
  },
  modalView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  dateTimePicker: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    padding: 12,
  },
  dateTimePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimePickerIcon: {
    marginRight: 10,
  },
  dateTimePickerTextContainer: {
    flex: 1,
  },
  dateTimePickerLabel: {
    fontSize: 12,
    color: '#777',
  },
  dateTimePickerValue: {
    fontSize: 16,
    color: '#000',
  },
});