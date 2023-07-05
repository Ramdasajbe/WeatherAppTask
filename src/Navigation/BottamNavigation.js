// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

import React from 'react';
import Home from '../Home';
import ForeCast from '../ForeCast';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const BottamNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
          } else if (route.name === 'Forecast') {
            iconName = focused ? 'cloud-done-sharp' : 'cloud-done-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={40} color={color} />;
        },
        tabBarActiveTintColor: '#58ceb2',
        tabBarInactiveTintColor: 'gray',
        //Tab bar styles can be added here
        tabBarStyle: {
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: 'white',
          position: 'absolute',
          height: 70,
        },
        tabBarLabelStyle: {paddingBottom: 3},
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Forecast" component={ForeCast} />
    </Tab.Navigator>
  );
};

export default BottamNavigation;
