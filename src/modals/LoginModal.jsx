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

const Field = styled.label`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 16px;
    color: #4b5563;
    font-size: 14px;
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 14px;
    margin-top: 6px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    font-size: 16px;
    color: #111827;
    background-color: #f9fafb;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        outline: none;
        border-color: #7c3aed;
        box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.17);
        background-color: #fff;
    }
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
    const [loading, setLoading] = useState(false)

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true)
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

        } catch (error) {
            console.log("ERROR LOGIN: " + error);
            setError("Error al iniciar sesión: Credenciales inválidas o problema con el servidor.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <Overlay>
            <ModalContainer>
                <Title>Iniciar sesión</Title>
                <form onSubmit={handleSubmit}>
                    <Field>
                        Correo electrónico
                        <Input
                            type="email"
                            name="email"
                            placeholder="escribe@correo.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            autoComplete="email"
                        />
                    </Field>
                    <Field>
                        Contraseña
                        <Input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            autoComplete="current-password"
                        />
                    </Field>
                    {error && <ErrorText>{error}</ErrorText>}
                    <Button type="submit" disabled={loading}>
                        {loading ? "Iniciando..." : "Iniciar sesión"}
                    </Button>
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
