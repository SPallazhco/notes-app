import styled from 'styled-components';
import notasBodyImage from '../../../assets/images/notas_body.jpg'; // Asegúrate de que la ruta sea correcta

// Estilos
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Asegura que ocupe todo el alto de la pantalla */
`;

const MainContainer = styled.main`
    flex: 1; /* Hace que el contenido principal ocupe el espacio restante */
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    padding: 20px;
    gap: 20px; /* Espacio entre la imagen y el texto */

    @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;
        gap: 10px;
    }
`;

const Description = styled.div`
    flex: 1;
    font-size: 18px;
    padding: 20px;

    h2 {
        margin-bottom: 15px;
        font-size: 24px;
    }

    p {
        line-height: 1.6;
    }
`;

const Image = styled.img`
    width: 250px; /* Tamaño reducido */
    height: 250px; /* Tamaño reducido */
    border-radius: 50%; /* Hace la imagen circular */
    object-fit: cover; /* Asegura que la imagen mantenga su proporción dentro del círculo */
    border: 3px solid #ccc; /* Opcional: Agrega un borde para destacar la imagen */
`;

const Footer = styled.footer`
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
`;

const MainContent = () => {
    return (
        <PageContainer>
            <MainContainer>
                {/* Reemplaza la URL por la imagen importada */}
                <Image src={notasBodyImage} alt="Imagen de la app" />
                <Description>
                    <h2>Bienvenido a la app de notas</h2>
                    <p>Esta es una aplicación donde podrás guardar y organizar tus notas de forma sencilla y eficiente.</p>
                </Description>
            </MainContainer>
            <Footer>
                &copy; 2025 Sergio. Todos los derechos reservados.
            </Footer>
        </PageContainer>
    );
};

export default MainContent;