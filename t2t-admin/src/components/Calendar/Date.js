import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';

const Date = ({ date, onSelectDate, selected }) => {
  const isToday = moment(date).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');
  const day = isToday ? 'Today' : moment(date).format('ddd');
  const dayNumber = moment(date).format('D');
  const fullDate = moment(date).format('YYYY-MM-DD');

  return (
    <TouchableOpacity
      onPress={() => onSelectDate(fullDate)}
      style={[
        styles.card, selected === fullDate && { backgroundColor: "#777DA7", borderColor: '#272635' },
        // isToday && { borderColor: '#272635' }
      ]}
    >
      <Text style={[styles.big, selected === fullDate && { color: "#fff" }]}>
        {day}
      </Text>
      <View style={{ height: 10 }} />
      <Text style={[styles.medium, selected === fullDate && { color: "#fff", fontWeight: 'bold', fontSize: 24, marginTop: -5 }]}>
        {dayNumber}
      </Text>
    </TouchableOpacity>
  );
};

export default Date;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 3,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    height: 73,
    width: 77,
    marginHorizontal: 3,
  },
  big: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  medium: {
    fontSize: 16,
  },
});