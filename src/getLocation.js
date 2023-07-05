import {View, Text, PermissionsAndroid, Alert, Linking} from 'react-native';
import React, {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLocation = () => {
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'location permission',
          message: 'location permission',
          // buttonNeutral: 'Ask Me Later',
          // buttonNegative: 'Cancel',
          buttonPositive: 'yes',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        getGeoLocationPosition();
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const GetLocationHook = () => {
    const result = requestLocationPermission();

    result.then(res => {
      if (res) {
        getGeoLocationPosition();
      } else {
        getGeoLocationPosition();
        //Linking.openSettings();
      }
    });
  };

  return {
    GetLocationHook,
  };
};

export default useLocation;
