"use client";
import React, { useEffect } from "react";
import "./toast.css";
interface ToastProps {
  message: string;
  type: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const toastClass = `toast ${type}`;
  const toastIcon = () => {
    if (type === "success") {
      return <i className="fas fa-check-circle mr-2 text-green-500"></i>;
    }
    if (type === "error") {
      return <i className="fas fa-info-circle mr-2 text-red-400"></i>;
    }
    // if (type === "info") {
    //   return <i className="fas fa-info-circle mr-2 text-orange-500"></i>;
    // }
  };

  return (
    <div className="toast-container">
      <div className={toastClass}>
        {toastIcon()}
        <div className="text-grey-800">{message}</div>
      </div>
    </div>
  );
};

export default Toast;
