import { StyleSheet, Platform } from 'react-native';

export const RemindersStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Match your container background
  },
  container: { 
    flex: 1, 
    backgroundColor: '#D7E3F1',
    padding: 20,
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: -20,  // Extend beyond the container padding
    marginTop: -20, // Remove top margin gap
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20, // Add extra padding for iOS
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(99, 125, 146, 0.1)',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  reminderCountText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#29384B',
    marginBottom: 4,
  },
  reminderSubtitleText: {
    fontSize: 14,
    color: '#637D92',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderBanner: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10, 
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  reminderDetails: { 
    flex: 1, 
    marginLeft: 10 
  },
  reminderTitle: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#29384B'
  },
  reminderTime: { 
    fontSize: 14, 
    color: '#637D92'
  },
  completedText: { 
    textDecorationLine: 'line-through', 
    color: '#999' 
  },
  plusButton: { 
    position: 'absolute', 
    bottom: 20, 
    right: 20, 
    width: 60,
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#637D92',
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: { 
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  checkboxContainer: { 
    width: 24,
    height: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#637D92',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  checkboxContainerChecked: {
    backgroundColor: '#637D92',
    borderColor: '#637D92',
  },
  modalView: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  dateTimePicker: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9F9F9',
  },
  dateTimePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimePickerIcon: {
    marginRight: 10,
    color: '#637D92',
  },
  dateTimePickerTextContainer: {
    flex: 1,
  },
  dateTimePickerLabel: {
    fontSize: 12,
    color: '#637D92',
  },
  dateTimePickerValue: {
    fontSize: 16,
    color: '#29384B',
  },
  pickerContainer: {
    height: 215,
    justifyContent: 'center',
    marginTop: 10,
    position: 'relative',
  },
  placeholderPicker: {
    height: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    marginBottom: 20,
    opacity: 0.8,
    color: '#885053',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29384B',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#637D92',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  emptyButton: {
    backgroundColor: '#885053',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#29384B',
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButton: {
    backgroundColor: '#885053',
  },
  reminderStatusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  completedDot: {
    backgroundColor: '#4CAF50', // Green for completed
  },
  pendingDot: {
    backgroundColor: '#FFC107', // Amber for pending
  },
  buttonActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 8, // Reduces spacing between the text and buttons
  },
  actionButton: {
    marginHorizontal: -6, // This brings the buttons closer together
  },
  deleteFloatingButton: {
    position: 'absolute',
    bottom: 80,
    right: 25,
    backgroundColor: '#885053',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 100,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(136, 80, 83, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#885053',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 14,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  deleteCompletedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(136, 80, 83, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default RemindersStyles;