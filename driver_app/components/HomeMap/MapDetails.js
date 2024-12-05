import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MapDetails = ({ inicio, llegada, conductorUbicacion, estadoViaje }) => {
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [Maproute, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  const fetchCoordinates = async (address) => {
    if (typeof address === 'object') {
      return address;
    }
    try {
      const response = await fetch(
        `https://proyecto-is-google-api.vercel.app/google-maps/coordinates?address=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      return { latitude: data.lat, longitude: data.lng };
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      return null;
    }
  };

  const fetchRoute = async (start, end) => {
    if (!start || !end) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://proyecto-is-google-api.vercel.app/google-maps/directions?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.routes.length > 0) {
        const points = decodePolyline(data.routes[0].overview_polyline.points);
        setRoute(points);

        if (mapRef.current) {
          mapRef.current.fitToCoordinates(points, {
            edgePadding: { top: 25, right: 50, bottom: 400, left: 50 },
            animated: true,
          });
        }
      }
    } catch (error) {
      console.error('Error al obtener la ruta:', error);
    } finally {
      setLoading(false);
    }
  };

  const decodePolyline = (t) => {
    let points = [];
    let index = 0,
      len = t.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  useEffect(() => {
    const updateRoute = async () => {
      if (estadoViaje === 'accepted') {
        // Mostrar ruta del conductor al origen
        const origin = await fetchCoordinates(inicio);
        const destination = await fetchCoordinates(llegada);
        setOriginCoords(origin);
        setDestinationCoords(destination);
        fetchRoute(conductorUbicacion, origin);
      } else if (estadoViaje === 'in_progress') {
        // Mostrar ruta del conductor al destino
        const destination = await fetchCoordinates(llegada);
        setDestinationCoords(destination);
        fetchRoute(conductorUbicacion, destination);
      }
    };

    updateRoute();
  }, [inicio, llegada, conductorUbicacion, estadoViaje]);

  const getPolylineColor = () => {
    if (estadoViaje === 'accepted') return '#007AFF'; // Azul
    if (estadoViaje === 'in_progress') return '#4CAF50'; // Verde
    return '#9E9E9E'; // Gris (por defecto)
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: conductorUbicacion?.latitude || -12.05677,
          longitude: conductorUbicacion?.longitude || -77.0269,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Marcador del Origen */}
        {originCoords && (
          <Marker coordinate={originCoords} title="Origen">
            <Icon name="place" size={30} color="#FF9800" />
          </Marker>
        )}

        {/* Marcador del Destino */}
        {destinationCoords && (
          <Marker coordinate={destinationCoords} title="Destino">
            <Icon name="flag" size={30} color="#2196F3" />
          </Marker>
        )}

        {/* Marcador del Conductor */}
        {conductorUbicacion && (
          <Marker coordinate={conductorUbicacion} title="Conductor">
            <Icon name="directions-car" size={30} color="#4CAF50" />
          </Marker>
        )}

        {/* Ruta entre puntos */}
        {Maproute && (
          <Polyline
            coordinates={Maproute}
            strokeWidth={4}
            strokeColor={getPolylineColor()}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});