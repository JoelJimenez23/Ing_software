const util = require("../utils/util");
const auth = require("../utils/auth");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: 'us-east-1' });

async function get_mis_reservas(requestBody) {
    
    if(!requestBody.rol || !requestBody.correo || !requestBody.parametro || !requestBody.valor || !requestBody.token){
        return util.buildResponse(401, {response:"Faltan datos"});
    }

    const rol = requestBody.rol;
    const correo = requestBody.correo;
    const parametro = requestBody.parametro;  // Ejemplo: "tipo_carga"
    const valor = requestBody.valor;          // Ejemplo: "mercancía general"
    
    const verifyToken = auth.verifyToken(correo,requestBody.token);
    if(!verifyToken.verified){return util.buildResponse(401,{response:verifyToken.message});}
    reserva_info = {
        rol: rol,
        correo: correo,
        parametro: parametro,
        valor: valor,
    }
    console.log("RESERVA INFO",reserva_info);
    const vehiculos = await GetReservas(reserva_info);
    return util.buildResponse(200, { response: vehiculos });
}

async function GetReservas(reserva_info) {
    let table;
    if(reserva_info.rol === 'user'){
        correo_param = "correo_user";
    }else{
        correo_param = "correo_driver"
    } 
    const input = {
        TableName:'flete_reservas',
        ExpressionAttributeNames: {
            "#P": reserva_info.parametro,                // Proyectamos y filtramos por el parámetro dinámico
            "#C": correo_param
        },
        ExpressionAttributeValues: {
            ":valor": { "S": reserva_info.valor },         // Valor con el que filtramos (por ejemplo, "mercancía general")
            ":correo": { "S": reserva_info.correo}
        },
        FilterExpression: "#P = :valor AND #C = :correo"      // Filtra los ítems donde el valor del parámetro coincida
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    return response.Items; // Retorna los ítems obtenidos
}

module.exports.get_mis_reservas = get_mis_reservas;
