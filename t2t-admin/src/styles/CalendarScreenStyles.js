import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E9F3',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventsSection: {
    marginTop: -55,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    flex: 1,
  },
  eventsText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noEventsText: {
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  eventBanner: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventHost: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  eventTime: {
    fontSize: 14,
    color: '#555',
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#777DA7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;