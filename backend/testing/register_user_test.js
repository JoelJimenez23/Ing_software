const axios = require("axios");

const url_register  = "https://z9i523elr0.execute-api.us-east-1.amazonaws.com/dev/register";

const headers = {
	'Content-Type':'application/json'
};

async function test(){
	const info = {
		nombre:"hola",
		apellido:"adios",
		correo:"hola@adios.com",
		password:"hola123",
		telefono:"312654978"
	};
	const json_data = {
		httpMethod:"POST",
		path:"/register-user",
		body: JSON.stringify(info)
	}
	const method = 'POST';
	axios({
		method: method,
		url: url_register,
		headers: headers,
		data: json_data
	}).then(response => {
		//const data = JSON.parse(response.data.body);
		console.log(response);
		return response;
	}).catch(error => {
		console.log("ERROR: ",error);
	});
}

console.log(test());

module.exports.test = test;
