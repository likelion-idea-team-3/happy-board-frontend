import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({
    message,
    isOpen,
    onConfirm,
    onCancel,
    confirmText = "확인",
    cancelText = "취소",
}) => {
    if (!isOpen) return null;
    return (
        <div className="modal1-overlay" onClick={onCancel}>
            <div className="modal1-content" onClick={(e) => e.stopPropagation()}>
                <p>{message}</p>
                <div className="modal1-buttons">
                    <button onClick={onConfirm}>{confirmText}</button>
                    <button onClick={onCancel}>{cancelText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
