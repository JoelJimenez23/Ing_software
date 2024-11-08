import AsyncStorage from '@react-native-async-storage/async-storage';


async function getUser() {
    try {
        const user = await AsyncStorage.getItem('user');
				console.log("getUser ",user);
        if (user === null || user === 'undefined') {
            return null;
        } else {
            return user;
        }
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return null;
    }
}

async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error al obtener el token:', error);
        return null;
    }
}

async function setUserSession(user, token) {
		
    try {
        await AsyncStorage.setItem('user', user);
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error al establecer la sesión del usuario:', error);
    }
}

async function resetUserSession() {
    try {
        await AsyncStorage.removeItem('correo');
        await AsyncStorage.removeItem('token');
    } catch (error) {
        console.error('Error al restablecer la sesión del usuario:', error);
    }
}
module.exports.getUser = getUser;
module.exports.getToken = getToken;
module.exports.setUserSession = setUserSession;
module.exports.resetUserSession = resetUserSession;
