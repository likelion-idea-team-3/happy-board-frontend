import React from "react";
import "./MessageModal.css";

const MessageModal = ({ message, isOpen, onClose, buttonText = "확인" }) => {
    if (!isOpen) return null;

    return (
        <div className="modal2-overlay" onClick={onClose}>
            <div className="modal2-content">
                <p>{message}</p>
                <button>{buttonText}</button>
            </div>
        </div>
    );
};

export default MessageModal;
