import React from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    // The semi-transparent backdrop
    <div 
      onClick={onClose}
      // --- THIS IS THE UPDATED LINE ---
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
      // We changed 'bg-black bg-opacity-50' to 'bg-black/50'
      // and added 'backdrop-blur-sm' for the out-of-focus effect
    >
      {/* The modal content box */}
      <div
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-3xl rounded-lg bg-white p-8 shadow-xl"
        style={{ maxHeight: '90vh', overflowY: 'auto' }} 
      >
        {/* The Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        >
          <IoClose size={24} />
        </button>
        
        {children}
      </div>
    </div>
  );
};

export default Modal;