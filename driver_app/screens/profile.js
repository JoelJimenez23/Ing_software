import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');
import { getUser,getToken } from "../utils/Auth";
const url = "https://z9i523elr0.execute-api.us-east-1.amazonaws.com/dev/get-driver";
const headers = {
	"Content-Type":"application/json"
};
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';



const UserProfile = ({ navigation }) => {
	const [user,setUser] = useState("");
	const [token,setToken] = useState("");
	const [user_data,setUser_data] = useState("");
	const [image,setImage] = useState({ uri: 'https://via.placeholder.com/100' });

	const test = () => {
		(async () => {
			const useR = await getUser();
			const tokeN = await getToken();
			setUser(useR);
			setToken(tokeN);
		})();
	};
	useEffect(() => {test();},[]);
	const getUsersito = async () => {
		try {
			const info = {
				correo:user,
				token:token
			}
			const json_data = {
				httpMethod:"GET",
				path:"/get-driver",
				body:JSON.stringify(info)
			}
			const method = "POST";
			response = await axios({
				method:method,
				url:url,
				headers:headers,
				data:json_data
			})
			const user_data = JSON.parse(response.data.body).response;
      // console.log(response);
      setUser_data(user_data);
			console.log(user_data);

		} catch (error){ console.log(error) }
	}
	
  useEffect(() => {
    if (user && token) {
      getUsersito();
      console.log(user_data);
    }
  },[user,token]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tu Perfil</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>{user_data?.nombre?.S ||"Cargando..."} {user_data?.apellido?.S}</Text>
          <Text style={styles.userRole}>{"Conductor"}</Text>
        </View>
        <Image source={image} style={styles.userImage} />
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Activity')}>
          <Ionicons name="notifications-outline" size={20} color="#6B9AC4" />
          <Text style={styles.buttonText}>Actividad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaymentInfo',{user_data})}>
          <Ionicons name="card-outline" size={20} color="#6B9AC4" />
          <Text style={styles.buttonText}>Pago</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.generalInfo}>
        <Text style={styles.infoTitle}>Datos personales</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nombre</Text>
          <Text style={styles.infoValue}>{user_data?.nombre?.S + " " + user_data?.apellido?.S || "Cargando..."}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Celular</Text>
          <Text style={styles.infoValue}>{user_data?.telefono?.S || "Cargando..."}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{user_data?.correo?.S || "Cargando..."}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
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
    marginLeft: 136,
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
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userRole: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  userImage: {
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
  logoutButton: {
    marginTop: 90,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    marginTop: 170,
    color: '#6B9AC4',
  },
});

export default UserProfile;
