import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { AuthContext } from '../context/AuthContext';
import NotificationsScreen from '../screens/NotificationsScreen';
import RemindersScreen from '../screens/RemindersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import EditProfileScreen from '../screens/EditProfileScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator initialRouteName='Home'>
    <Tab.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="notifications-outline" color={color} size={size} />),
      }}
    />
     
    <Tab.Screen
      name="Events"
      component={CalendarScreen}
      options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="calendar-outline" color={color} size={size} /> ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="home-outline" color={color} size={size} />),
      }}
    />
    <Tab.Screen
      name="Reminders"
      component={RemindersScreen}
      options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="alarm-outline" color={color} size={size} /> ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{headerShown: false, tabBarIcon: ({ color, size }) => (<Icon name="settings-outline" color={color} size={size} /> ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                 {isAuthenticated ? ( 
                    <Stack.Screen name="Home" component={TabNavigator} />
                 ) : ( 
                     <> 
                        { <Stack.Screen name="Login" component={LoginScreen} /> }
                        { <Stack.Screen name="Register" component={RegisterScreen} /> }
                     </> 
                 )} 
                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;