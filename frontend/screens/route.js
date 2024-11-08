import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Route = () => {
  const navigation = useNavigation();
  const [partida, setPartida] = useState('');    
  const [destino, setDestino] = useState('');    
  const [focusedInput, setFocusedInput] = useState(null); 

  const routes = [
    { id: '1', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024' },
    { id: '2', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024' },
    { id: '3', address: 'Jr. Medrano Silva 165, Barranco', date: '4/9/2024' },
  ];

  const handleRoutePress = (address) => {
    if (focusedInput === 'partida') {
      setPartida(address);    
    } else if (focusedInput === 'destino') {
      setDestino(address);    
    }
  };

  const renderRoute = ({ item }) => (
    <TouchableOpacity onPress={() => handleRoutePress(item.address)} style={styles.routeContainer}>
      <Image
        source={require('../assets/recent.png')}
        style={styles.icon}
      />
      <View style={styles.routeTextContainer}>
        <Text style={styles.routeText}>{item.address}</Text>
        <Text style={styles.routeDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#6B9AC4" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Selecciona la Ruta</Text>

        <TextInput
          style={styles.input}
          placeholder="Partida"
          placeholderTextColor="#ccc"
          value={partida}
          onChangeText={setPartida}
          onFocus={() => setFocusedInput('partida')} 
        />
        <TextInput
          style={styles.input}
          placeholder="Destino"
          placeholderTextColor="#ccc"
          value={destino}
          onChangeText={setDestino}
          onFocus={() => setFocusedInput('destino')} 
        />

        <FlatList
          data={routes}
          renderItem={renderRoute}
          keyExtractor={item => item.id}
          style={styles.routeList}
        />

        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: '#F6F6F6',
  },
  routeList: {
    marginVertical: 10,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  icon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  routeTextContainer: {
    flex: 1,
  },
  routeText: {
    fontSize: 14,
    color: '#000',
  },
  routeDate: {
    fontSize: 12,
    color: '#777',
  },
  continueButton: {
    backgroundColor: '#6B9AC4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Route;
