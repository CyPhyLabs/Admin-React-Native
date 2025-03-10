import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal } from 'react-native';
import Calendar from '../components/Calendar/Calendar';
import styles from '../styles/CalendarScreenStyles';
import modalStyles from '../styles/ModalStyles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [modalVisible, setModalVisible] = useState(false);
  const formattedDate = selectedDate ? moment(selectedDate).format('MMMM D, YYYY') : '';
  const tomorrowDate = moment().add(1, 'days').format('YYYY-MM-DD');
  const formattedTomorrowDate = moment(tomorrowDate).format('MMMM D, YYYY');

  // Mock event data
  const events = [
    {
      name: 'Event Name',
      host: 'Host/Type of Event',
      time: 'Now',
      date: moment().format('YYYY-MM-DD'),
      description: 'Description of the event that is quite long and needs to be truncated...'
    },
    {
      name: 'Another Event',
      host: 'Another Host/Type of Event',
      time: 'Later',
      date: moment().format('YYYY-MM-DD'),
      description: 'Another description of the event that is quite long and needs to be truncated...'
    },
    {
      name: 'Tomorrow Event',
      host: 'Tomorrow Host/Type of Event',
      time: 'Tomorrow',
      date: tomorrowDate,
      description: 'Description of the event that is quite long and needs to be truncated...'
    },
    {
      name: 'Future Event',
      host: 'Future Host/Type of Event',
      time: 'Next Week',
      date: moment().add(7, 'days').format('YYYY-MM-DD'),
      description: 'Description of the future event that is quite long and needs to be truncated...'
    }
  ];

  const todayEvents = events.filter(event => event.date === moment().format('YYYY-MM-DD'));
  const selectedEvents = events.filter(event => event.date === selectedDate);

  // Find the next available event
  const nextEvent = events.find(event => moment(event.date).isAfter(selectedDate));

  return (
    <SafeAreaView style={styles.container}>
      <Calendar onSelectDate={setSelectedDate} selected={selectedDate} />
      {selectedEvents.length > 0 ? (
        <View style={styles.eventsSection}>
          <Text style={styles.eventsText}>Events on {formattedDate}</Text>
          <ScrollView style={styles.scrollView}>
            {selectedEvents.map((event, index) => (
              <View key={index} style={styles.eventBanner}>
                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <Text style={styles.eventHost}>{event.host}</Text>
                <Text style={styles.eventDescription}>
                  {event.description.length > 40 ? `${event.description.substring(0, 45)}...` : event.description}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.eventsSection}>
          <Text style={[styles.eventsText, styles.noEventsText]}>No events on {formattedDate}</Text>
          {nextEvent && (
            <>
              <Text style={styles.eventsText}>Next event on {moment(nextEvent.date).format('MMMM D, YYYY')}</Text>
              <ScrollView style={styles.scrollView}>
                <View style={styles.eventBanner}>
                  <View style={styles.eventDetails}>
                    <Text style={styles.eventName}>{nextEvent.name}</Text>
                    <Text style={styles.eventTime}>{nextEvent.time}</Text>
                  </View>
                  <Text style={styles.eventHost}>{nextEvent.host}</Text>
                  <Text style={styles.eventDescription}>
                    {nextEvent.description.length > 40 ? `${nextEvent.description.substring(0, 45)}...` : nextEvent.description}
                  </Text>
                </View>
              </ScrollView>
            </>
          )}
        </View>
      )}
      <TouchableOpacity style={styles.plusButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <TouchableOpacity
              style={modalStyles.button}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('CreateEvent');
              }}
            >
              <Text style={modalStyles.textStyle}>Create an Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CalendarScreen;