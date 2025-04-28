import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/auth.service';
import LoginStyles from '../styles/LoginStyles';



const PasswordReset = ({ navigation }) => {

    const handleLogin = async () => {
       
    };
    return (
      <View style={LoginStyles.container}>
        <Text style={LoginStyles.title}>Password Reset</Text>
        <Text style={LoginStyles.subtitle}>Reset Your Password</Text>
  
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