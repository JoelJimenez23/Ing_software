const LoginDriver = require("./service/login_driver");
const LoginUser = require("./service/login_user");
const util = require("./utils/util");

const healthPath = "/health";
const login_userPath = "/login-user";
const login_driverPath = "/login-driver";

exports.handler = async(event) => {
	console.log("Request Event: ",event);
	let response;
	switch (true) {
		case event.httpMethod === "GET" && event.path === healthPath:
			response = util.buildResponse(200,event.body);
			console.log(response);break;
		case event.httpMethod === "POST" && event.path === login_userPath:
			const login_userBody = JSON.parse(event.body);
			response = LoginUser.login_user(login_userBody);
			console.log(response);break;
		case event.httpMethod === "POST" && event.path === login_driverPath:
			const login_driverBody = JSON.parse(event.body);
			response = LoginDriver.login_driver(login_driverBody);
			console.log(response);break;
		default:
			response = util.buildResponse(404,"404 NOT FOUND");break;
	}
	return response;
}
