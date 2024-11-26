import React, {useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Dimensions , TextInput , FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import axios from "axios";
import {getUser,getToken} from '../utils/Auth';
import { useFocusEffect } from '@react-navigation/native';
const url_1 = "https://mj8h12vo9d.execute-api.us-east-1.amazonaws.com/dev/get-reserva";
const url_2 = "https://mj8h12vo9d.execute-api.us-east-1.amazonaws.com/dev/mod-reserva";
const headers = {
	"Content-Type":"application/json"
};



const ShowReservaInfo = ({ navigation,route }) => {
    const [reserva_id,setReserva_id] = useState();
    const [user,setUser] = useState();
    const [token,setToken] = useState();    
    const [id,setId] = useState();
    const [comentarios,setComentarios] = useState();
    const [correo_user,setCorreo_user] = useState();
    const [estado,setEstado] = useState();
    const [metodo_de_pago,setMetodo_de_pago] = useState();
    const [inicio,setInicio] = useState();
    const [llegada,setLlegada] = useState();
    const [placa,setPlaca] = useState();
    const [hora,setHora] = useState();
    const [precio,setPrecio] = useState();
    const [duracion,setDuracion] = useState();

    const test = () => {
      (async () => {
        const useR = await getUser();
        const tokeN = await getToken();
        setUser(useR);
        setToken(tokeN);
      })();
    }
  useEffect(() => {test();},[]);
  
    useEffect(() => {
      if(route){
        console.log("route params id",route.params.id);
        setReserva_id(route.params.id);
        console.log(reserva_id);
      }
    },[route]);

    const get_reserva = async () => {
      try {
        const info = {
          correo:user,
          reserva_id:reserva_id,
          token:token
        };
        const json_data = {
          httpMethod:"GET",
          path:"/get-reserva",
          body: JSON.stringify(info)
        }
        const method = "POST";
        const response = await axios({
          method:method,
          url:url_1,
          headers:headers,
          data:json_data
        })
        const datita = JSON.parse(response.data.body).response;
        console.log(datita);
        console.log( JSON.parse(response.data.body).response);
        setId(datita.id.S);
        setComentarios(datita.comentarios.S);
        setEstado(datita.estado.S);
        setMetodo_de_pago(datita.metodo_de_pago.S);
        setInicio(datita.inicio.S);
        setLlegada(datita.llegada.S);
        setPlaca(datita.placa.S);
        setHora(datita.hora.S);
        setPrecio(datita.precio.S);
        setDuracion(datita.duracion.S);
        setCorreo_user(datita.correo_user.S);
        setComentarios(datita.comentarios.S);

      } catch (error){console.log(error);}
  
    };
  
    useEffect(() => {
      if(reserva_id && user && token){get_reserva();}
    },[reserva_id,user,token])


    const AceptarReserva = async () => {
      try {
        const info = {
          correo:user,
          reserva_id:reserva_id,
          token:token,
          nuevo_estado:"aceptada"
        };
        const json_data = {
          httpMethod:"POST",
          path:"/mod-reserva",
          body: JSON.stringify(info)
        }
        const method = "POST";
        const response = await axios({
          method:method,
          url:url_2,
          headers:headers,
          data:json_data
        })
        const datita = JSON.parse(response.data.body).response;
        console.log(datita);

      } catch (error){console.log(error);}
  
    };
  


    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}></Text>
          <Text style={styles.headerTitle}></Text>
          <Text style={styles.headerTitle}></Text>

        </View>

        <View style={styles.formContainer}>
          <View style={styles.generalInfo}>
            <Text style={styles.headerTitle}>Datos de la Reserva</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Placa</Text>
              <Text style={styles.infoValue}>{placa}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Inicio</Text>
              <Text style={styles.infoValue}>{inicio}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Llegada</Text>
              <Text style={styles.infoValue}>{llegada}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Hora</Text>
              <Text style={styles.infoValue}>{hora}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Duracion (min) apox.</Text>
              <Text style={styles.infoValue}>{duracion}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>correo del usuario</Text>
              <Text style={styles.infoValue}>{correo_user}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Precio</Text>
              <Text style={styles.infoValue}>S/. {precio}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Metodo de Pago</Text>
              <Text style={styles.infoValue}>S/. {metodo_de_pago}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Comentarios</Text>
              <Text style={styles.infoValue}>{comentarios}</Text>
            </View>




          </View>
        </View>
        
        {estado === "solicitada" && (
          <TouchableOpacity
            style={[styles.submitButton, styles.activeButton]}
            onPress={() => {

              AceptarReserva();
              navigation.navigate('Reservations')
            }}
          >
            <Text style={styles.submitButtonText}>Aceptar</Text>
          </TouchableOpacity>
        )}
    </SafeAreaView>
    );
};



const styles = StyleSheet.create({
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
  
export default ShowReservaInfo;