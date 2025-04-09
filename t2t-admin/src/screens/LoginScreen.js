import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import LoginStyles from '../styles/LoginStyles';



const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            const data = await authService.login(email, password);
            
            await AsyncStorage.setItem('access_token', data.access);
            await AsyncStorage.setItem('refresh_token', data.refresh);
            
            login();
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
    return (
      <View style={LoginStyles.container}>
        <Text style={LoginStyles.title}>Sign in to your Account</Text>
        <Text style={LoginStyles.subtitle}>Welcome back! Please enter your details.</Text>
  
        <TextInput
          placeholder="Email"
          placeholderTextColor="#8E8E93"
          value={email}
          onChangeText={setEmail}
          style={LoginStyles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#8E8E93"
          value={password}
          onChangeText={setPassword}
          style={LoginStyles.input}
          secureTextEntry
        />
  
        <TouchableOpacity onPress={() => console.log('Forgot Password pressed')}>
          <Text style={LoginStyles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={LoginStyles.loginButton} onPress={handleLogin}>
          <Text style={LoginStyles.loginButtonText}>Login</Text>
        </TouchableOpacity>
    
  
        <View style={LoginStyles.footer}>
          <Text style={LoginStyles.footerText}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={LoginStyles.footerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default LoginScreen;