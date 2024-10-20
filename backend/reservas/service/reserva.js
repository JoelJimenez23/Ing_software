const util = require("../utils/util");
const auth = require("../utils/auth");
const uuid = require("uuid");
const { DynamoDBClient,UpdateItemCommand } = require("@aws-sdk/client-dynamodb");


async reserva(requestBody) {
	if(!requestBody.correo_user || !requestBody.token || !requestBody.correo_driver || !requestBody.inicio || !requestBody.llegada || !requestBody.metodo_de_pago || !requestBody.tipo_carga || !requestBody.dimensiones || !requestBody.fecha || !requestBody.hora || !requestBody.precio || !requestBody.comentarios){
		return util.buildResponse(401,{response:"Faltan datos"});
	}
		
	const verifyToken = auth.verifyToken(correo_user,token);
	if(!verifyToken.verified){return util.buildResponse(401,{response:"token no coincide"});}

	const correo_driver = requestBody.driver;
	const inicio = requestBody.inicio;
	const llegada = requestBody.llegada;
	const metodo_de_pago = requestBody.metodo_de_pago;
	const tipo_carga = requestBody.tipo_carga;
	const dimensiones = requestBody.dimensiones;
	const fecha = requestBody.fecha;
	const hora = requestBody.hora;
	const precio = requestBody.precio;
	const comentarios = requestBody.comentarios;
	
	reserva_info = {
		id: uuid.uuid4(),
		correo_user: correo_user,
		correo_driver : correo_driver,
		inicio : inicio,
		llegada : llegada,
		metodo_de_pago : metodo_de_pago,
		tipo_carga : tipo_carga,
		dimensiones : dimensiones,
		fecha : fecha,
		hora : hora,
		precio : precio,
		comentarios : comentarios
	}

	const putReservaResponse = await putReserva(reserva_info);
	
	return putReservaResponse;
}

async function putReserva(reserva_info){
	const input = {
		TableName: "flete_reservas",
		Item: {
			"id":{"S":reserva_info.id},
			"correo_user":{"S":reserva_info.correo_user},
			"correo_driver":{"S":reserva_info.correo_driver},
			"incio":{"S":reserva_info.inicio},
			"llegada":{"S":reserva_info.llegada},
			"metodo_de_pago":{"S":reserva_info.metodo_de_pago},
			"tipo_carga":{"S":reserva_info.tipo_carga},
			"dimensiones":{
				"M":{
					"largo":{"S":reserva_info.dimensiones.largo},
					"ancho":{"S":reserva_info.dimensiones.ancho},
					"altura":{"S":reserva_info.dimensiones.altura}
				}
			},
			"fecha":{"S":reserva_info.fecha},
			"hora":{"S":reserva_info.hora},
			"precio":{"S":reserva_info.precio},
			"comentarios":{"S":reserva_info.comentarios}
			"estado":{"S":"solicitada"}
			"codigo":{"S":"temporal"}
		}
	}
	const command = new UpdateItemCommand(input);
	const response = await client.send();

	if(response.$metadata.httpStatusCode !== 200){
		return util.buildResponse(503,{message:"Error del servidor.Porfavor intente luego.reserva"});
	}
	
	const input1 = {
		TableName: "flete_users",
		Key:{"correo":{"S":reserva_info.correo_user}},
		UpdateExpression:"ADD reservas :val",
		ExpressionAttributeValues:{":val":{"SS":[reserva_info.id]}} 
	};
	const command1 = new UpdateItemCommand(input);
	const response1 = await client.send(command);
	if(response1.$metadata.httpStatusCode !== 200){
		return util.buildResponse(503,{message:"Error del servidor.Porfavor intente luego.reserva id user"});
	}

	const input2 = {
		TableName: "flete_driver",
		Key:{"correo":{"S":reserva_info.correo_driver}},
		UpdateExpression:"ADD reservas :val",
		ExpressionAttributeValues:{":val":{"SS":[reserva_info.id]}} 
	};
	const command2 = new UpdateItemCommand(input);
	const response2 = await client.send(command);
	if(response2.$metadata.httpStatusCode !== 200){
		return util.buildResponse(503,{message:"Error del servidor.Porfavor intente luego.reserva id user"});
	}
	
	return util.buildResponse(200,{message:"Reserva solicitada exitosamente"});
}


module.exports.reserva = reserva;
