import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios"; 
import auth from "../utils/Auth";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const logIn = async () => {
    const url_register =
      "https://z9i523elr0.execute-api.us-east-1.amazonaws.com/dev/login";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const data = {
        httpMethod: "POST",
        path: "/login-user",
        body: JSON.stringify({ correo: email, password: password }),
      };

      const response = await axios.post(url_register, data, { headers });
      const datita = JSON.parse(response.data.body);

      if (datita.token) {
				console.log(datita);
				console.log(datita.user);
				console.log(datita.user.correo);
				console.log(datita.user.correo,datita.token);
				auth.setUserSession(datita.user.correo,datita.token);
        props.navigation.navigate("Main");
      } else {
        setErrorMessage("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrorMessage("Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido a <Text style={{ color: "#6B9AC4" }}>Transporta</Text>{" "}
      </Text>
      <Text style={styles.subtitle}>Moviliza carga rápido y seguro</Text>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TextInput
        style={styles.input}
        placeholder="nombre@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="contraseña"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.continueButton} onPress={logIn}>
        <Text style={styles.continueText}>Continuar</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>o</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="google" size={20} color="black" />
        <Text style={styles.socialText}>Ingresa con Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="apple" size={20} color="black" />
        <Text style={styles.socialText}>Ingresa con Apple</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Al hacer clic en continuar, acepta nuestros Términos de servicio y
        Política de privacidad.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "gray",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  continueButton: {
    backgroundColor: "#6B9AC4",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  continueText: {
    color: "white",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "gray",
  },
  socialButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16,
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    color: "gray",
    marginTop: 20,
    marginHorizontal: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
