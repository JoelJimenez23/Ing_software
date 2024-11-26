import React, {useState,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, Dimensions , TextInput , FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import axios from "axios";
import {getUser,getToken} from '../utils/Auth';
import { useFocusEffect } from '@react-navigation/native';

const headers = {
	"Content-Type":"application/json"
};

const url = "https://z9i523elr0.execute-api.us-east-1.amazonaws.com/dev/get-driver";
const url1 = "https://h8019u59m4.execute-api.us-east-1.amazonaws.com/dev/register-vehiculo";

const AdvVehicle = ({ navigation }) => {
	const [user,setUser] = useState("");
	const [token,setToken] = useState("");
    const [driver_info,setDriver_info] = useState();
    const [placa,setPlaca] = useState();
    const [tipo_carga,setTipo_carga] = useState();
    const [tipo_transporte,setTipo_transporte] = useState();
    const [largo,setLargo] = useState();
    const [ancho,setAncho] = useState();
    const [altura,setAltura] = useState();

	const test = () => {
		(async () => {
			const useR = await getUser();
			const tokeN = await getToken();
			setUser(useR);
			setToken(tokeN);
		})();
	}
	useEffect(() => {test();},[]);

    const get_driver_info = async () => {
        try {
            const info = {
                correo:user,
                token: token
            };
			const json_data = {
				httpMethod:"GET",
				path:"/get-driver",
				body: JSON.stringify(info)
			}
            const method = "POST";
            const response = await axios({
				method:method,
				url:url,
				headers:headers,
				data:json_data
			});
            console.log(JSON.parse(response.data.body).response);
            setDriver_info(JSON.parse(response.data.body).response);
        } catch (error) { console.log(error);}
    };

    const register_vehicle = async () => {
        try {
            const info = {
                placa:placa,
                correo_conductor:user,
                nombre_conductor:driver_info.nombre.S,
                apellido_conductor:driver_info.apellido.S,
                telefono:driver_info.telefono.S,
                tipo_carga: tipo_carga,
                tipo_transporte:tipo_transporte,
                dimensiones:{largo:largo,ancho:ancho,altura:altura},
                token:token
            };
            const json_data = {
				httpMethod:"POST",
				path:"/register-vehiculo",
				body: JSON.stringify(info)
            }
            const method = "POST";
            const response = await axios({
                method:method,
                url:url1,
                headers:headers,
                data:json_data
            });
            const statusCode = JSON.parse(response.data.body).response.$metadata.httpStatusCode;
            return statusCode;
        } catch (error) {console.log(error);return null;}
    };

    useFocusEffect(
        React.useCallback(() => {
          if (user && token) {
            get_driver_info();   
          }
        }, [user, token])  
    );
    
    return (
        <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Datos de vehiculo</Text>
        </View>

        <View style={styles.formContainer}>
            <View style={styles.inputRow}>
                {/* <Ionicons name="search" size={18} color="#A5A5A5" /> */}
                <TextInput
                placeholder="Placa"
                style={styles.input}
                value={placa}
                onChangeText={setPlaca}
                />
            </View>

            <View style={styles.inputRow}>
                {/* <Ionicons name="search" size={18} color="#A5A5A5" /> */}
                <TextInput
                placeholder="Tipo de Carga"
                style={styles.input}
                value={tipo_carga}
                onChangeText={setTipo_carga}
                />
            </View>

            <View style={styles.inputRow}>
                {/* <Ionicons name="search" size={18} color="#A5A5A5" /> */}
                <TextInput
                placeholder="Tipo de Transporte"
                style={styles.input}
                value={tipo_transporte}
                onChangeText={setTipo_transporte}
                />
            </View>


            <View style={styles.row}>

                <View style={[styles.inputRow, styles.smallInput]}>
                {/* <Ionicons name="alarm" size={18} color="#A5A5A5" /> */}
                <TextInput
                    placeholder="Altura"
                    style={styles.input}
                    value={altura}
                    onChangeText={setAltura}
                />
                </View>

                <View style={[styles.inputRow, styles.smallInput]}>
                {/* <Ionicons name="alarm" size={18} color="#A5A5A5" /> */}
                <TextInput
                    placeholder="Ancho"
                    style={styles.input}
                    value={ancho}
                    onChangeText={setAncho}
                />
                </View>
        
                <View style={[styles.inputRow, styles.smallInput]}>
                {/* <Ionicons name="alarm" size={18} color="#A5A5A5" /> */}
                <TextInput
                    placeholder="Largo"
                    style={styles.input}
                    value={largo}
                    onChangeText={setLargo}
                />
                </View>
            </View>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={async () => {
            const statusCode = await register_vehicle();
            console.log(statusCode);
            if (statusCode === 200) {
              console.log("Registro válido");
              navigation.navigate("Contact");
            } else {
              console.log("Error en el registro");
            }
          }}
        >
          <Text style={styles.submitButtonText}>Registrar</Text>
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
  
export default AdvVehicle;