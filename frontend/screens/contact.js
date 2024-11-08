import React , {useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
const url = "https://h8019u59m4.execute-api.us-east-1.amazonaws.com/dev/get-vehiculos";
const headers = {
	"Content-Type":"application/json"
};


const exampleDrivers = [
  { id: '1', name: 'Pedro Lopez', vehicle: 'Van', image: require('../assets/ConductorTemp.png'), rating: 4.5, plate: 'ABC123', dimensions: '4x2', availability: '9am - 6pm' },
  { id: '2', name: 'Ramiro Tyson', vehicle: 'Camion', image: require('../assets/ConductorTemp.png'), rating: 4.8, plate: 'XYZ789', dimensions: '6x3', availability: '10am - 5pm' },
  { id: '3', name: 'Carlos Perez', vehicle: 'Camion', image: require('../assets/ConductorTemp.png'), rating: 4.7, plate: 'LMN456', dimensions: '5x3', availability: '8am - 4pm' },
  { id: '4', name: 'Diego Garcia', vehicle: 'Flete', image: require('../assets/ConductorTemp.png'), rating: 4.6, plate: 'OPQ123', dimensions: '6x2', availability: '7am - 3pm' },
];

const ContactScreen = ({ navigation }) => {
	const [parametro,setParametro] = useState();
	const [valor,setValor] = useState();
	const [vehiculos,setVehiculos] = useState();

	const get_vehiculos = async () => {
		try {
			const info = {
				parametro:"tipo_transporte",
				valor:"van"
			}
			const json_data = {
				httpMethod:"GET",
				path:"/get-vehiculos",
				body: JSON.stringify(info)
			}
			const method = "POST";
			response = await axios({
				method:method,
				url:url,
				headers:headers,
				data:json_data
			})
			//const vehiculos = JSON.parse(response.data.body);
			console.log(response.data);
		} catch (error) {console.log(error);}
	};
		
  useFocusEffect(
    React.useCallback(() => {
      get_vehiculos();   
    }, [])  
  );

	const get_vehiculos_p= async () => {
		try {
			const info = {
				placa:"AJA",
			}
			const json_data = {
				httpMethod:"GET",
				path:"/get-vehiculo",
				body: JSON.stringify(info)
			}
			const method = "POST";
			response = await axios({
				method:method,
				url:url,
				headers:headers,
				data:json_data
			})
			//const vehiculos = JSON.parse(response.data.body);
			console.log("GET VEHICULOS P ",response.data);
		} catch (error) {console.log(error);}
	};
		
  useFocusEffect(
    React.useCallback(() => {
      get_vehiculos_p();   
    }, [])  
  );





  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('DriverProfile', { driver: item })}>
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.driverImage} />
        <Text style={styles.vehicleType}>{item.vehicle}</Text>
        <Text style={styles.driverName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Vehiculos Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vehiculos</Text>
          <TouchableOpacity onPress={() => console.log('Vehiculos button pressed')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={[
            { id: '1', name: 'Van', icon: require('../assets/Van.png') },
            { id: '2', name: 'Furgoneta', icon: require('../assets/Furgoneta.png') },
            { id: '3', name: 'Camion', icon: require('../assets/Camion.png') },
            { id: '4', name: 'Flete', icon: require('../assets/Flete.png') },
          ]}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.icon} style={styles.iconImage} />
              <Text style={styles.carouselText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        {/* Carga Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Carga</Text>
          <TouchableOpacity onPress={() => console.log('Carga button pressed')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={[
            { id: '1', name: 'Instrumentos', icon: require('../assets/Instrumentos.png') },
            { id: '2', name: 'Mudanzas', icon: require('../assets/Mudanzas.png') },
            { id: '3', name: 'Eventos', icon: require('../assets/Eventos.png') },
            { id: '4', name: 'Fragil', icon: require('../assets/Fragil.png') },
          ]}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Image source={item.icon} style={styles.cargas} />
              <Text style={styles.carouselText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Empresas</Text>
          <TouchableOpacity onPress={() => console.log('Empresas button pressed')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={[
            { id: '1', name: 'Empresa A' },
            { id: '2', name: 'Empresa B' },
            { id: '3', name: 'Empresa C' },
            { id: '4', name: 'Empresa D' },
          ]}
          renderItem={({ item }) => (
            <View style={styles.carouselItem}>
              <Text style={styles.companyLetter}>{item.name.charAt(item.name.length - 1)}</Text>
              <Text style={styles.carouselText}>{item.name}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Conductores</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Drivers')}>
            <Ionicons name="chevron-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={exampleDrivers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 16,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  carouselItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  iconImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  cargas: {
    width: 60,
    height: 60,
    marginBottom: 5,
    marginTop: 20,
  },
  carouselText: {
    fontSize: 14,
    color: '#000',
  },
  companyLetter: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#AAC1C8',
  },
  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  driverImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
    marginTop: 7,
  },
  vehicleType: {
    fontSize: 14,
    color: 'gray',
  },
  driverName: {
    fontSize: 14,
    color: '#000',
  },
});

export default ContactScreen;
