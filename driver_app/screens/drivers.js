import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const driversData = [
  { id: '1', name: 'Pedro Lopez', vehicle: 'Van', dimensions: '2.5 × 1.7 × 1.5', rating: 4.5, image: require('../assets/ConductorTemp.png') },
  { id: '2', name: 'Juan Carlos Rivas', vehicle: 'Van', dimensions: '3.0 × 2.0 × 2.5', rating: 4.7, image: require('../assets/ConductorTemp.png') },
  { id: '3', name: 'Maria Gonzales', vehicle: 'Furgoneta', dimensions: '2.0 × 1.5 × 1.2', rating: 4.3, image: require('../assets/ConductorTemp.png') },
  { id: '4', name: 'Carlos Sanchez', vehicle: 'Camion', dimensions: '3.5 × 2.2 × 2.0', rating: 4.8, image: require('../assets/ConductorTemp.png') },
];

const DriversList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState(driversData);

  const navigateToProfile = (driver) => {
    navigation.navigate('DriverProfile', { driver });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = driversData.filter(driver =>
      driver.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDrivers(filtered);
  };

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToProfile(item)}>
        <View style={styles.driverCard}>
        <Image source={item.image} style={styles.driverImage} />
        <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{item.name}</Text>
            <Text style={styles.driverDetails}>Vehiculo: {item.vehicle}</Text>
            <Text style={styles.driverDetails}>Dimensiones: {item.dimensions}</Text>
            <View style={styles.driverRating}>
            <Ionicons name="star" size={16} color="#6B9AC4" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
        </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Conductores</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Busca"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filteredDrivers}
        keyExtractor={item => item.id}
        renderItem={renderDriverItem}
        contentContainerStyle={styles.listContent}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 16,
    width: '91%',
    marginTop: 10,
    marginHorizontal: 19,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: 'gray',
  },
  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  driverCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    width: width - 40, 
    alignSelf: 'center',
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  driverInfo: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  driverDetails: {
    fontSize: 14,
    color: '#555',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
});

export default DriversList;
