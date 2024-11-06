const util = require("../utils/util");
const auth = require("../utils/auth");
const { DynamoDBClient, GetItemCommand} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({region:'us-east-1'});

async function get_viaje(requestBody){
	if(!requestBody.correo || !requestBody.tabla || !requestBody.token){
		return util.buildResponse(401,{message:"Faltan datos"});
	}
	const correo = requestBody.correo;
	const TableName = requestBody.tabla;
	const token  = requestBody.token;

	const verification = auth.verifyToken(correo,token);
	if(!verification.verified){return util.buildResponse(401,{response:"token no coincide"});}

	get_info = {
		correo: correo,
		TableName: TableName
	}

	const getViajeResponse = await getViaje(get_info);
	return getViajeResponse;
}

async function getViaje(get_info){
	const input = {
		TableName:get_info.TableName,
		Key:{
			"correo":{"S":get_info.correo}
		},
		AttributesToGet:["reservas"]
	};
	const command = new GetItemCommand(input);
	const response = await client.send(command);
	return response;
}
module.exports.get_viaje = get_viaje;
