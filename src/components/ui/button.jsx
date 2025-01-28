import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ children, onClick, variant = "default", disabled = false }) => {
    const buttonClass = classNames(
        "px-4 py-2 rounded-lg text-sm font-medium transition",
        {
            "bg-blue-600 text-white hover:bg-blue-700": variant === "default",
            "bg-gray-100 text-gray-700 hover:bg-gray-200": variant === "outline",
            "opacity-50 cursor-not-allowed": disabled,
        }
    );

    return (
        <button className={buttonClass} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(["default", "outline"]),
    disabled: PropTypes.bool,
};

export default Button;