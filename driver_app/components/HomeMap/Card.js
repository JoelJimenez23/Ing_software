import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>Hola Conductor!</Text>
      <Text style={styles.subtitle}>Qué quieres hacer?</Text>

      <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('Route')}>
        <Image source={require('../../assets/Busca.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>Viaje Inmediato</Text>
          <Text style={styles.buttonSubtitle}>Busca de manera rápida solicitudes de viaje que se encuentre disponible en tu área</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('Reservations')} >
        <Image source={require('../../assets/Reserva.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>Reservas</Text>
          <Text style={styles.buttonSubtitle}>Organiza tus reservas y se el conductor mas productivo</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardButton} onPress={() => navigation.navigate('Contact')}>
        <Image source={require('../../assets/Van.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>Registrar Vehiculo</Text>
          <Text style={styles.buttonSubtitle}>Registrando un nuevo vehiculo tendras nuevos clientes y atacaras otro tipo de mercados!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6B9AC4',
    textAlign: 'Left',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    textAlign: 'Left',
    marginVertical: 8,
  },
  cardButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60, 
    marginRight: 15, 
  },
  textContainer: {
    flexDirection: 'column',
    flexShrink: 1, 
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B9AC4',
  },
  buttonSubtitle: {
    fontSize: 12,
    color: 'black',
  },
});

export default Card;
