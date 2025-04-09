import React from 'react';
import { UserProvider } from './src/context/UserContext';
import { AuthProvider } from './src/context/AuthContext';
import { NotificationProvider } from './src/context/NotificationContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <NotificationProvider>
          <AppNavigator />
        </NotificationProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default App;
