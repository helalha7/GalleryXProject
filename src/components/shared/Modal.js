'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, onClose, children, title }) {
  const overlayRef = useRef(null);
  
  // Close when clicking outside the modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (overlayRef.current && event.target === overlayRef.current) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore body scrolling when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // Close on ESC key press
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return createPortal(
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div 
        className="bg-white text-black rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden modal-enter modal-enter-active"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-2xl font-display font-bold text-black">
            {title}
          </h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Back to Gallery
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto p-0 max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}