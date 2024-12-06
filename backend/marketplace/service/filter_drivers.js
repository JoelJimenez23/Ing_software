const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: 'us-east-1' });

async function filterDrivers(filters) {
    try {
        const params = {
            TableName: "flete_drivers",
        };
        
        // Obtenemos todos los conductores y luego aplicamos los filtros
        const command = new ScanCommand(params);
        const data = await client.send(command);
        
        let drivers = data.Items;

        // Filtrar por calificación del conductor
        if (filters.driverRating) {
            drivers = drivers.filter(driver => {
                const rating = parseInt(driver.calificacion?.N || 0, 10);
                return rating === filters.driverRating;
            });
        }

        // Filtrar por tipo de carga
        if (filters.selectedCargoTypes && filters.selectedCargoTypes.length > 0) {
            drivers = drivers.filter(driver => {
                const supportedCargos = driver.cargas?.SS || [];
                return filters.selectedCargoTypes.some(cargo => supportedCargos.includes(cargo));
            });
        }

        // Filtrar por tipo de transporte
        if (filters.selectedTransportTypes && filters.selectedTransportTypes.length > 0) {
            drivers = drivers.filter(driver => {
                const supportedTransports = driver.vehiculos?.SS || [];
                return filters.selectedTransportTypes.some(transport => supportedTransports.includes(transport));
            });
        }

        // Filtrar por dimensiones del vehículo
        if (filters.vehicleDimension) {
            drivers = drivers.filter(driver => {
                const vehicleDimensions = parseInt(driver.dimension_vehiculo?.N || 0, 10);
                if (filters.vehicleDimensionComparison === 'greater') {
                    return vehicleDimensions > filters.vehicleDimension;
                } else if (filters.vehicleDimensionComparison === 'equal') {
                    return vehicleDimensions === filters.vehicleDimension;
                } else if (filters.vehicleDimensionComparison === 'less') {
                    return vehicleDimensions < filters.vehicleDimension;
                }
                return true;
            });
        }

        // Formatear el resultado para devolver solo la información esencial
        return drivers.map(driver => ({
            nombre: driver.nombre?.S,
            apellido: driver.apellido?.S,
            correo: driver.correo?.S,
            calificacion: driver.calificacion?.N,
            vehiculos: driver.vehiculos?.SS,
            cargas: driver.cargas?.SS,
        }));
    } catch (error) {
        console.error("Error al filtrar conductores: ", error);
        throw new Error("Error al filtrar conductores");
    }
}

module.exports.filterDrivers = filterDrivers;
