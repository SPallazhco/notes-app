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
    color: #dc2626;
    font-size: 14px;
    margin-top: -6px;
    margin-bottom: 8px;
    text-align: left;
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
                        <Field>
                            Correo electrónico
                            <Input
                                type="email"
                                name="email"
                                placeholder="escribe@correo.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="email"
                                required
                            />
                        </Field>
                        {errors.email && <ErrorText>{errors.email}</ErrorText>}
                        <Field>
                            Contraseña
                            <Input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="new-password"
                                required
                            />
                        </Field>
                        {errors.password && <ErrorText>{errors.password}</ErrorText>}
                        <Field>
                            Confirmar contraseña
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Repite tu contraseña"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                autoComplete="new-password"
                                required
                            />
                        </Field>
                        {errors.confirmPassword && (
                            <ErrorText>{errors.confirmPassword}</ErrorText>
                        )}
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Registrando..." : "Registrar"}
                        </Button>
                    </form>
                    <CloseButton onClick={onClose}>Cerrar</CloseButton>
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
