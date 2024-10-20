const jwt = require("jsonwebtoken");

function generateToken(user_info){
	if(!user_info){return null;}
	return jwt.sign(user_info,process.env.JWT_SECRET,{expiresIn:'3h'});
}

function verifyToken(userID,token){
	return jwt.verify(token,process.env,JWT_SECRET,(error,response)=>{
		if(error) {return {verified:false,message:"invalid token"}}
		else if(response.id != userID){return {verified:false,message:"invalid user"}}
		return {verify:true,message:'verified',response:response}
	})
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;
