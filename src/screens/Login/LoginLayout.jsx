import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import MainContent from "./components/MainContent.jsx";
import GlobalStyles from '../../styles/GlobalStyles.jsx';

const LoginLayout = () => {
    return (
        <div>
            <GlobalStyles />
            <Header /> {/* Header específico para el login */}
            <MainContent /> {/* Header específico para el login */}
            <Footer /> {/* Footer específico para el login */}
        </div>
    );
};

export default LoginLayout;
