import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 10px;
  background-color: #333;
  color: white;
  text-align: center;
  font-size: 14px;
`;

const StyledLink = styled.a`
  display: inline-block;
  color: #40a9ff;
  text-decoration: underline;
  margin-top: 5px;

  &:hover {
    color: #1890ff;
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>Hecho por Sergio | 2025</p>
            <StyledLink
                href="#/privacy"
                target="_blank"
                rel="noopener noreferrer"
            >
                Políticas de privacidad
            </StyledLink>
        </FooterContainer>
    );
};

export default Footer;