import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 10px;
  background-color: #333;
  color: white;
  text-align: center;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>Hecho por Sergio | 2025</p>
        </FooterContainer>
    );
};

export default Footer;