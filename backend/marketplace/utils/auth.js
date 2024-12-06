const jwt = require("jsonwebtoken");

// Función para generar un token JWT basado en la información del usuario
function generateToken(user_info) {
    if (!user_info) { return null; }
    return jwt.sign(user_info, process.env.JWT_SECRET, { expiresIn: '3h' });
}

// Función para verificar un token JWT, asegurando que el correo proporcionado coincida
function verifyToken(userCorreo, token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.correo !== userCorreo) {
            return { verified: false, message: "Usuario no válido" };
        }
        return { verified: true, message: "Verificado", response: decoded };
    } catch (error) {
        console.log(error);
        return { verified: false, message: "Token no válido" };
    }
}

// Middleware de autenticación para verificar el token antes de acceder a recursos restringidos
function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado: Se requiere un token' });
    }

    const userCorreo = req.body.correo; // Se espera el correo en el cuerpo de la solicitud
    const result = verifyToken(userCorreo, token);

    if (!result.verified) {
        return res.status(401).json({ message: result.message });
    }

    req.user = result.response; // Añadir la información decodificada del usuario a la solicitud
    next();
}

module.exports = {
    generateToken,
    verifyToken,
    authenticate,
};
