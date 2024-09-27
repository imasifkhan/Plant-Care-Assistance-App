import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import DetectPlant from './src/index.js';
import SearchScreen from './src/SearchScreen.js';
import PlantDetailScreen from './src/PlantDetailScreen.js';
import SavedPlantsScreen from './src/SavedPlantsScreen.js';

// Define Stack and Tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define Stack navigator for the home screens
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name='Plant Care Assistance' component={DetectPlant} />
    <Stack.Screen name='SearchScreen' component={SearchScreen} />
    <Stack.Screen name='PlantDetailScreen' component={PlantDetailScreen} />
  </Stack.Navigator>
);


// Define Tab navigator for the home screens

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Saved Plants') {
              iconName = 'bookmark';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        {/* Define the screens for the tab navigator */}
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Saved Plants" component={SavedPlantsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
// const apiKey = "AIzaSyDn83NTiStBSdyoZnc9KquRs0puhFga4T8";
// const apiURL = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

// const apiKey = "5bynn-tA8E9NGYvTICkkWvR7WpF2YQiSZcPcOgjag-g";
// const apiURL = `https://trefle.io/api/v1/species/search?q=${Search}&limit=1&token=${apiKey}`;