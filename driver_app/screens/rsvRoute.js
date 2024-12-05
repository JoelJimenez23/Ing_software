// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const ReservationRoute = () => {
//   const navigation = useNavigation();
//   const [partida, setPartida] = useState('');
//   const [destino, setDestino] = useState('');
//   const [dia, setDia] = useState('');
//   const [hora, setHora] = useState('');
//   const [focusedInput, setFocusedInput] = useState(null);

//   const routes = [
//     { id: '1', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024' },
//     { id: '2', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024' },
//     { id: '3', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024' },
//   ];

//   const handleRoutePress = (address) => {
//     if (focusedInput === 'partida') {
//       setPartida(address);
//     } else if (focusedInput === 'destino') {
//       setDestino(address);
//     }
//   };

//   const renderRoute = ({ item }) => (
//     <TouchableOpacity onPress={() => handleRoutePress(item.address)} style={styles.routeContainer}>
//       <Image
//         source={require('../assets/recent.png')}
//         style={styles.icon}
//       />
//       <View style={styles.routeTextContainer}>
//         <Text style={styles.routeText}>{item.address}</Text>
//         <Text style={styles.routeDate}>{item.date}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.safeContainer}>
//       <View style={styles.container}>

//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={26} color="#6B9AC4" />
//         </TouchableOpacity>

//         <Text style={styles.headerText}>Selecciona la Ruta</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Partida"
//           placeholderTextColor="#ccc"
//           value={partida}
//           onChangeText={setPartida}
//           onFocus={() => setFocusedInput('partida')}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Destino"
//           placeholderTextColor="#ccc"
//           value={destino}
//           onChangeText={setDestino}
//           onFocus={() => setFocusedInput('destino')}
//         />

//         <View style={styles.dateTimeContainer}>
//           <TextInput
//             style={[styles.input, styles.dateTimeInput]}
//             placeholder="Día"
//             placeholderTextColor="#ccc"
//             value={dia}
//             onChangeText={setDia}
//             onFocus={() => setFocusedInput('dia')}
//           />
//           <TextInput
//             style={[styles.input, styles.dateTimeInput]}
//             placeholder="Hora"
//             placeholderTextColor="#ccc"
//             value={hora}
//             onChangeText={setHora}
//             onFocus={() => setFocusedInput('hora')}
//           />
//         </View>

//         <FlatList
//           data={routes}
//           renderItem={renderRoute}
//           keyExtractor={item => item.id}
//           style={styles.routeList}
//         />

//         <TouchableOpacity style={styles.continueButton}>
//           <Text style={styles.continueButtonText}>Continuar</Text>
//         </TouchableOpacity>
//       </View>
      
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeContainer: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     backgroundColor: 'white',
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   backButton: {
//     position: 'absolute',
//     left: 16,
//     top: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 10,
//     paddingHorizontal: 16,
//     marginBottom: 15,
//     backgroundColor: '#F6F6F6',
//   },
//   dateTimeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dateTimeInput: {
//     flex: 1,
//     marginRight: 8,
//   },
//   routeList: {
//     marginVertical: 10,
//   },
//   routeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginRight: 12,
//   },
//   routeTextContainer: {
//     flex: 1,
//   },
//   routeText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   routeDate: {
//     fontSize: 12,
//     color: '#777',
//   },
//   continueButton: {
//     backgroundColor: '#6B9AC4',
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     marginHorizontal: 20,
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ReservationRoute;



import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { io } from 'socket.io-client';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const API_BASE_URL = 'https://proyecto-is-google-api.vercel.app';

const ReservationRoute = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/trips`);
        setTrips(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trips:', error);
        Alert.alert('Error', 'No se pudo cargar la lista de viajes.');
        setLoading(false);
      }
    };

    fetchTrips();

    const socketInstance = io(`${API_BASE_URL}/socket`);
    setSocket(socketInstance);

    socketInstance.emit('registerDriver', { driverId: 'driver123' });

    socketInstance.on('travelList', (updatedTrips) => {
      setTrips(updatedTrips);
    });

    socketInstance.on('travelAccepted', (data) => {
      Alert.alert('Viaje Aceptado', data.message, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('TripDetails', { travelId: data.travelId }),
        },
      ]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [navigation]);

  const handleAcceptTrip = async (travelId) => {
    try {
      if (socket) {
        socket.emit('acceptTravel', { travelId, driverId: 'driver123' });
      }
      await axios.post(`${API_BASE_URL}/trips/${travelId}/accept`, { driverId: 'driver123' });
    } catch (error) {
      console.error('Error accepting trip:', error);
      Alert.alert('Error', 'No se pudo aceptar el viaje.');
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
        onPress={() => handleAcceptTrip(item.id)}
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
        <Text style={styles.noTrips}>No hay viajes disponibles en este momento.</Text>
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

export default ReservationRoute;