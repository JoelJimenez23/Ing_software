import axios from "axios";

export const obtenerPrecioViaje = async (inicio, llegada) => {
  const baseURL = 'https://proyecto-is-google-api.vercel.app/google-maps/directions';

  try {
    const response = await axios.get(baseURL, {
      params: {
        origin: inicio,
        destination: llegada,
      },
    });

    // Extraer distancia y duración
    const distancia = response.data.routes[0]?.legs[0]?.distance?.value || 0; // En metros
    const duracion = response.data.routes[0]?.legs[0]?.duration?.value || 0; // En segundos

    // Variables para el cálculo del precio
    const tipoTransporte = 10; // Base según tipo de transporte
    const tipoCarga = 20; // Base según tipo de carga

    // Cálculo del precio
    const precioCalculado = (distancia / 1000 * 2) + tipoTransporte + tipoCarga; // Precio en moneda local
    const duracionEnMinutos = duracion / 60; // Duración en minutos

    // Retornar datos calculados
    return {
      precio: precioCalculado.toFixed(1), // Precio con 1 decimal
      duracion: duracionEnMinutos.toFixed(1), // Duración con 1 decimal
    };
  } catch (error) {
    console.error("Error obteniendo direcciones:", error.message);
    return { precio: 0, duracion: 0 }; // Retornar valores por defecto en caso de error
  }
};

