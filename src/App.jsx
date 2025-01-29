import {BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import LoginLayout from "./screens/Login/LoginLayout.jsx";
import NotesLayout from "./screens/notes/NotesLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import './index.css';


const App = () => {
    return (
        <BrowserRouter basename="/notes-app">
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

                {/* Ruta por defecto en caso de una URL no encontrada */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
