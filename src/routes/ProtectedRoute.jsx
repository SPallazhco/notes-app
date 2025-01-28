import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Función auxiliar para verificar el token
const isAuthenticated = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        return false; // No token found, user is not authenticated
    }
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return !!payload; // Check if payload exists
    } catch (error) {
        console.error("Invalid token format:", error);
        return false; // Token is invalid
    }
};

const ProtectedRoute = ({ children }) => {
    // Si el usuario no está autenticado, redirigir al login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, renderizar el componente hijo
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;