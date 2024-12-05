import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { io } from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import { getUser,getToken } from "../utils/Auth";


const API_BASE_URL = 'https://painfully-prime-seal.ngrok-free.app/';

const Route = ({navigation}) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [user,setUser] = useState("");
  const [token,setToken] = useState("");

	const test = () => {
		(async () => {
			const useR = await getUser();
			const tokeN = await getToken();
			setUser(useR);
			setToken(tokeN);
		})();
	};

  const parametros_test = {
    inicio:"Jr. Medrano Silva 165",
    llegada:"RealPlaza Primavera"
  };

  useEffect(() => {
    // Configurar conexión WebSocket
    const socketInstance = io(API_BASE_URL);
    setSocket(socketInstance);

    // Registrar conductor (opcional)
    socketInstance.emit('registerDriver', { driverId: 'driver123' });

    // Escuchar lista de viajes en tiempo real
    socketInstance.on('travelList', (updatedTrips) => {
      setTrips(updatedTrips);
      setLoading(false);
    });

    // Manejar errores
    socketInstance.on('error', (error) => {
      Alert.alert('Error', error.message || 'Ocurrió un problema.');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [navigation]);

  const handleAcceptTrip = (travelId,inicio,llegada) => {
    if (socket) {
      socket.emit('acceptTravel', { travelId, driverId: user });
      navigation.navigate('CurrentTrip',{inicio,llegada,travelId});
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.routeContainer}>
      <View style={styles.routeTextContainer}>
        <Text style={styles.routeText}><Text style={styles.label}>Desde:</Text> {item.pickup}</Text>
        <Text style={styles.routeText}><Text style={styles.label}>Hasta:</Text> {item.dropoff}</Text>
        <Text style={styles.routeText}><Text style={styles.label}>Precio:</Text> ${item.price}</Text>
        <Text style={styles.routeText}><Text style={styles.label}>Detalles:</Text> {item.details}</Text>
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => handleAcceptTrip(item.id,item.pickup,item.dropoff)}
      >
        <Text style={styles.continueButtonText}>Aceptar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.safeContainer}>
      <Text style={styles.headerText}>Viajes Disponibles</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6B9AC4" />
      ) : trips.length === 0 ? (
        <Text style={styles.noTrips}> No hay viajes disponibles en este momento.</Text>
      ) : (
        <FlatList
          data={trips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.routeList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  routeContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  routeTextContainer: {
    flex: 1,
    marginBottom: 12,
  },
  routeText: {
    fontSize: 14,
    color: '#000',
  },
  label: {
    fontWeight: 'bold',
  },
  routeList: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  noTrips: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: '#6B9AC4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Route;