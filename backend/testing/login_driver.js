const axios = require("axios");

const url_register  = "https://z9i523elr0.execute-api.us-east-1.amazonaws.com/dev/login";

const headers = {
	'Content-Type':'application/json'
};

async function test(){
	const info = {
		correo:"joel@jimenez.com",
		password:"joel123",
	};
	const json_data = {
		httpMethod:"POST",
		path:"/login-driver",
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
