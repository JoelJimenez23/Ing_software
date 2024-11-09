import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const DriverProfile = ({ navigation, route }) => {
  const { vehiculo_seleccionado } = route.params;
	console.log(vehiculo_seleccionado);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conductor</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Text style={styles.driverName}>{vehiculo_seleccionado.nombre_conductor}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="white" />
            <Text style={styles.ratingText}>{ vehiculo_seleccionado.calificacion_promedio?.S || "nose" }</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="chatbox" size={20} color="#6B9AC4" />
          <Text style={styles.buttonText}>Contacto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdvReservation')}>
          <Ionicons name="calendar" size={20} color="#6B9AC4" />
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.generalInfo}>
        <Text style={styles.infoTitle}>Datos Generales</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Placa</Text>
          <Text style={styles.infoValue}>{vehiculo_seleccionado.placa}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vehiculo</Text>
          <Text style={styles.infoValue}>{vehiculo_seleccionado.tipo_transporte}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Dimensiones</Text>
          <Text style={styles.infoValue}>{vehiculo_seleccionado.dimensiones}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Disponibilidad</Text>
          <Text style={styles.infoValue}>{"FINO"}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 115,
    color: '#333',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileDetails: {
    flexDirection: 'column',
  },
  driverName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B9AC4',
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 14,
    marginTop: 5,
    alignSelf: 'flex-start', 
  },
  ratingText: {
    fontSize: 14,
    color: 'white',
    marginLeft: 5,
  },
  driverImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 5,
  },
  generalInfo: {
    paddingHorizontal: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#6B9AC4',
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
});

export default DriverProfile;
