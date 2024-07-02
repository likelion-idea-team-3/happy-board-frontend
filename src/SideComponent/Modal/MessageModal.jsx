import React from "react";
import "./MessageModal.css";

const MessageModal = ({ message, onClose, buttonText = "확인" }) => {
    return (
        <div className="modal-content">
            <p>{message}</p>
            <button onClick={onClose}>{buttonText}</button>
        </div>
    );
};

export default MessageModal;
