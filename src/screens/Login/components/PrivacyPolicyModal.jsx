import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #1f1f1f;
  color: #f5f5f5;
  width: 90%;
  max-width: 700px;
  max-height: 80vh;
  border-radius: 16px;
  padding: 30px;
  overflow-y: auto;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  font-family: 'Segoe UI', sans-serif;
`;

const CloseButton = styled.button`
  background: #ff4d4f;
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  float: center;

  &:hover {
    background: #e04143;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
  text-align: center;
`;

const Paragraph = styled.p`
  margin-bottom: 15px;
  line-height: 1.6;
  color: #dcdcdc;
`;

const Strong = styled.span`
  color: #ffffff;
  font-weight: bold;
`;

const EmailLink = styled.a`
  color: #40a9ff;
  text-decoration: underline;

  &:hover {
    color: #1890ff;
  }
`;

const PrivacyPolicyModal = ({ onClose }) => {
    return (
        <Overlay>
            <ModalContainer>
                <Title>Políticas de Privacidad</Title>

                <Paragraph>
                    Gracias por confiar en nuestra aplicación <Strong>Notes App</Strong>. Nos comprometemos a proteger la información de nuestros usuarios.
                </Paragraph>

                <Paragraph>
                    <Strong>Información que recopilamos:</Strong> Correo electrónico y notas creadas por ti (título, descripción, fecha de creación).
                </Paragraph>

                <Paragraph>
                    <Strong>Uso de tu información:</Strong> Solo se usa para autenticar tu cuenta y gestionar tus notas. No compartimos tus datos con terceros.
                </Paragraph>

                <Paragraph>
                    <Strong>Seguridad:</Strong> Usamos HTTPS y tokens seguros. Al cerrar sesión eliminamos información sensible localmente.
                </Paragraph>

                <Paragraph>
                    <Strong>Público objetivo:</Strong> Esta app no está dirigida a menores de 13 años.
                </Paragraph>

                <Paragraph>
                    <Strong>Contacto:</Strong> Para preguntas sobre privacidad, escríbenos a{" "}
                    <EmailLink href="mailto:sergiopall1996@gmail.com">
                        sergiopall199@gmail.com
                    </EmailLink>.
                </Paragraph>
                <CloseButton onClick={onClose}>Cerrar</CloseButton>
            </ModalContainer>
        </Overlay>
    );
};

export default PrivacyPolicyModal;