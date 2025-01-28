import apiClient from "./apiClient";
import { API_ENDPOINTS } from "../config/apiEndpoints";

export const login = async (email, password) => {
    try {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        };

        const data = await apiClient(API_ENDPOINTS.LOGIN, options);
        return data; // Retornamos los tokens
    } catch (error) {
        throw new Error(error.message || "Error en la autenticación");
    }
};