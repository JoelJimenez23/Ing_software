import React , {useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import {getUser,getToken} from '../utils/Auth';
const url = "https://h8019u59m4.execute-api.us-east-1.amazonaws.com/dev/get-vehiculo-conductor";
const headers = {
	"Content-Type":"application/json"
};


const ContactScreen = ({ navigation }) => {
	const [user,setUser] = useState("");
	const [token,setToken] = useState("");
  const [vehiculitos,setVehiculitos] = useState([]);
	const test = () => {
		(async () => {
			const useR = await getUser();
			const tokeN = await getToken();
			setUser(useR);
			setToken(tokeN);
		})();
	}
	useEffect(() => {test();},[]);

	const vehiculos = async () => {
		try {
			const info = {
				correo:user,
				token : token
			};
			const json_data = {
				httpMethod:"GET",
				path:"/get-vehiculo-conductor",
				body: JSON.stringify(info)
			}
			const method = "POST";
	
			const response = await axios({
				method:method,
				url:url,
				headers:headers,
				data:json_data
			})
      const vehiculos_c = JSON.parse(response.data.body).response;
      const formattedVehiculos = vehiculos_c.map(item => ({
        placa: item.placa.S,
        calificacion_promedio: item.calificacion_promedio.S,
        tipo_carga: item.tipo_carga.S,
        tipo_transporte: item.tipo_transporte.S,
        altura: item.dimensiones.M.altura.S,
        largo: item.dimensiones.M.largo.S,
        ancho: item.dimensiones.M.ancho.S
      }));
      setVehiculitos(formattedVehiculos);
			console.log("GET VEHICULOS_c P ",vehiculos_c);
		} catch (error){console.log(error);}
	};
  useFocusEffect(
    React.useCallback(() => {
      if (user && token) {
        vehiculos();   
      }
    }, [user, token])  
  );

  const renderVehiculoItem = ({ item }) => (
    <VehiculoItem
      placa={item.placa}
      calificacion_promedio={item.calificacion_promedio}
      tipo_carga={item.tipo_carga}
      tipo_transporte={item.tipo_transporte}
      altura={item.altura}
      largo={item.largo}
      ancho={item.ancho}
    />
  );
  // return (
  //   <SafeAreaView style={styles.safeArea}>
  //     <View style={styles.container}>
  //       <Text style={styles.title}>Vehiculos</Text>

  //       <View style={styles.reservationsList}>
  //         {vehiculitos.map(route => (
  //           <VehiculoItem
  //             placa={route.placa}
  //             calificacion_promedio={route.calificacion_promedio}
  //             tipo_carga={route.tipo_carga}
  //             tipo_transporte={route.tipo_transporte}
  //             altura={route.altura}
  //             largo={route.largo}
  //             ancho={route.ancho}
  //           />
  //         ))}
  //       </View>    

  //     </View>
  //     <View>
  //       <TouchableOpacity
  //           style={styles.submitButton}
  //           onPress={() => {
  //             navigation.navigate('AdvVehicle');
  //           }}
  //         >
  //         <Text style={styles.submitButtonText}>Registrar Vehiculo</Text>
  //       </TouchableOpacity>
  //   </View>

  //   </SafeAreaView>
  // );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Vehiculos</Text>
        <FlatList
          data={vehiculitos}
          renderItem={renderVehiculoItem}
          keyExtractor={(item) => item.placa}
          contentContainerStyle={styles.reservationsList}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            navigation.navigate('AdvVehicle');
          }}
        >
          <Text style={styles.submitButtonText}>Registrar Vehiculo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

};

const VehiculoItem = ({ placa, calificacion_promedio, tipo_carga ,tipo_transporte, altura ,largo,ancho }) => (
    <TouchableOpacity style={styles.VehiculoItem}>
      <Ionicons name="car-outline" size={24} color="#4A90E2" />
      <View style={styles.reservationTextContainer}>
        <Text style={styles.reservationText}> Placa: {placa}  </Text>
        <Text style={styles.reservationText}> Carga: {tipo_carga}  </Text>
        <Text style={styles.reservationText}> Transporte: {tipo_transporte}  </Text>
        <Text style={styles.reservationText}> Altura : {altura} Largo : {largo}  Ancho : {ancho}</Text>


        {/* <Text style={styles.reservationText}>{calificacion_promedio}</Text> */}
      </View>

    </TouchableOpacity>
);

const renderVehiculoItem = ({ item }) => (
  <VehiculoItem
    placa={item.placa}
    calificacion_promedio={item.calificacion_promedio}
    tipo_carga={item.tipo_carga}
    tipo_transporte={item.tipo_transporte}
    altura={item.altura}
    largo={item.largo}
    ancho={item.ancho}
  />
);

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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    color: '#333',
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
  VehiculoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reservationText: {
    fontSize: 16,
    color: '#333',
  },
  reservationTextContainer: {
    flex: 1,
    marginLeft: 12,
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
  reservationsList: {
    marginBottom: 20,
  }
});

export default ContactScreen;
