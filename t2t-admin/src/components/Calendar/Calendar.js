import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import moment from 'moment';
import Date from './Date';
import { debounce } from 'lodash';

const Calendar = ({ onSelectDate, selected }) => {
  const [dates, setDates] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');

  const getDates = () => {
    const _dates = [];
    for (let i = 0; i < 365; i++) {
      const date = moment().add(i, 'days');
      _dates.push(date);
    }
    setDates(_dates);
  };

  useEffect(() => {
    getDates();
  }, []);

  useEffect(() => {
    if (dates.length > 0) {
      const month = moment(dates[0]).add(scrollPosition / 60, 'days').format('MMMM');
      const year = moment(dates[0]).add(scrollPosition / 60, 'days').format('YYYY');
      setCurrentMonth(month);
      setCurrentYear(year);
    }
  }, [scrollPosition, dates]);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.monthYearSection}>
          <Text style={styles.monthYearText}>{currentMonth} {currentYear}</Text>
        </View>
      </View>
      <View style={styles.dateSection}>
        <View style={styles.scroll}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
          >
            {dates.map((date, index) => (
              <Date
                key={index}
                date={date}
                onSelectDate={onSelectDate}
                selected={selected}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 0,
    marginBottom: 1,
  },
  monthYearSection: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  monthYearText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateSection: {
    width: '100%',
    padding: 0,
  },
  scroll: {
    height: 150,
  },
});