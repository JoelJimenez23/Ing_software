import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window');
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';
import {getUser} from '../utils/Auth';
const headers = {
	"Content-Type":"application/json"
};




export default function Schedule( {navigation} ) {
    const swiper = useRef();
    const [value, setValue] = useState(new Date());
    const [week, setWeek] = useState(0);
	const [user,setUser] = useState("");
    const [horario,setHorario] = useState([]);
	const test = () => {
		(async () => {
			const useR = await getUser();
			setUser(useR);
		})();
	}
	useEffect(() => {test();},[]);


  const obtenerHorario = async () => {
    const urlcito = "https://mj8h12vo9d.execute-api.us-east-1.amazonaws.com/dev/day-schedule";
    try {
        const info = {
            fecha:moment(value).format('YYYY-MM-DD'),
            correo_driver:user, //esto se debe pasar por route params
            estado: "solicitada"//cambiar a "acpetada"
        };
        console.log(info);
        const json_data = {
            httpMethod:"GET",
            path:"/day-schedule",
            body: JSON.stringify(info)
        }
        const method = "POST";
        console.log("hola");
        const response = await axios({
            url:urlcito,
            headers:headers,
            method:method,
            data:json_data
        });
        console.log("HORARIO")
        setHorario(ordenarPorHora(JSON.parse(response.data.body).response));
    } catch (error) {console.log(error);}
  }

  useEffect(() => {
      if(user && value) {
          console.log(value);
          obtenerHorario();
          console.log(horario);
      }
  },[user,value]);
  
  useEffect(() => {
      console.log("Horario updated:", horario);
  }, [horario]);
  


  useFocusEffect(
      React.useCallback(() => {
        console.log(value);
        console.log(week);
      }, [])  
  );
  
  function calcularHoraFinal(horaInicial, duracion) {
    const [horas, minutos] = horaInicial.split(':').map(Number);
    const duracionSegundos = Math.floor(duracion) * 60 + (duracion % 1) * 100;
    const totalSegundosInicial = horas * 3600 + minutos * 60;
    const totalSegundosFinal = totalSegundosInicial + duracionSegundos;
    const horasFinales = Math.floor(totalSegundosFinal / 3600) % 24; // Aseguramos que no pase de 24
    const minutosFinales = Math.floor((totalSegundosFinal % 3600) / 60);
    const segundosFinales = totalSegundosFinal % 60;
    return `${horasFinales.toString().padStart(2, '0')}:${minutosFinales
        .toString()
        .padStart(2, '0')}:${segundosFinales.toString().padStart(2, '0')}`;
  }

  const selectedDateEvents = horario.map(event => ({
      time: event.hora.S,
      duracion: calcularHoraFinal(event.hora.S,event.duracion.S),
      inicio: event.inicio?.S,
      llegada: event.llegada?.S
  }));

  function ordenarPorHora(array) {
    // Ordenar el array usando la propiedad "hora.S"
    return array.sort((a, b) => {
        const horaA = a.hora.S; // Hora del objeto A
        const horaB = b.hora.S; // Hora del objeto B

        // Comparar las horas como cadenas en formato HH:mm
        return horaA.localeCompare(horaB);
    });
  }


  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

//   const selectedDateEvents = mockData[moment(value).format('YYYY-MM-DD')] || [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Tu Horario</Text>
        </View>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={(ind) => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}
          >

{/* moment(item.date).format('YYYY-MM-DD') */}
            {weeks.map((dates, index) => (
              <View style={styles.itemRow} key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => {setValue(item.date);console.log(item.date);}}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>{value.toDateString()}</Text>
          <View style={styles.placeholder}>
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <Text style={styles.eventTime}>{event.time} - {event.duracion}</Text>
                  <Text style={styles.eventDescription}>{event.inicio} - {event.llegada}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noEventsText}>No events for this day.</Text>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Reservations')
            }}
          >
            <View style={styles.btn}>
              <Text style={styles.btnText}>Reservas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  eventItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  eventTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
  },
  noEventsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
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
});
