const util = require("../utils/util");
const auth = require("../utils/auth");
const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({ region: 'us-east-1' });

async function mod_estado_viaje(requestBody) {
    
    if(!requestBody.viaje_id || !requestBody.correo || !requestBody.nuevo_estado || !requestBody.token){
        return util.buildResponse(401, {response:"Faltan datos"});
    }

    const correo = requestBody.correo;
    const viaje_id = requestBody.viaje_id;
    const nuevo_estado = requestBody.nuevo_estado;
    const verifyToken = auth.verifyToken(correo,requestBody.token);
	if(!verifyToken.verified){return util.buildResponse(401,{response:verifyToken.message});}

    viaje_info = {
        correo: correo,
        viaje_id: viaje_id,
        nuevo_estado: nuevo_estado
    }
    console.log("VIAJE INFO",viaje_info);
    const mod_response = await mod(viaje_info);
    return util.buildResponse(200, { response: mod_response });
}

async function mod(viaje_info) {

    const input = {
        TableName:'flete_viajes',
        Key:{"id":{"S":viaje_info.viaje_id}},
        UpdateExpression: "SET #estado = :nuevo_estado",
        ExpressionAttributeNames: {
            "#estado": "estado"  
        },
        ExpressionAttributeValues: {
            ":nuevo_estado": { "S": viaje_info.nuevo_estado }  
        },
        ReturnValues: "ALL_NEW"
    };

    const command = new UpdateItemCommand(input);
    const response = await client.send(command);
    return response; // Retorna los ítems obtenidos
}

module.exports.mod_estado_viaje = mod_estado_viaje;
