import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import PropTypes from "prop-types";

const NotesSection = ({ title, notes, onDragEnd, onAddNoteClick, isAddButton }) => {
    const handleDragStart = (event, note) => {
        event.dataTransfer.setData("note", JSON.stringify(note));
    };

    const handleDragOver = (event) => {
        event.preventDefault(); // Permite el dropeo
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const note = JSON.parse(event.dataTransfer.getData("note")); // Recupera la nota arrastrada
        onDragEnd(event, note, title.toUpperCase());
    };

    return (
        <section
            className="flex flex-col flex-1 bg-white shadow rounded-lg overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {/* Título dinámico */}
            <h2 className={`p-2 ${title === "New" ? "bg-green-500" : "bg-blue-500"} text-white text-center font-bold`}>
                {title}
            </h2>

            {/* Contenedor de notas */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-[80vh]">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className="p-4 bg-gray-200 rounded shadow cursor-pointer"
                        draggable
                        onDragStart={(event) => handleDragStart(event, note)} // Evento nativo para arrastrar
                    >
                        <motion.div
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <h3 className="text-lg font-bold text-gray-800">{note.title}</h3>
                            <p className="text-base text-gray-600 mt-1">{note.description}</p>
                            <p className="text-sm text-gray-400">
                                Created At: {new Date(note.createdAt).toLocaleString()}
                            </p>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Botón para agregar notas */}
            {isAddButton && (
                <button onClick={onAddNoteClick} className="p-2 bg-green-500 text-white flex items-center justify-center">
                    <FaPlus className="mr-2" /> Add Note
                </button>
            )}
        </section>
    );
};

NotesSection.propTypes = {
    title: PropTypes.string.isRequired,
    notes: PropTypes.array,
    onDragEnd: PropTypes.func.isRequired,
    onAddNoteClick: PropTypes.func,
    isAddButton: PropTypes.bool
};

export default NotesSection;
