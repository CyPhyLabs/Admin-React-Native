import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import RemindersScreen from '../screens/RemindersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{headerShown: true, tabBarIcon: ({ color, size }) => (<Icon name="notifications-outline" color={color} size={size} />),
      }}
    />
    <Tab.Screen
      name="Events"
      component={CalendarScreen}
      options={{headerShown: true, tabBarIcon: ({ color, size }) => (<Icon name="calendar-outline" color={color} size={size} /> ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: true, tabBarIcon: ({ color, size }) => (<Icon name="home-outline" color={color} size={size} />),
      }}
    />
    <Tab.Screen
      name="Reminders"
      component={RemindersScreen}
      options={{headerShown: true, tabBarIcon: ({ color, size }) => (<Icon name="alarm-outline" color={color} size={size} />),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{headerShown: true, tabBarIcon: ({ color, size }) => (<Icon name="settings-outline" color={color} size={size} />),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainHome" component={TabNavigator} options={{ headerShown: false }} />
          {/* {isAuthenticated ? (
            <Stack.Screen name="Home" component={TabNavigator} />
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AppNavigator;