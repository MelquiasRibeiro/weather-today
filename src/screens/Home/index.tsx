import React, {useState, useEffect, useCallback} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  Container,
  InformationContainer,
  WeatherIcon,
  Loading,
  RealoadButton,
  Margin,
} from './styles';
import Geolocation from '@react-native-community/geolocation';
import {Text} from '../../components/Text';
import api from '../../services/api';
import {getHour} from '../../utils/getDateTime';
import {IWeather} from '../../types/weather';

interface ILocation {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

interface ICords {
  coords: ILocation;
  mocked?: boolean;
  timestamp: number;
}

const Home: React.FC = () => {
  const [location, setLocation] = useState<ILocation>();
  const [weatherInformation, setWeatherInformation] = useState<IWeather>();
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const callLocation = () => {
      if (Platform.OS === 'ios') {
        getLocation();
      } else {
        const requestLocationPermission = async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Permissão de Acesso à Localização',
              message: 'Este aplicativo precisa acessar sua localização.',
              buttonNeutral: 'Pergunte-me depois',
              buttonNegative: 'Cancelar',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation();
          } else {
            console.log('Permissão de Localização negada');
          }
        };
        requestLocationPermission();
      }
    };
    callLocation();
  }, []);

  const getData = useCallback(() => {
    setIsloading(true);
    api
      .get('weather', {
        params: {
          lat: location?.latitude,
          lon: location?.longitude,
        },
      })
      .then(res => setWeatherInformation(res.data))
      .catch(err => console.log(err))
      .finally(() => setIsloading(false));
  }, [location]);

  useEffect(() => {
    if (location) {
      getData();
    }
  }, [location, getData]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position: ICords) => {
        setLocation(position.coords);
      },
      error => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <Container>
      {!weatherInformation ? (
        <>
          <Loading size={50} color="#f53f0d" />
          <Text size={24} color="#f53f0d" weight="bold">
            Aguarde, Obtendo dados
          </Text>
        </>
      ) : (
        <InformationContainer
          hour={getHour(weatherInformation?.dt, weatherInformation?.timezone)}>
          {isLoading ? (
            <Loading size={50} color="#fff" />
          ) : (
            <>
              <Text
                size={24}
                weight="bold">{`${weatherInformation?.name}-${weatherInformation?.sys?.country}`}</Text>
              <Text size={60}>
                {`${Math.floor(weatherInformation?.main?.temp)}ºC`}
              </Text>
              <WeatherIcon
                source={{
                  uri: `http://openweathermap.org/img/wn/${weatherInformation.weather[0].icon}@2x.png`,
                }}
              />
              <Text size={16}>
                {weatherInformation?.weather[0]?.description}
              </Text>
              <Margin />
              <Text>{`Max: ${Math.floor(
                weatherInformation?.main?.temp_max,
              )}ºC | Min: ${Math.floor(
                weatherInformation?.main?.temp_min,
              )}ºC`}</Text>
            </>
          )}
          {isLoading ? null : (
            <RealoadButton onPress={getData} disabled={isLoading}>
              <Text weight="bold">RECARREGAR</Text>
            </RealoadButton>
          )}
        </InformationContainer>
      )}
    </Container>
  );
};

export default Home;
