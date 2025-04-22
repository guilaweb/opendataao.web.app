import React from "react";

interface AdminToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function AdminToast({ message, type = "success", onClose }: AdminToastProps) {
  return (
    <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg text-white ${type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      <div className="flex items-center gap-4">
        <span>{message}</span>
        <button className="ml-4 text-lg" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
}
