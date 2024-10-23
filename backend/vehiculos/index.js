const RegisterVehiculo = require("./service/register_vehiculo");
const GetVehiculos = require("./service/get_vehiculos");
const GetVehiculo = require("./service/get_vehiculo");
const util = require("./utils/util");

const healthPath = "/health";
const register_vehiculoPath = "/register-vehiculo";
const get_vehiculosPath = "/get-vehiculos";
const get_vehiculoPath = "/get-vehiculo";

exports.handler = async (event) => {
	console.log("Request Event: ",event);
	let response;
	switch(true){
		case event.httpMethod === 'GET' && event.path === healthPath:
			response = util.buildResponse(200,event.body); break;
		case event.httpMethod === 'POST' && event.path === register_vehiculoPath:
			const register_vehiculoBody = JSON.parse(event.body);
			response = RegisterVehiculo.register_vehiculo(register_vehiculoBody); break;
		case event.httpMethod === 'GET' && event.path === get_vehiculosPath:
			const get_vehiculosBody = JSON.parse(event.body);
			response = GetVehiculos.get_vehiculos(get_vehiculosBody); break;
		case event.httpMethod === 'GET' && event.path === get_vehiculoPath:
			const get_vehiculoBody = JSON.parse(event.body);
			response = GetVehiculo.get_vehiculo(get_vehiculoBody); break;
		default:
			response = util.buildResponse(404,"404 NOT FOUND"); break;
	}
	return response;
}
