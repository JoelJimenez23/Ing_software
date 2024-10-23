const util = require("../utils/util");
const auth = require("../utils/auth");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: 'us-east-1' });

async function get_vehiculos(requestBody) {
    const parametro = requestBody.parametro;  // Ejemplo: "tipo_carga"
    const valor = requestBody.valor;          // Ejemplo: "mercancía general"
    
    const vehiculos = await GetVehiculos(parametro, valor);
    return util.buildResponse(200, { response: vehiculos });
}

async function GetVehiculos(parametro, valor) {
    const input = {
        TableName: 'flete_vehiculos',
        ExpressionAttributeNames: {
            "#NC": "nombre_conductor",       // Proyectamos el nombre del conductor
            "#CP": "calificacion_promedio",  // Proyectamos la calificación promedio
            "#T" : "telefono",
            "#P": parametro                  // Proyectamos y filtramos por el parámetro dinámico
        },
        ExpressionAttributeValues: {
            ":valor": { "S": valor }         // Valor con el que filtramos (por ejemplo, "mercancía general")
        },
        FilterExpression: "#P = :valor",      // Filtra los ítems donde el valor del parámetro coincida
        ProjectionExpression: "#NC, #CP, #T, #P", // Proyecta solo los atributos que necesitamos
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    return response.Items; // Retorna los ítems obtenidos
}

module.exports.get_vehiculos = get_vehiculos;
