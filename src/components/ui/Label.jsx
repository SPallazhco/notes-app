import PropTypes from "prop-types";

const Label = ({ htmlFor, children }) => {
    return (
        <label
            htmlFor={htmlFor}
            className="block text-sm font-medium text-gray-700 mb-1"
        >
            {children}
        </label>
    );
};

Label.propTypes = {
    htmlFor: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Label;