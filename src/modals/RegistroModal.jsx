import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { API_ENDPOINTS } from "@/config/apiEndpoints.js";
import PropTypes from "prop-types";

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
    background: linear-gradient(145deg, #ffffff, #f1f1f1);
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

const SuccessModal = styled.div`
  background: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-out;
`;

const RegistroModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "USER",
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Por favor, introduce un correo válido.";
        }

        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        fetch(API_ENDPOINTS.REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.message !== "Email already exists") {
                    console.log('data.message: ' + data.message);
                    setIsSubmitting(false);
                    setIsSuccess(true);
                    setTimeout(() => {
                        setIsSuccess(false);
                        onClose();
                    }, 3000);
                } else {
                    alert(data.message);
                    setIsSubmitting(false);
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                alert("Hubo un error al registrar: " + error.message);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Overlay>
            {isSuccess ? (
                <SuccessModal>
                    <h3>¡Felicidades!</h3>
                    <p>Su usuario se ha creado correctamente.</p>
                </SuccessModal>
            ) : (
                <ModalContainer>
                    <Title>Registro</Title>
                    <form onSubmit={handleSubmit}>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                        <Input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar contraseña"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && (
                            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                        )}
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Registrando..." : "Registrar"}
                        </Button>
                    </form>
                    <Button
                        style={{ backgroundColor: "#e53935", marginTop: "10px" }}
                        onClick={onClose}
                    >
                        Cerrar
                    </Button>
                </ModalContainer>
            )}
        </Overlay>
    );
};

RegistroModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RegistroModal;
