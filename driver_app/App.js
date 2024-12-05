import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import BottomTab from './components/Navigation/BottomTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Route from './screens/route';
import DriversList from './screens/drivers';
import DriverProfile from './screens/driverProfile';
import AdvReservation from './screens/advReservation';
import AdvConfirmation from './screens/advConfirmation';
import UserProfile from './screens/profile';
import PaymentInfo from './screens/payment';
import AddCreditCard from './screens/addCard';
import Activity from './screens/actividad';
import Reservations from './screens/reservation';
import ReservationRoute from './screens/rsvRoute';
import AdvVehicle from './screens/advVehicle';
import Schedule from './screens/schedule';
import ShowReservaInfo from './screens/showReservaInfo';
import ShowCarInfo from './screens/showCarInfo';
import ShowViajeInfo from './screens/showViajeInfo';
import CurrentTrip from './screens/CurrentTrip';
import MapDetails from './components/HomeMap/MapDetails';

export default function App() {

  const Stack = createNativeStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={BottomTab} />
      <Stack.Screen name="Route" component={Route} />
      <Stack.Screen name="Drivers" component={DriversList} />
      <Stack.Screen name="DriverProfile" component={DriverProfile} />
      <Stack.Screen name="AdvReservation" component={AdvReservation} />
      <Stack.Screen name="AdvConfirmation" component={AdvConfirmation} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="PaymentInfo" component={PaymentInfo} />
      <Stack.Screen name="AddCreditCard" component={AddCreditCard} />
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Reservations" component={Reservations} />
      <Stack.Screen name="ReservationRoute" component={ReservationRoute} />
      <Stack.Screen name="AdvVehicle" component={AdvVehicle} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="ShowReservaInfo" component={ShowReservaInfo} />
      <Stack.Screen name="ShowCarInfo" component={ShowCarInfo} />
      <Stack.Screen name="ShowViajeInfo" component={ShowViajeInfo} />
      <Stack.Screen name="CurrentTrip" component={CurrentTrip}/>
      <Stack.Screen name="MapDetails" component={MapDetails}/>
      </Stack.Navigator>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
