// src/screens/HomeScreenStyles.js
import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#D7E3F1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  usernameContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  username: {
    fontSize: 28,
    fontStyle: 'italic',
    color: '#637D92',
  },
  settingsButton: {
    padding: 5,
  },
  sectionContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 20,
    color: '#29384B',
    fontWeight: '500',
    marginRight: 5,
  },
  sectionIcon: {
    // No additional styles needed
  },
  ovalContainer: {
    flexDirection: 'row',
    backgroundColor: '#637D92',
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 5,
    width: '100%',
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 12,
  },
  activeTabText: {
    color: '#637D92',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#29384B',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#637D92',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textInput: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    textAlignVertical: 'top',
    backgroundColor: '#F9F9F9',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#F9F9F9',
  },
  dropdownBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '70%',
    padding: 10,
  },
  dropdownOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 5,
  },
  sendButton: {
    backgroundColor: '#885053',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationItem: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,               // was 10
    marginBottom: 12,          // was 10
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationContent: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#272635',
    marginBottom: 0,           // remove or set to 0 instead of 2
  },

  notificationBody: {
    fontSize: 12,
    color: '#555',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',  // This aligns the button to the right
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingVertical: 5,
    color: '#637D92',
  },
  viewAllText: {
    color: '#29384B',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  priorityLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1, // Ensure it's above other content
  },
  notificationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 2,           // add this to match spacing
  },
  priorityIcon: {
    position: 'absolute',
    right: 2,
    top: '155%',               // change from 115%
    transform: [{ translateY: -12 }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeAgoText: {
    fontSize: 12,
    color: '#9BA9BF',
    position: 'absolute',
    top: -5,
    right: 2,
  },
  emptyNotificationsContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewAllButton: {
    backgroundColor: '#F8E5E5', // Light pink background
    borderWidth: 1,
    borderColor: '#885053',
  },
  emptyViewAllText: {
    color: '#885053', // Change text color to match your theme
    fontWeight: 'bold',
  },
});

export default HomeStyles;
