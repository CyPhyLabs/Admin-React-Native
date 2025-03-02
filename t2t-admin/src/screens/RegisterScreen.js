import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { API_BASE_URL } from '@env';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('admin'); // Default

    const handleRegister = async () => {
        try {
            // Validate input fields
            if (!username || !email || !password) {
                Alert.alert('Error', 'Please fill in all fields');
                return;
            }

            // Add email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Alert.alert('Error', 'Please enter a valid email address');
                return;
            }

            const requestBody = {
                username: username,
                email: email,
                password: password,
                user_type: userType
            };

            console.log('API URL:', API_BASE_URL); // Debug log
            console.log('Request body:', requestBody); // Debug log

            const response = await fetch(`${API_BASE_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Response status:', response.status); // Debug log
            console.log('Response headers:', response.headers); // Debug log

            const text = await response.text();
            console.log('Raw response:', text); // Debug log

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Failed to parse response as JSON:', e);
                Alert.alert(
                    'Error',
                    `Server returned status ${response.status}. Please check the API endpoint and try again.`
                );
                return;
            }

            if (response.ok) {
                Alert.alert('Success', 'Account created. Please log in.');
                navigation.navigate('Login');
            } else {
                const errorMessage = data.detail ||
                    data.message ||
                    'Registration failed. Please try again.';
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert(
                'Error',
                'Network error or server unavailable. Please check your connection and try again.'
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
    },
});

export default RegisterScreen;