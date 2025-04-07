import React from 'react';
import { UserProvider } from './src/context/UserContext';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <AppNavigator />
      </UserProvider>
    </AuthProvider>
  );
};

export default App;

