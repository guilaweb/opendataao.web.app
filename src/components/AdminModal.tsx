import React from "react";

interface AdminModalProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function AdminModal({ open, title, children, onClose }: AdminModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px] max-w-full">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-6">
          <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}
