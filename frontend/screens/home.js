import React, { useState, useMemo } from "react";
import { View, ScrollView, Text, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../components/HomeMap/Map";
import BottomSheet from '@gorhom/bottom-sheet';
import Filters from "../components/Filters";

const HomeScreen = () => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const [drivers, setDrivers] = useState([]); // Estado para los conductores filtrados

  const handleApplyFilters = (filteredDrivers) => {
    setDrivers(filteredDrivers);
  };

  return (
    <View style={{ flex: 1 }}>
      <Map />
      <BottomSheet index={1} snapPoints={snapPoints}>
        <Filters onApplyFilters={handleApplyFilters} />
      </BottomSheet>

      <ScrollView style={tw`p-4`}>
        {drivers.length > 0 ? (
          drivers.map((driver, index) => (
            <View key={index} style={tw`flex-row items-center mb-4 p-4 border rounded-lg`}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }}
                style={tw`w-16 h-16 rounded-full mr-4`}
              />
              <View>
                <Text style={tw`font-bold text-lg`}>{driver.nombre} {driver.apellido}</Text>
                <Text>Calificación: {driver.calificacion} estrellas</Text>
                <Text>Tipos de vehículos: {driver.vehiculos.join(', ')}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={tw`text-center mt-10`}>No hay conductores disponibles con los filtros seleccionados</Text>
        )}
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
