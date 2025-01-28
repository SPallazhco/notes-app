const apiClient = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error en la solicitud.");
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error; // Propaga el error para que el componente lo maneje
    }
};

export default apiClient;