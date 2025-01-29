import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import NotesSection from "./components/NotesSection";
import AddNoteModal from "./components/AddNoteModal";
import { fetchNotes, updateNoteStatus } from "@/services/notesService";
import useTokenRefresher from "@/services/TokenRefresher";
import {API_ENDPOINTS} from "@/config/apiEndpoints.js";

const NotesLayout = () => {
    const [newNotes, setNewNotes] = useState([]);
    const [processingNotes, setProcessingNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { startListening, stopListening } = useTokenRefresher(API_ENDPOINTS.REFRESH_TOKEN);

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        fetchNotes(API_ENDPOINTS.NOTES, refreshToken)
            .then(notes => {
                setNewNotes(notes.filter(note => note.status === "NEW"));
                setProcessingNotes(notes.filter(note => note.status === "PROCESSING"));
                setArchivedNotes(notes.filter(note => note.status === "ARCHIVED"));
            })
            .catch(error => console.error(error.message));
    }, []);

    const handleDragEnd = (event, noteId, status) => {
        event.preventDefault();
        const refreshToken = localStorage.getItem("refreshToken");

        const params = new URLSearchParams({
            status,
        });

        fetch(`${API_ENDPOINTS.NOTES}/${noteId}/status?${params.toString()}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            },
            // body: JSON.stringify({ status: status }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update note status");
                }
                return response.json();
            })
            .then((updatedNote) => {
                // Actualizar las columnas en el frontend
                setNewNotes((prev) => prev.filter((note) => note.id !== updatedNote.id));
                setProcessingNotes((prev) => prev.filter((note) => note.id !== updatedNote.id));
                setArchivedNotes((prev) => prev.filter((note) => note.id !== updatedNote.id));

                if (updatedNote.status === "NEW") {
                    setNewNotes((prev) => [...prev, updatedNote]);
                } else if (updatedNote.status === "PROCESSING") {
                    setProcessingNotes((prev) => [...prev, updatedNote]);
                } else if (updatedNote.status === "ARCHIVED") {
                    setArchivedNotes((prev) => [...prev, updatedNote]);
                }
            })
            .catch((error) => console.error("Error updating note status:", error.message));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}
                menuRef={menuRef}
                onEditUser={() => console.log("Edit User")}
                onLogout={() => {
                    localStorage.removeItem("accessToken");
                    navigate("/notes-app/login");
                }}
            />
            <main className="flex flex-row flex-1 p-4 gap-4 bg-gray-100">
                <NotesSection
                    title="New"
                    notes={newNotes}
                    onDragEnd={(e, note) => handleDragEnd(e, note.id, "NEW")}
                    isAddButton
                    onAddNoteClick={() => setIsModalOpen(true)}
                />
                <NotesSection
                    title="Processing"
                    notes={processingNotes}
                    onDragEnd={(e, note) => handleDragEnd(e, note.id, "PROCESSING")}
                />
                <NotesSection
                    title="Archived"
                    notes={archivedNotes}
                    onDragEnd={(e, note) => handleDragEnd(e, note.id, "ARCHIVED")}
                />
            </main>
            <AddNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onNoteAdded={(newNote) => {
                    setNewNotes((prevNotes) => [...prevNotes, newNote]);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
};

export default NotesLayout;