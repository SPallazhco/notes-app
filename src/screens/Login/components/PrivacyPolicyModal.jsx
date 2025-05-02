import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f7fb;
  padding: 20px;
`;

const Container = styled.div`
  padding: 40px 30px;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c3e50;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 24px;
  text-align: center;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 16px;
`;

const SectionTitle = styled.span`
  display: block;
  font-weight: bold;
  color: #007BFF;
  margin-top: 20px;
`;

const ContactLink = styled.a`
  color: #007BFF;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 30px;
  font-style: italic;
  font-size: 13px;
  color: #666;
`;

const PrivacyPolicy = () => (
    <Wrapper>
        <Container>
            <Title>Políticas de Privacidad</Title>
            <Paragraph>
                Gracias por confiar en nuestra aplicación <strong>Notes App</strong>. Nos comprometemos a proteger tu información personal y brindarte una experiencia segura.
            </Paragraph>

            <SectionTitle>📥 Información que recopilamos:</SectionTitle>
            <Paragraph>
                Correo electrónico y las notas que creas en la aplicación (título, descripción, fecha de creación).
            </Paragraph>

            <SectionTitle>🔐 Uso de la información:</SectionTitle>
            <Paragraph>
                Solo usamos tu información para autenticarte y gestionar tus notas. <strong>No compartimos tus datos con terceros.</strong>
            </Paragraph>

            <SectionTitle>🛡️ Seguridad:</SectionTitle>
            <Paragraph>
                Utilizamos conexiones seguras (HTTPS) y autenticación con tokens. Al cerrar sesión, eliminamos los datos almacenados localmente.
            </Paragraph>

            <SectionTitle>👶 Público objetivo:</SectionTitle>
            <Paragraph>
                Esta aplicación no está dirigida a menores de 13 años.
            </Paragraph>

            <SectionTitle>📫 Contacto:</SectionTitle>
            <Paragraph>
                Si tienes preguntas sobre esta política, escríbenos a{" "}
                <ContactLink href="mailto:sergiopall199@gmail.com">
                    sergiopall199@gmail.com
                </ContactLink>.
            </Paragraph>

            <FooterText>Última actualización: Mayo 2025</FooterText>
        </Container>
    </Wrapper>
);

export default PrivacyPolicy;