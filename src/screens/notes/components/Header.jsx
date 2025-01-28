import { FaBars, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from "prop-types";
import { useEffect } from "react";

const Header = ({ toggleMenu, isMenuOpen, menuRef, onEditUser, onLogout }) => {
    // Cerrar el menú si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                toggleMenu(false); // Cierra el menú
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, menuRef, toggleMenu]);

    return (
        <header className="flex justify-between items-center p-4 bg-blue-500 text-white shadow">
            <h1 className="text-lg font-bold">My Notes</h1>
            <div className="relative">
                <FaBars className="text-2xl cursor-pointer" onClick={() => toggleMenu(!isMenuOpen)} />
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            ref={menuRef}
                            className="absolute top-0 right-0 bg-white shadow-lg rounded-lg w-48 p-4 mt-2 z-50"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ul className="space-y-2">
                                {/*<li*/}
                                {/*    className="flex items-center space-x-2 text-gray-800 cursor-pointer hover:text-blue-500"*/}
                                {/*    onClick={onEditUser}*/}
                                {/*>*/}
                                {/*    <FaUserEdit />*/}
                                {/*    <span>Edit User</span>*/}
                                {/*</li>*/}
                                <li
                                    className="flex items-center space-x-2 text-gray-800 cursor-pointer hover:text-blue-500"
                                    onClick={onLogout}
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

Header.propTypes = {
    toggleMenu: PropTypes.func.isRequired,
    isMenuOpen: PropTypes.bool,
    menuRef: PropTypes.object,
    onEditUser: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Header;