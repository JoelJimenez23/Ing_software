import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, {Marker} from 'react-native-maps'

const Map = () => {
    
  return (
    <View>
        <MapView
        style={styles.map} 
            initialRegion={{
                latitude: -12.05677,
                longitude: -77.02690,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
    map: {
        with: '100%',
        height: '100%'
    }
})