// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import MapView, {Marker} from 'react-native-maps'

// const Map = () => {
    
//   return (
//     <View>
//         <MapView
//         style={styles.map} 
//             initialRegion={{
//                 latitude: -12.05677,
//                 longitude: -77.02690,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             }}
//         />
//     </View>
//   )
// }

// export default Map

// const styles = StyleSheet.create({
//     map: {
//         with: '100%',
//         height: '100%'
//     }
// })




import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const Map = () => {
  const [location, setLocation] = useState(null); // Estado para la ubicación
  const [errorMsg, setErrorMsg] = useState(null); // Estado para errores

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // Solicitar permisos
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({}); // Obtener ubicación actual
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  if (!location) {
    return null; // Puedes reemplazar esto con un indicador de carga
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location} // Configurar la región con la ubicación actual
        showsUserLocation // Muestra el indicador de la ubicación del usuario
      >
        <Marker coordinate={location} title="Mi ubicación" />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
