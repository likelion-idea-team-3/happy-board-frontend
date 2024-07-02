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
        <div className="modal-content">
            <div className="modal-header">
                <button className="close-button" onClick={onCancel}>
                    ×
                </button>
            </div>
            <p>{message}</p>
            <div className="modal-buttons">
                <button onClick={onConfirm}>{confirmText}</button>
                <button onClick={onCancel}>{cancelText}</button>
            </div>
        </div>
    );
};

export default ConfirmModal;
