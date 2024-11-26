import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
const { width } = Dimensions.get('window');

import {getUser,getToken} from '../utils/Auth';
const headers = {
	"Content-Type":"application/json"
};

const PaymentInfo = ({ navigation,route }) => {
	const { user_data } = route.params;
	const [formattedPayments,setformattedPayments] = useState();
  const [efectivo,setEfectivo] = useState();
  const [yape,setYape] = useState();
  const [plin,setPlin] = useState();
  const [user,setUser] = useState();
  const [token,setToken] = useState();
	
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
		if(user_data){  
      console.log("siguiente paso ",user_data)
			setformattedPayments(user_data.metodo_de_pago?.M);
      console.log("llorar ",user_data.metodo_de_pago?.M);
      console.log("llorar ",user_data.metodo_de_pago?.M.efectivo?.S);
      console.log("llorar ",user_data.metodo_de_pago?.M.yape?.S);
      console.log("llorar ",user_data.metodo_de_pago?.M.plin?.S);

			console.log(formattedPayments);
      setEfectivo(user_data.metodo_de_pago?.M.efectivo?.S === "true");
      setYape(user_data.metodo_de_pago?.M.yape?.S === "true");
      setPlin(user_data.metodo_de_pago?.M.plin?.S === "true");
      

      console.log(formattedPayments)
      console.log(efectivo)
      console.log(yape)
      console.log(plin)

		}
	},[user_data]);

  const savechanges = async () => {
    const urlcito = "https://z9i523elr0.execute-api.us-east-1.amazonaws.com/dev/mod-payment";
    try {
      const info = {
        correo:user,
        token:token,
        payment_info:{
          efectivo:efectivo,
          yape:yape,
          plin:plin
        },
        tabla:"driver"
      };
      const json_data = {
        httpMethod:"POST",
        path:"/mod-payment",
        body: JSON.stringify(info)
      };
      const method = "POST";
      const response = await axios({
        url:urlcito,
        headers:headers,
        method:method,
        data:json_data
      });
      console.log(response);
    } catch (error) { console.log(error);}
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#6B9AC4" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pago</Text>
      </View>

      <ScrollView contentContainerStyle={styles.paymentMethodsList}>
   
      <TouchableOpacity
          style={[styles.paymentMethodContainer]}
          onPress={() => setEfectivo((prevEfectivo) => !prevEfectivo)} // Cambia el estado de `plin` al opuesto
        >
          <View style={styles.paymentMethodInfo}>
            <View style={styles.paymentDetails}>
              <Text style={[styles.paymentText, styles.efectivoText]}>Efectivo</Text>
            </View>
          </View>
          <Ionicons
            name={efectivo ? 'radio-button-on' : 'radio-button-off'} // Cambia el icono según el valor de `plin`
            size={20}
            color="#6B9AC4"
          />
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.paymentMethodContainer]}
          onPress={() => setYape((prevYape) => !prevYape)} // Cambia el estado de `plin` al opuesto
        >
          <View style={styles.paymentMethodInfo}>
            <View style={styles.paymentDetails}>
              <Text style={[styles.paymentText, styles.efectivoText]}>Yape</Text>
            </View>
          </View>
          <Ionicons
            name={yape ? 'radio-button-on' : 'radio-button-off'} // Cambia el icono según el valor de `plin`
            size={20}
            color="#6B9AC4"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentMethodContainer]}
          onPress={() => setPlin((prevPlin) => !prevPlin)} // Cambia el estado de `plin` al opuesto
        >
          <View style={styles.paymentMethodInfo}>
            <View style={styles.paymentDetails}>
              <Text style={[styles.paymentText, styles.efectivoText]}>Plin</Text>
            </View>
          </View>
          <Ionicons
            name={plin ? 'radio-button-on' : 'radio-button-off'} // Cambia el icono según el valor de `plin`
            size={20}
            color="#6B9AC4"
          />
        </TouchableOpacity>



        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              savechanges();
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Reservas</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>


    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 150,
    color: '#333',
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  paymentMethodsList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    minHeight: 70,
  },
  selectedPaymentMethod: {
    borderColor: '#6B9AC4',
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A73E8',
    marginRight: 10,
  },
  paymentDetails: {
    flexDirection: 'column',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  efectivoText: {
    marginLeft: 10,
  },
  paymentExpiry: {
    fontSize: 14,
    color: 'gray',
  },
  addPaymentButton: {
    justifyContent: 'left',
  },
  addPaymentText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  icon: {
    marginRight: 7,
    marginLeft: 6,
  },

  add: {
    marginLeft: 5,
  }
});

export default PaymentInfo;
