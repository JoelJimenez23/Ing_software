const util = require("./utils/util");
const ReservaService = require("./service/reserva");
const GetReservaService = require("./service/get_reserva");
const healthPath = "/health";
const reservaPath = "/reserva";
const get_reservaPath = "/get-reserva";

exports.handler = async(event) => {
	console.log("Request Service: ",event);
	let response;
	switch (true) {
		case event.httpMethod === "GET" && event.path === healthPath:
			response = util.buildResponse(200,event.body);
			console.log(response);break;
		case event.httpMethod === "POST" && event.path === reservaPath:
			const reservaBody = JSON.parse(event.body);
			response = ReservaService.reserva(reservaBody);break;
		case event.httpMethod === "GET" && event.path === get_reservaPath:
			const get_reservaBody = JSON.parse(event.body);
			response = GetReservaService.get_reserva(get_reservaBody);
		default:
			response = util.buildResponse(404,"404 NOT FOUD");break;
	}
	return response;
}
