
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from "./services/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(

        <ErrorBoundary>
            <App />
        </ErrorBoundary>

);