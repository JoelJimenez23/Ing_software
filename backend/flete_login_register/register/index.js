const RegisterDriver = require("./service/register_driver");
const RegisterUser = require("./service/register_user");
const util = require("./utils/util");

const healthPath = "/health";
const register_driverPath = "/register-driver";
const register_userPath = "/register-user";

exports.handler = async (event) => {
	console.log("Request Event: ",event);
	let response;
	switch(true){
		case event.httpMethod === 'GET' && event.path === healthPath:
			response = util.buildResponse(200,event.body);
			console.log(response);break;
		case event.httpMethod === 'POST' && event.path === register_userPath:
			const register_userBody = JSON.parse(event.body);
			response = RegisterUser.register_user(register_userBody);
			console.log(response);
			break;
		case event.httpMethod === 'POST' && event.path === register_driverPath:
			const register_driverBody = JSON.parse(event.body);
			response = RegisterDriver.register_driver(register_driverBody);
			console.log(response);
			break;
		default:
			response = util.buildResponse(404,"404 NOT FOUND");
			break;
	}
	return response;
}
