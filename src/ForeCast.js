import {
  Alert,
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import axios from 'axios';

const ForeCast = () => {
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
  React.useEffect(async () => {
    await GetLocationHook();
    GetWeather();
  }, []);
  const [latitude, setlatitude] = React.useState(28.6139);
  const [longitude, setlongitude] = React.useState(77.20901);
  const [weatherData, setweatherData] = React.useState([]);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const GetWeather = async () => {
    const result = await axios.get(
      `https://api.open-meteo.com/v1/forecast?current_weather=true&forecast_days=5&timezone=auto&daily=temperature_2m_max,windspeed_10m_max,weathercode,precipitation_sum&latitude=${latitude}&longitude=${longitude}`,
    );
    if (result.data.daily) {
      let weatherData = result.data.daily;
      const arr = [];
      for (
        let index = 0;
        index < weatherData.precipitation_sum.length;
        index++
      ) {
        let obj = {
          precipitation_sum: weatherData.precipitation_sum[index],
          temperature_2m_max: weatherData.temperature_2m_max[index],
          time: weatherData.time[index],
          windspeed_10m_max: weatherData.windspeed_10m_max[index],
          weathercode: weatherData.weathercode[index],
        };
        arr.push(obj);
      }
      setweatherData(arr);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {console.log('weatherData', weatherData)}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setlatitude(text);
            }}
            value={latitude}
            placeholder="Latitude"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => {
              setlongitude(text);
            }}
            value={longitude}
            placeholder="Longitude"
            keyboardType="numeric"
          />
          <Button title="Get Data" onPress={() => GetWeather()} />
        </View>
        <View
          style={{
            display: 'flex',

            display: 'flex',
            alignItems: 'center',

            width: windowWidth / 1,
          }}>
          <Text style={{fontSize: 20, fontWeight: '900', color: 'black'}}>
            Next 5 days Weather
          </Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
        {weatherData.map((item, id) => {
          return (
            <View
              key={id}
              style={{
                backgroundColor: 'white',
                marginBottom: '10%',
                padding: '8%',
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 15,
              }}>
              <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                Date ={item.time}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                temperature = {item.temperature_2m_max}"°C",
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                weathercode ={item.weathercode}
              </Text>
              <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                windspeed ={item.windspeed_10m_max} "km/h"
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForeCast;

const styles = StyleSheet.create({
  input: {
    width: '30%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginTop: '10%',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
