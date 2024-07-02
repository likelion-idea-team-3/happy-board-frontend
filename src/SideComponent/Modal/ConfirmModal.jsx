import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({
    message,
    onConfirm,
    onCancel,
    confirmText = "확인",
    cancelText = "취소",
}) => {
    return (
        <div className="modal1-content">
            <div className="modal1-header">
                <button className="new-close-button" onClick={onCancel}>
                    ×
                </button>
            </div>
            <p>{message}</p>
            <div className="modal1-buttons">
                <button onClick={onConfirm}>{confirmText}</button>
                <button onClick={onCancel}>{cancelText}</button>
            </div>
        </div>
    );
};

export default ConfirmModal;
