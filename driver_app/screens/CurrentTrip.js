import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import MapDetails from '../components/HomeMap/MapDetails';
import io from 'socket.io-client';
import tw from 'tailwind-react-native-classnames';

const socket = io('https://painfully-prime-seal.ngrok-free.app'); // Cambia a la URL de tu servidor

const CurrentTrip = () => {
  const [conductorUbicacion, setConductorUbicacion] = useState(null); // Ubicación del conductor
  const [estadoViaje, setEstadoViaje] = useState('accepted'); // El viaje comienza aceptado
  const route = useRoute();
  const { inicio, llegada, travelId } = route.params;

  useEffect(() => {
    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso Denegado', 'La aplicación necesita acceso a la ubicación.');
        return;
      }

      // Rastrear ubicación en tiempo real
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000, // Actualiza cada segundo
          distanceInterval: 10, // Actualiza cada 10 metros
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setConductorUbicacion({ latitude, longitude });

          // Enviar ubicación al backend
          socket.emit('updateDriverLocation', { travelId, latitude, longitude });
        }
      );

      return () => subscription.remove(); // Limpiar rastreo al desmontar
    };

    startTracking();
  }, [travelId]);

  useEffect(() => {
    // Escuchar actualizaciones del estado del viaje
    socket.on('travelStatusUpdate', (data) => {
      if (data.travelId === travelId) {
        setEstadoViaje(data.status);
      }
    });

    return () => {
      socket.off('travelStatusUpdate');
    };
  }, [travelId]);

  const handleButtonPress = () => {
    if (estadoViaje === 'accepted') {
      setEstadoViaje('in_progress');
      socket.emit('updateTravelStatus', { travelId, status: 'in_progress' });
    } else if (estadoViaje === 'in_progress') {
      setEstadoViaje('completed');
      socket.emit('updateTravelStatus', { travelId, status: 'completed' });
      Alert.alert('Viaje Completado', 'Has terminado el viaje.');
    }
  };

  const getButtonLabel = () => {
    if (estadoViaje === 'accepted') return 'Ya llegué';
    if (estadoViaje === 'in_progress') return 'Terminar Viaje';
    return 'Viaje Completado';
  };

  return (
    <View style={tw`h-full`}>
      {/* Mapa con rutas dinámicas */}
      <MapDetails
        inicio={estadoViaje === 'in_progress' ? conductorUbicacion:inicio}
        llegada={llegada}
        conductorUbicacion={conductorUbicacion}
        estadoViaje={estadoViaje}
      />

      {/* Botón Inferior */}
      <View style={styles.buttonContainer}>
        {estadoViaje !== 'completed' && (
          <Button title={getButtonLabel()} onPress={handleButtonPress} color="#4CAF50" />
        )}
      </View>
    </View>
  );
};

export default CurrentTrip;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});