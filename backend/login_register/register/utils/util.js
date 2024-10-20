function buildResponse(statusCode, body){
	return {
		StatusCode: statusCode,
		header: {
			'Access-Control-Allow-Origin':'*',
			'Content-Type': 'application-json'
		},
		body: JSON.stringify(body)
	}
}
module.exports.buildResponse = buildResponse;
