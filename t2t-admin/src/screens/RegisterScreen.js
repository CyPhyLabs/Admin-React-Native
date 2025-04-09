import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { authService } from '../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RegisterStyles from '../styles/RegisterStyles';


const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('staff'); // Default

    const handleRegister = async () => {
        try {
            if (!username || !email || !password) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert('Error', 'Please enter a valid email address');
                return;
            }

            await authService.register(username, email, password, userType);
            await AsyncStorage.setItem('username', username);
            Alert.alert('Success', 'Account created. Please log in.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={RegisterStyles.container}>
          <Text style={RegisterStyles.title}>Register</Text>
            <Text style={RegisterStyles.subtitle}>Create a new account</Text>
    
          <View style={RegisterStyles.inputContainer}>
            <TextInput
              style={RegisterStyles.input}
              placeholder="Username"
              placeholderTextColor="#8E8E93"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="words"
            />
          </View>
    
          <View style={RegisterStyles.inputContainer}>
            <TextInput
              style={RegisterStyles.input}
              placeholder="Email"
              placeholderTextColor="#8E8E93"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
    
          <View style={RegisterStyles.inputContainer}>
            <TextInput
              style={RegisterStyles.input}
              placeholder="Password"
              placeholderTextColor="#8E8E93"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
    
          <TouchableOpacity style={RegisterStyles.registerButton} onPress={handleRegister}>
            <Text style={RegisterStyles.registerButtonText}>Register</Text>
          </TouchableOpacity>
    
          <View style={RegisterStyles.loginLinkContainer}>
            <Text style={RegisterStyles.haveAccountText}>I have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={RegisterStyles.loginLinkText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

export default RegisterScreen;