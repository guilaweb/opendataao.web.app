import React, { useState } from "react";
import { Copy } from "lucide-react";

interface CopyCodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CopyCodeBlock: React.FC<CopyCodeBlockProps> = ({ code, language = "", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`relative group ${className}`}>
      <pre className={`bg-gray-100 rounded p-4 overflow-x-auto text-sm font-mono ${language ? `language-${language}` : ""}`}>{code}</pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-white/80 hover:bg-angola-accent/20 text-angola-accent border border-angola-accent rounded px-2 py-1 flex items-center gap-1 text-xs font-semibold transition"
        aria-label="Copiar código"
        title={copied ? "Copiado!" : "Copiar código"}
        type="button"
      >
        <Copy size={16} /> {copied ? "Copiado!" : "Copiar"}
      </button>
    </div>
  );
};

export default CopyCodeBlock;
