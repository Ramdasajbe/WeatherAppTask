import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottamNavigation from './src/Navigation/BottamNavigation';
import useLocation from './src/getLocation';

export default function App() {
  // const {GetLocationHook} = useLocation();
  const {GetLocationHook} = useLocation();
  React.useEffect(() => {
    GetLocationHook();
  }, []);
  return (
    <NavigationContainer>
      <BottamNavigation />
    </NavigationContainer>
  );
}
