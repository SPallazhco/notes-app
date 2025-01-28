// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/images/main_body.jpg'; // Ajusta la ruta según la ubicación de tu archivo

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: url(${backgroundImage}) no-repeat center center fixed;
    background-size: cover;
    color: #333;
  }

  h2 {
    color: #fff;
  }

  p {
    color: #ddd;
  }
`;

export default GlobalStyles;