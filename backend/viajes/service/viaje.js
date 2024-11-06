const util = require("../utils/util");
const auth = require("../utils/auth");
const uuid = require("uuid");
const { DynamoDBClient,PutItemCommand,UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({region:'us-east-1'});

async function viaje(requestBody) {
	if(!requestBody.placa || !requestBody.correo_user || !requestBody.token || !requestBody.correo_driver || !requestBody.inicio || !requestBody.llegada || !requestBody.metodo_de_pago || !requestBody.fecha || !requestBody.hora || !requestBody.precio ){
		return util.buildResponse(401,{response:"Faltan datos"});
	}
		
	const correo_user = requestBody.correo_user;
	const verifyToken = auth.verifyToken(correo_user,requestBody.token);
	if(!verifyToken.verified){return util.buildResponse(401,{response:verifyToken.message});}

	const correo_driver = requestBody.correo_driver;
	const inicio = requestBody.inicio;
	const llegada = requestBody.llegada;
	const metodo_de_pago = requestBody.metodo_de_pago;
	const placa = requestBody.placa;
	const fecha = requestBody.fecha;
	const hora = requestBody.hora;
	const precio = requestBody.precio;

	viaje_info = {
		id: uuid.v4(),
		correo_user: correo_user,
		correo_driver : correo_driver,
		inicio : inicio,
		llegada : llegada,
		metodo_de_pago : metodo_de_pago,
		placa: placa,
		fecha : fecha,
		hora : hora,
		precio : precio
	}
	console.log("Viaje info",viaje_info);

	console.log("ANTES DE");
	const putViajeResponse = await putViaje(viaje_info);


	return putViajeResponse;
}

async function putViaje(viaje_info){
	const input = {
		TableName: "flete_viaje",
		Item: {
			"id":{"S":viaje_info.id},
			"correo_user":{"S":viaje_info.correo_user},
			"correo_driver":{"S":viaje_info.correo_driver},
			"inicio":{"S":viaje_info.inicio},
			"llegada":{"S":viaje_info.llegada},
			"metodo_de_pago":{"S":viaje_info.metodo_de_pago},
			"placa": {"S":viaje_info.placa},
			"fecha":{"S":viaje_info.fecha},
			"hora":{"S":viaje_info.hora},
			"precio":{"S":viaje_info.precio},
			"estado":{"S":"solicitada"},
			"codigo":{"S":"temporal"},
		}
	}
	console.log("TEST");
	const command = new PutItemCommand(input);
	const response = await client.send(command);
	console.log("Probando:   ",response);
	if(response.$metadata.httpStatusCode !== 200){
		return util.buildResponse(503,{message:"Error del servidor.Porfavor intente luego.viaje"});
	}
	
	const input1 = {
		TableName: "flete_users",
		Key:{"correo":{"S":viaje_info.correo_user}},
		UpdateExpression:"ADD viajes :val",
		ExpressionAttributeValues:{":val":{"SS":[viaje_info.id]}} 
	};
	const command1 = new UpdateItemCommand(input1);
	const response1 = await client.send(command1);
	if(response1.$metadata.httpStatusCode !== 200){
		return util.buildResponse(503,{message:"Error del servidor.Porfavor intente luego.viaje id user"});
	}

	const input2 = {
		TableName: "flete_drivers",
		Key:{"correo":{"S":viaje_info.correo_driver}},
		UpdateExpression:"ADD viajes :val",
		ExpressionAttributeValues:{":val":{"SS":[viaje_info.id]}} 
	};
	const command2 = new UpdateItemCommand(input2);
	const response2 = await client.send(command2);
	if(response2.$metadata.httpStatusCode !== 200){
		return util.buildResponse(503,{message:"Error del servidor.Porfavor intente luego.viaje id user"});
	}
	return util.buildResponse(200,{message:"Reserva solicitada exitosamente"});
}


module.exports.reserva = reserva;
