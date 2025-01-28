import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

import { API_ENDPOINTS } from "../config/apiEndpoints.js";
import apiClient from "@/services/apiClient.js";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
`;

const ModalContainer = styled.div`
    background: linear-gradient(145deg, #ffffff, #f3f3f3);
    border-radius: 15px;
    padding: 30px;
    width: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    animation: ${fadeIn} 0.3s ease-out;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
`;

const Input = styled.input`
    width: 94%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    background: linear-gradient(145deg, #6200ea, #3700b3);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.2s, background 0.3s;

    &:hover {
        transform: scale(1.05);
        background: linear-gradient(145deg, #3700b3, #6200ea);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const CloseButton = styled(Button)`
    background: #e53935;
    margin-top: 10px;

    &:hover {
        background: #b71c1c;
    }
`;

const ErrorText = styled.p`
    color: red;
    margin-top: 10px;
`;

const LoginModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            // Llamada al backend
            const response = await apiClient(API_ENDPOINTS.LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log("RESPONSE LOGIN: " + response.refreshToken);
            if(response.accessToken && response.refreshToken) {
            // Guardar tokens en el almacenamiento local
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("refreshToken", response.refreshToken);

            console.log("Inicio de sesión exitoso", response);

            // Redirigir a la página de notas
            navigate("/notes");
            } else {
                setError("Error al iniciar sesión: Credenciales inválidas o problema con el servidor.");
            }
            // Cierra el modal
        } catch (error) {
            console.log("ERROR LOGIN: " + error);
            setError("Error al iniciar sesión: Credenciales inválidas o problema con el servidor.");
        }
    };

    return (
        <Overlay>
            <ModalContainer>
                <Title>Iniciar sesión</Title>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {error && <ErrorText>{error}</ErrorText>}
                    <Button type="submit">Iniciar sesión</Button>
                </form>
                <CloseButton onClick={onClose}>Cerrar</CloseButton>
            </ModalContainer>
        </Overlay>
    );
};

LoginModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoginModal;
