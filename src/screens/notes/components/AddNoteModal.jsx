import { useState } from "react";
import PropTypes from "prop-types";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "@/components/ui/Modal.jsx";
import Label from "@/components/ui/Label.jsx";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/button.jsx";
import {API_ENDPOINTS} from "@/config/apiEndpoints.js";

const AddNoteModal = ({ isOpen, onClose, onNoteAdded }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title || !description) {
            alert("Both fields are required");
            return;
        }

        const refreshToken = localStorage.getItem("refreshToken"); // Obtener el accessToken

        if (!refreshToken) {
            alert("Access token is missing. Please log in again.");
            return;
        }

        setLoading(true);
        try {
            const params = new URLSearchParams({
                title,
                description,
            });

            const response = await fetch(`${API_ENDPOINTS.NOTES}?${params.toString()}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${refreshToken}`, // Usa el accessToken para la autorización
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json(); // Leer y parsear la respuesta
            onNoteAdded(responseData); // Informar al componente padre que se ha agregado una nota
            setTitle("");
            setDescription("");
            onClose(); // Cerrar el modal

        } catch (error) {
            console.error("Error adding note:", error);
            alert("There was an error adding the note. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Add Note</ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title"
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter note description"
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Adding..." : "Add Note"}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

AddNoteModal.propTypes = {
    isOpen: PropTypes.bool.isRequired, // Debe ser un booleano y es obligatorio
    onClose: PropTypes.func.isRequired, // Debe ser una función y es obligatorio
    onNoteAdded: PropTypes.func.isRequired, // Debe ser una función y es obligatorio
};

export default AddNoteModal;