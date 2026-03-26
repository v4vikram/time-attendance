import React from "react";

interface ErrorTextProps {
    message?: string;
    className?: string;
}

const ErrorText: React.FC<ErrorTextProps> = ({
    message,
    className = "",
}) => {
    if (!message) return null;

    return <p className={`text-red-500 text-sm ${className}`}>{message}</p>;
};

export default ErrorText;