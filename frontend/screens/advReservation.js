import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AdvReservation = ({ navigation }) => {
  const [price] = useState(200); 
  const [origin, setOrigin] = useState(''); 
  const [destination, setDestination] = useState(''); 
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); 

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Datos de reserva</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <Ionicons name="search" size={18} color="#A5A5A5" />
            <TextInput
              placeholder="Partida"
              style={styles.input}
              value={origin}
              onChangeText={setOrigin} 
            />
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="search" size={18} color="#A5A5A5" />
            <TextInput
              placeholder="Destino"
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputRow, styles.smallInput]}>
              <Ionicons name="calendar" size={18} color="#A5A5A5" />
              <TextInput
                placeholder="Día"
                style={styles.input}
                value={date}
                onChangeText={setDate} 
              />
            </View>
            <View style={[styles.inputRow, styles.smallInput]}>
              <Ionicons name="alarm" size={18} color="#A5A5A5" />
              <TextInput
                placeholder="Hora"
                style={styles.input}
                value={time}
                onChangeText={setTime} 
              />
            </View>
          </View>

          <View style={styles.inputRow}>
            <Ionicons name="cube" size={18} color="#A5A5A5" />
            <TextInput
              placeholder="Tipo de Carga"
              style={styles.input}
            />
          </View>

          <View style={styles.notesContainer}>
            <Ionicons name="document-text" size={18} color="#A5A5A5" style={styles.notesIcon} />
            <TextInput
              placeholder="Notas"
              style={[styles.input, styles.notesInput]}
              multiline
            />
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Precio Sugerido</Text>
          <Text style={styles.price}>S/. {price}</Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate('AdvConfirmation', {
              originAddress: origin,
              destinationAddress: destination,
              date: date,
              time: time,
            });
          }}
        >
          <Text style={styles.submitButtonText}>Solicitar Reserva</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomColor: '#E5E5E5',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 97,
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 120,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  notesContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  notesIcon: {
    marginTop: 5, 
  },
  notesInput: {
    height: 180, 
    textAlignVertical: 'top',
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginRight: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 23, 
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderTopColor: '#6B9AC4',
    marginTop: 20,
  },
  priceLabel: {
    fontSize: 16,
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B9AC4',
  },
  submitButton: {
    backgroundColor: '#6B9AC4',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AdvReservation;