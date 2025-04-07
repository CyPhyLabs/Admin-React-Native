import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const profileImages = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=250' },
  { id: '4', uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250' },
  { id: '5', uri: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=250' },
  { id: '6', uri: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=250' },
  { id: '7', uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250' },
  { id: '8', uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250' },
  { id: '9', uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250' },
  { id: '10', uri: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=250' }
];

const ProfilePictureSelector = ({ visible, onClose, onSelect, currentImage }) => {
  const [selectedImage, setSelectedImage] = useState(currentImage);

  const handleSelect = (image) => {
    setSelectedImage(image.uri);
  };

  const confirmSelection = () => {
    onSelect(selectedImage);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Profile Picture</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={24} color="#637D92" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.selectedPreview}>
            <Image 
              source={{ uri: selectedImage || profileImages[0].uri }} 
              style={styles.previewImage} 
            />
            <Text style={styles.previewText}>Your Profile Picture</Text>
          </View>

          <FlatList
            data={profileImages}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={[
                  styles.imageItem,
                  selectedImage === item.uri && styles.selectedItem
                ]}
                onPress={() => handleSelect(item)}
              >
                <Image source={{ uri: item.uri }} style={styles.thumbnailImage} />
                {selectedImage === item.uri && (
                  <View style={styles.checkmark}>
                    <Icon name="checkmark-circle" size={24} color="#885053" />
                  </View>
                )}
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.imageGrid}
          />

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={confirmSelection}
          >
            <Text style={styles.confirmButtonText}>Confirm Selection</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#29384B',
  },
  closeButton: {
    padding: 5,
  },
  selectedPreview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#885053',
  },
  previewText: {
    fontSize: 16,
    color: '#637D92',
  },
  imageGrid: {
    paddingVertical: 10,
  },
  imageItem: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: '#885053',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  checkmark: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  confirmButton: {
    backgroundColor: '#885053',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfilePictureSelector;