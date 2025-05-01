import React, { useState } from "react";
import styled from "styled-components";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

const FooterContainer = styled.footer`
  padding: 10px;
  background-color: #333;
  color: white;
  text-align: center;
  font-size: 14px;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  color: #40a9ff;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    color: #1890ff;
  }
`;

const Footer = () => {
    const [showPrivacy, setShowPrivacy] = useState(false);

    return (
        <FooterContainer>
            <p>Hecho por Sergio | 2025</p>
            <LinkButton onClick={() => setShowPrivacy(true)}>
                Políticas de privacidad
            </LinkButton>
            {showPrivacy && <PrivacyPolicyModal onClose={() => setShowPrivacy(false)} />}
        </FooterContainer>
    );
};

export default Footer;