const RegisterVehiculo = require("");
const GetVehiculo = require("");
const util = require("");

const healthPath = "/health";
const register_vehiculoPath = "/register-vehiculo";
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
		case event.httpMethod === 'GET' && event.path === get_vehiculoPath:
			const get_vehiculoBody = JSON.parse(event.body);
			response = GetVehiculo.get_vehiculo(get_vehiculoBody); break;
		default:
			response = util.buildResponse(404,"404 NOT FOUND"); break;
	}
	return response;
}
