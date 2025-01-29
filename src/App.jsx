import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginLayout from "./screens/Login/LoginLayout.jsx";
import NotesLayout from "./screens/notes/NotesLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import './index.css';

const App = () => {
    return (
        // Usa solo HashRouter, no BrowserRouter
        <HashRouter basename="/notes-app">
            <Routes>
                {/* Ruta para el login */}
                <Route path="/login" element={<LoginLayout />} />

                {/* Rutas protegidas */}
                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <NotesLayout />
                        </ProtectedRoute>
                    }
                />

                {/* Ruta por defecto para redirigir al login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
