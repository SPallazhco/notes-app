import PropTypes from "prop-types";

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 z-10">
                {children}
            </div>
        </div>
    );
};

export const ModalHeader = ({ children }) => (
    <div className="border-b pb-2 mb-4 text-lg font-semibold">{children}</div>
);

export const ModalBody = ({ children }) => <div className="mb-4">{children}</div>;

export const ModalFooter = ({ children }) => (
    <div className="flex justify-end space-x-2">{children}</div>
);

// PropTypes
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

ModalHeader.propTypes = ModalBody.propTypes = ModalFooter.propTypes = {
    children: PropTypes.node.isRequired,
};