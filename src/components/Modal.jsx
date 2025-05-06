import React from "react";
import "../stylesheets/Modal.css";

const Modal = ({ show, handleClose, children }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={handleClose}>
          ×
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
