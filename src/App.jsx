import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginLayout from "./screens/Login/LoginLayout.jsx";
import NotesLayout from "./screens/notes/NotesLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import './index.css';


const App = () => {
    return (
        <Router>
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
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
