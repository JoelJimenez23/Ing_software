const util = require("./utils/util");
const ViajeService = require("./service/viaje");
const GetViajeService = require("./service/get_viaje");
const GetMisViajesService = require("./service/get_mis_viajes");
const ModViajesEstadoService = require("./service/mod_estado_viaje");
const healthPath = "/health";
const viajePath = "/viaje";
const get_viajePath = "/get-viajes";
const get_mis_viajesPath = "/get-mis-viajes";
const mod_estado_viajePath = "/mod-viaje";

exports.handler = async(event) => {
	console.log("Request Service: ",event);
	let response;
	switch (true) {
		case event.httpMethod === "GET" && event.path === healthPath:
			response = util.buildResponse(200,event.body);
			console.log(response);break;
		case event.httpMethod === "POST" && event.path === viajePath:
			const viajeBody = JSON.parse(event.body);
			response = ViajeService.reserva(viajeBody);break;
		case event.httpMethod === "GET" && event.path === get_viajePath:
			const get_viajeBody = JSON.parse(event.body);
			response = GetViajeService.get_reserva(get_viajeBody);break;
		case event.httpMethod === "GET" && event.path === get_mis_viajesPath:
			const get_mis_viajesBody = JSON.parse(event.body);
			response = GetMisViajesService.get_mis_reservas(get_mis_viajesBody);break;
		case event.httpMethod === "POST" && event.path === mod_estado_viajePath:
			const mod_estado_viajeBody = JSON.parse(event.body);
			response = ModViajesEstadoService.mod_estado_viaje(mod_estado_viajeBody);break;
		default:
			response = util.buildResponse(404,"404 NOT FOUD");break;
	}
	return response;
}
