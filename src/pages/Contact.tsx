import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("enviando");

    // Usando Formspree para envio de email sem backend
    const response = await fetch("https://formspree.io/f/xnqewqzq", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });

    if (response.ok) {
      setStatus("sucesso");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("erro");
    }
  };

  return (
    <div className="container mx-auto max-w-lg p-6 mt-8 bg-card text-card-foreground rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-angola-accent">Contato</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-angola-accent bg-gray-50 dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-angola-accent bg-gray-50 dark:bg-gray-800"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="message">Mensagem</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-angola-accent bg-gray-50 dark:bg-gray-800"
          />
        </div>
        <button
          type="submit"
          className="bg-angola-accent text-white px-6 py-2 rounded hover:bg-angola-accent-dark transition-colors"
          disabled={status === "enviando"}
        >
          {status === "enviando" ? "Enviando..." : "Enviar"}
        </button>
        {status === "sucesso" && <p className="text-green-600 mt-2">Mensagem enviada com sucesso!</p>}
        {status === "erro" && <p className="text-red-600 mt-2">Erro ao enviar. Tente novamente.</p>}
      </form>
    </div>
  );
};

export default Contact;
