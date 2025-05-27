// src/components/shared/TextLinkButton.tsx
'use client';

export default function TextButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-sm font-medium"
    >
      {children}
    </button>
  );
}
