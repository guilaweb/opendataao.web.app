import { useState, useEffect } from "react";
import AdminModal from "@/components/AdminModal";
import AdminToast from "@/components/AdminToast";
import { paginate, getPageCount } from "@/utils/pagination";
import { sortArray, SortDirection } from "@/utils/sort";
import { exportToCsv } from "@/utils/exportCsv";

// Mock para sugestões
const initialSuggestions = [
  { id: "1", user: "Usuário Exemplo", suggestion: "Adicionar dados sobre transporte público.", status: "nova" },
  { id: "2", user: "Outro Usuário", suggestion: "Atualizar o conjunto de dados de saúde.", status: "em análise" },
];

// Simulação de API (mock/fetch)
async function fetchSuggestions() {
  // Aqui você integraria com sua API real, ex: return fetch('/api/suggestions').then(r => r.json());
  return initialSuggestions;
}

export default function AdminSuggestions() {
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'delete' | null>(null);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string; type?: 'success'|'error'}|null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  // Paginação
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [sortKey, setSortKey] = useState<keyof typeof initialSuggestions[0]>("user");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  // Simula fetch inicial (API)
  useEffect(() => {
    fetchSuggestions().then(setSuggestions);
  }, []);

  function handleDelete(id: string) {
    setModalType('delete');
    setToDeleteId(id);
    setShowModal(true);
  }
  function confirmDelete() {
    setSuggestions(suggestions.filter(s => s.id !== toDeleteId));
    setShowModal(false);
    setToast({message: 'Sugestão excluída com sucesso!', type: 'success'});
    setToDeleteId(null);
  }
  function handleEdit(id: string) {
    setEditingId(id);
    const s = suggestions.find(s => s.id === id);
    setEditData(s ? { ...s } : {});
  }
  function handleSave() {
    setSuggestions(suggestions.map(s => s.id === editingId ? { ...editData } : s));
    setEditingId(null);
    setToast({message: 'Sugestão atualizada com sucesso!', type: 'success'});
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }
  function handleAdd() {
    setModalType('add');
    setEditData({ id: '', user: '', suggestion: '', status: 'nova' });
    setShowModal(true);
  }
  function confirmAdd() {
    if (!editData.user || !editData.suggestion) {
      setToast({message: 'Preencha todos os campos obrigatórios.', type: 'error'});
      return;
    }
    setSuggestions([{...editData, id: Date.now().toString()}, ...suggestions]);
    setShowModal(false);
    setToast({message: 'Sugestão adicionada com sucesso!', type: 'success'});
  }
  function handleSort(key: keyof typeof initialSuggestions[0]) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }
  const filteredSuggestions = suggestions.filter(s =>
    (statusFilter ? s.status === statusFilter : true) &&
    (s.user.toLowerCase().includes(search.toLowerCase()) ||
      s.suggestion.toLowerCase().includes(search.toLowerCase()) ||
      s.status.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedSuggestions = sortArray(filteredSuggestions, sortKey, sortDir);
  const pageCount = getPageCount(sortedSuggestions.length, pageSize);
  const paginatedSuggestions = paginate(sortedSuggestions, page, pageSize);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gerenciar Sugestões</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => {setSearch(e.target.value); setPage(1);}}
          placeholder="Buscar por usuário, sugestão ou status..."
          className="border px-2 py-1 rounded"
        />
        {/* Filtro de status */}
        <select
          value={statusFilter}
          onChange={e => {setStatusFilter(e.target.value); setPage(1);}}
          className="border px-2 py-1 rounded"
          title="Filtrar por status"
        >
          <option value="">Todos os status</option>
          {[...new Set(suggestions.map(s => s.status))].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {/* Exportação CSV */}
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={() => exportToCsv(filteredSuggestions, `suggestions_${Date.now()}.csv`)}
        >Exportar CSV</button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleAdd}>Adicionar Sugestão</button>
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("user")}>Usuário {sortKey==="user" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("suggestion")}>Sugestão {sortKey==="suggestion" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("status")}>Status {sortKey==="status" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedSuggestions.map(s => (
            <tr key={s.id} className="border-b">
              {editingId === s.id ? (
                <>
                  <td className="p-2 border"><input name="user" value={editData.user} onChange={handleChange} className="w-full border px-2" placeholder="Usuário" /></td>
                  <td className="p-2 border"><textarea name="suggestion" value={editData.suggestion} onChange={handleChange} className="w-full border px-2" placeholder="Sugestão" /></td>
                  <td className="p-2 border">
                    <select name="status" value={editData.status} onChange={handleChange} className="w-full border px-2">
                      <option value="nova">Nova</option>
                      <option value="em análise">Em análise</option>
                      <option value="implementada">Implementada</option>
                      <option value="rejeitada">Rejeitada</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <button className="text-green-700 mr-2" onClick={handleSave}>Salvar</button>
                    <button className="text-gray-500" onClick={() => setEditingId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{s.user}</td>
                  <td className="p-2 border">{s.suggestion}</td>
                  <td className="p-2 border">{s.status}</td>
                  <td className="p-2 border">
                    <button className="text-blue-700 mr-2" onClick={() => handleEdit(s.id)}>Editar</button>
                    <button className="text-red-700" onClick={() => handleDelete(s.id)}>Excluir</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginação */}
      <div className="flex gap-2 items-center mb-4">
        <button disabled={page===1} onClick={()=>setPage(p=>p-1)} className="px-3 py-1 rounded border disabled:opacity-50">Anterior</button>
        <span>Página {page} de {pageCount}</span>
        <button disabled={page===pageCount} onClick={()=>setPage(p=>p+1)} className="px-3 py-1 rounded border disabled:opacity-50">Próxima</button>
      </div>
      <AdminModal open={showModal && modalType==='delete'} title="Confirmar Exclusão" onClose={()=>setShowModal(false)}>
        <p>Tem certeza que deseja excluir esta sugestão?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={confirmDelete}>Excluir</button>
        </div>
      </AdminModal>
      <AdminModal open={showModal && modalType==='add'} title="Adicionar Sugestão" onClose={()=>setShowModal(false)}>
        <form onSubmit={e => {e.preventDefault(); confirmAdd();}} className="flex flex-col gap-3">
          <input name="user" value={editData.user} onChange={handleChange} placeholder="Usuário" className="border px-2 py-1 rounded" required />
          <textarea name="suggestion" value={editData.suggestion} onChange={handleChange} placeholder="Sugestão" className="border px-2 py-1 rounded" required />
          <select name="status" value={editData.status} onChange={handleChange} className="border px-2 py-1 rounded">
            <option value="nova">Nova</option>
            <option value="em análise">Em análise</option>
            <option value="implementada">Implementada</option>
            <option value="rejeitada">Rejeitada</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Adicionar</button>
        </form>
      </AdminModal>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
    </div>
  );
}
