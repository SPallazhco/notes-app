import React from "react";
import PropTypes from "prop-types";

const Input = ({ id, value, onChange, placeholder, type = "text" }) => {
    return (
        <input
            id={id}
            value={value}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
};

export default Input;