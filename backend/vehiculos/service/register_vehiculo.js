const util = require("../utils/util");
const auth = require("../utils/auth");
const { DynamoDBClient, GetItemCommand ,UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({region:'us-east-1'});

async register_vehiculo(requestBody) {
	if(!requestBody.placa||!requestBody.correo_conductor || !requestBody.nombre_conductor || !requestBody.tipo_carga || !requestBody.tipo_transporte || !requestBody.dimensiones){
		return util.buildResponse(401, {response:"Faltan datos"});
	}
	const placa = requestBody.placa;
	const correo_conductor = requestBody.correo_conductor;
	const nombre_conductor = requestBody.nombre_conductor;
	const tipo_carga = requestBody.tipo_carga;
	const tipo_transporte = requestBody.tipo_transporte;
	const dimensiones = requestBody.dimensiones;
	const token = requestBody.token;

	const verifyToken = auth.verifyToken(correo_conductor,token);
	if(!verifyToken.verified){
		return util.buildResponse(401,{response: "token no coincide"});
	}

	const getVehiculoResponse = await getVehiculo(placa);
	if(getVehiculoResponse.Item){return util.buildResponse(401),{message:"placa ya registrada registrado"}};
	
	vehiculo_info = {
		placa: placa,
		correo_conductor: correo_conductor,
		nombre_conductor: nombre_conductor,
		tipo_carga: tipo_carga,
		tipo_transporte: tipo_transporte,
		dimensiones: dimensiones
	}

	const putVehiculoResponse = await putVehiculo(vehiculo_info);
	if(putVehiculoResponse.$metadata.httpStatusCode !== 200){
		return util.buildResponse(503,{message:'Error del servidor. Porfavor intente luego'});
	}
	return util.buildResponse(200,{evento:evento});

}


async function getVehiculo(placa){
	const input = {
		TableName: "flete_vehiculos",
		Key:{"placa":{"S":placa}}
	};
	const command = new GetItemCommand(input);
	const response = await client.send(command);
	return response;
}

async function putVehiculo(vehiculo_info){
	const input = {
		TableName: "flete_vehiculos",
		Item: {
			"placa":{"S":vehiculo_info.placa},
			"correo_conductor":{"S":vehiculo_info.correo_conductor},
			"nombre_conductor":{"S":vehiculo_info.nombre_conductor},
			"tipo_carga":{"S":vehiculo_info.tipo_carga},
			"tipo_transporte":{"S":vehiculo_info.tipo_transporte},
			"dimensiones":{
				"M":{
					"largo":{"S":vehiculo_info.dimensiones.largo},
					"ancho":{"S":vehiculo_info.dimensiones.ancho},
					"altura":{"S":vehiculo_info.dimensiones.altura}
				}
			},
			"calficaciones":{"SS":[""]},
			"calificacion_promedio":{"S":""}
			"metodo_de_pago":{
				"M":{
					"yape":{"false"},
					"plin":{"false"},
					"efectivo":{"false"}
				}
			},
			"reservas":{"SS":[""]},
			"viajes":{"SS":[""]}
		}
	}
	const command = new UpdateItemCommand(input);
	const response = await client.send();
	return response;
}


module.exports.register_vehiculo = register_vehiculo;
