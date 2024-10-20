const util = require("../utils/util");
const auth = require("../utils/auth");
const {DynamoDBClient,ScanCommand} = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient({region:'us-east-1'});


async get_vehiculo(requestBody){
	const parametro = requestBody.parametro;
	const valor = requestBody.parametro;
	const vehiculos = await GetVehiculos(parametro,valor);
	return util.buildResponse(200,{response:vehiculos});
}

async function GetVehiculos(parametro,valor){
	param = "#"+parametro;
	prjexpr = param+", #nombre_conductor,#calificacion_promedio";
	const input = {
		TableName: 'flete_vehiculos',
		ExpressionAttributeNames:{
			param:"parametro"
		},
		ProjectExpression: prjexpr
	}
	const command = new ScanCommand(input);
	const response = await client.send(command);
	return response.Items;
}
