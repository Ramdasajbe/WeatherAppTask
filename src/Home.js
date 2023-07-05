import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';

import axios from 'axios';

import React, {useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

const Home = () => {
  const getGeoLocationPosition = () => {
    console.log('inside');

    Geolocation.getCurrentPosition(
      position => {
        if (position.coords.latitude) {
          setlatitude(position.coords.latitude);
          setlongitude(position.coords.longitude);
        }
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
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

  const GetLocationHook = async () => {
    await requestLocationPermission();

    // result.then(res => {
    //   if (res) {
    //     getGeoLocationPosition();
    //   } else {
    //     getGeoLocationPosition();
    //     //Linking.openSettings();
    //   }
    // });
  };

  const [currentWeather, setcurrentWeather] = React.useState('');
  const [latitude, setlatitude] = useState(28.6139);
  const [longitude, setlongitude] = useState(77.20901);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const getData = async () => {
    const result = await axios.get(
      `https://api.open-meteo.com/v1/forecast?current_weather=true&forecast_days=1&timezone=auto&daily=temperature_2m_max,windspeed_10m_max,precipitation_sum&latitude=${latitude}&longitude=${longitude}`,
    );
    if (result.data) {
      setcurrentWeather(result.data);
    }
    // setcurrentWeather(result.data);
  };
  React.useEffect(async () => {
    await GetLocationHook();
    getData();
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        width: windowWidth / 1,
      }}>
      <Text style={{fontSize: 20, fontWeight: '900', color: 'black'}}>
        current_weather
      </Text>
      <View
        style={{
          width: windowWidth / 1.1,
          backgroundColor: 'white',
          //   alignItems: 'center',
          marginTop: '2%',
          borderRadius: 10,
          padding: '10%',
          borderColor: 'black',
          borderWidth: 1,
        }}>
        {console.log('result', currentWeather)}
        <View>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
            temperature ={currentWeather?.current_weather?.temperature} "°C",
          </Text>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
            weathercode ={currentWeather?.current_weather?.weathercode}
          </Text>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
            windspeed ={currentWeather?.current_weather?.windspeed} "km/h"
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
