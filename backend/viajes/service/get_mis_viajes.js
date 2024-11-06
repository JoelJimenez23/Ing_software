const util = require("../utils/util");
const auth = require("../utils/auth");
const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: 'us-east-1' });

async function get_mis_viajes(requestBody) {
    
    if(!requestBody.rol || !requestBody.correo || !requestBody.parametro || !requestBody.valor || !requestBody.token){
        return util.buildResponse(401, {response:"Faltan datos"});
    }

    const rol = requestBody.rol;
    const correo = requestBody.correo;
    const parametro = requestBody.parametro;  // Ejemplo: "tipo_carga"
    const valor = requestBody.valor;          // Ejemplo: "mercancía general"
    
    const verifyToken = auth.verifyToken(correo,requestBody.token);
    if(!verifyToken.verified){return util.buildResponse(401,{response:verifyToken.message});}
    viaje_info = {
        rol: rol,
        correo: correo,
        parametro: parametro,
        valor: valor,
    }
    console.log("VIAJE INFO",viaje_info);
    const vehiculos = await GetViajes(viaje_info);
    return util.buildResponse(200, { response: vehiculos });
}

async function GetViajes(viaje_info) {
    let table;
    if(viaje_info.rol === 'user'){
        correo_param = "correo_user";
    }else{
        correo_param = "correo_driver"
    } 
    const input = {
        TableName:'flete_viajes',
        ExpressionAttributeNames: {
            "#P": viaje_info.parametro,                // Proyectamos y filtramos por el parámetro dinámico
            "#C": correo_param
        },
        ExpressionAttributeValues: {
            ":valor": { "S": viaje_info.valor },         // Valor con el que filtramos (por ejemplo, "mercancía general")
            ":correo": { "S": viaje_info.correo}
        },
        FilterExpression: "#P = :valor AND #C = :correo"      // Filtra los ítems donde el valor del parámetro coincida
    };

    const command = new ScanCommand(input);
    const response = await client.send(command);
    return response.Items; // Retorna los ítems obtenidos
}

module.exports.get_mis_viajes = get_mis_viajes;
