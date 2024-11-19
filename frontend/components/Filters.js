import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { Slider } from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import tw from "tailwind-react-native-classnames";
import axios from 'axios';

const Filters = ({ onApplyFilters }) => {
  const [driverRating, setDriverRating] = useState(null); // Calificación del conductor
  const [selectedCargoTypes, setSelectedCargoTypes] = useState([]); // Tipos de carga seleccionados
  const [selectedTransportTypes, setSelectedTransportTypes] = useState([]); // Tipos de transporte seleccionados
  const [vehicleDimension, setVehicleDimension] = useState(0); // Dimensiones del vehículo
  const [loading, setLoading] = useState(false); // Para indicar si se está cargando la solicitud

  const cargoTypes = [
    'Equipos Audiovisuales', 'Escenografia y estructuras', 'Instrumentos musicales',
    'Equipos técnicos', 'Mobiliario para eventos', 'Material frágil', 'Muebles y enseres',
    'Documentación y archivos', 'Equipaje o artefactos personales'
  ];

  const transportTypes = [
    'Camiones de caja cerrada', 'Furgonetas de carga', 'Camiones refrigerados',
    'Camiones con rampa o plataforma', 'Vehículos con remolque o trailer', 'Camionetas pickup',
    'Furgonetas con compartimientos acolchados', 'Camiones de plataforma abierta',
    'Camiones mudanceros', 'Remolques de carga especializados'
  ];

  // Llamada al backend con los filtros aplicados
  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      const filters = {
        driverRating,
        selectedCargoTypes,
        selectedTransportTypes,
        vehicleDimension,
      };
      const token = 'tu-token-aqui'; // Reemplaza esto con el token real del usuario

      const response = await axios.post('http://localhost:3000/marketplace/filter-drivers', filters, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
      });

      setLoading(false);
      onApplyFilters(response.data.response); // Enviar los resultados filtrados al componente principal
    } catch (error) {
      setLoading(false);
      console.error("Error aplicando filtros: ", error);
    }
  };

  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-lg font-bold mb-4`}>Filtros de búsqueda</Text>

      <Text style={tw`text-base font-medium`}>Calificación del Conductor</Text>
      <View style={tw`flex-row`}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <View key={rating} style={tw`mr-4`}>
            <RadioButton
              value={rating}
              status={driverRating === rating ? 'checked' : 'unchecked'}
              onPress={() => setDriverRating(rating)}
            />
            <Text>{rating} Estrellas</Text>
          </View>
        ))}
      </View>

      <Text style={tw`text-base font-medium mt-4`}>Tipo de Carga</Text>
      {cargoTypes.map((type) => (
        <View key={type} style={tw`flex-row items-center mb-2`}>
          <CheckBox
            value={selectedCargoTypes.includes(type)}
            onValueChange={(newValue) => {
              if (newValue) {
                setSelectedCargoTypes([...selectedCargoTypes, type]);
              } else {
                setSelectedCargoTypes(selectedCargoTypes.filter((item) => item !== type));
              }
            }}
          />
          <Text style={tw`ml-2`}>{type}</Text>
        </View>
      ))}

      <Text style={tw`text-base font-medium mt-4`}>Tipo de Transporte</Text>
      {transportTypes.map((type) => (
        <View key={type} style={tw`flex-row items-center mb-2`}>
          <CheckBox
            value={selectedTransportTypes.includes(type)}
            onValueChange={(newValue) => {
              if (newValue) {
                setSelectedTransportTypes([...selectedTransportTypes, type]);
              } else {
                setSelectedTransportTypes(selectedTransportTypes.filter((item) => item !== type));
              }
            }}
          />
          <Text style={tw`ml-2`}>{type}</Text>
        </View>
      ))}

      <Text style={tw`text-base font-medium mt-4`}>Dimensiones del Vehículo</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={1000}
        step={10}
        value={vehicleDimension}
        onValueChange={(value) => setVehicleDimension(value)}
      />
      <Text>Dimensión Seleccionada: {vehicleDimension} cm</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Aplicar Filtros" onPress={handleApplyFilters} />
      )}
    </View>
  );
};

export default Filters;
