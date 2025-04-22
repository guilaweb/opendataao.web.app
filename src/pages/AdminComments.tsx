import { useState, useEffect } from "react";
import AdminModal from "@/components/AdminModal";
import AdminToast from "@/components/AdminToast";
import { paginate, getPageCount } from "@/utils/pagination";
import { sortArray, SortDirection } from "@/utils/sort";
import { exportToCsv } from "@/utils/exportCsv";

// Mock para comentários
const initialComments = [
  { id: "1", dataset: "Censo Populacional 2024", user: "Usuário Exemplo", content: "Ótimo conjunto de dados!", status: "aprovado" },
  { id: "2", dataset: "Instalações de Saúde", user: "Outro Usuário", content: "Faltam informações de algumas províncias.", status: "pendente" },
];

// Simulação de API (mock/fetch)
async function fetchComments() {
  // Aqui você integraria com sua API real, ex: return fetch('/api/comments').then(r => r.json());
  return initialComments;
}

export default function AdminComments() {
  const [comments, setComments] = useState(initialComments);
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
  const [sortKey, setSortKey] = useState<keyof typeof initialComments[0]>("dataset");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  // Simula fetch inicial (API)
  useEffect(() => {
    fetchComments().then(setComments);
  }, []);

  function handleDelete(id: string) {
    setModalType('delete');
    setToDeleteId(id);
    setShowModal(true);
  }
  function confirmDelete() {
    setComments(comments.filter(c => c.id !== toDeleteId));
    setShowModal(false);
    setToast({message: 'Comentário excluído com sucesso!', type: 'success'});
    setToDeleteId(null);
  }
  function handleEdit(id: string) {
    setEditingId(id);
    const c = comments.find(c => c.id === id);
    setEditData(c ? { ...c } : {});
  }
  function handleSave() {
    setComments(comments.map(c => c.id === editingId ? { ...editData } : c));
    setEditingId(null);
    setToast({message: 'Comentário atualizado com sucesso!', type: 'success'});
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }
  function handleAdd() {
    setModalType('add');
    setEditData({ id: '', dataset: '', user: '', content: '', status: 'pendente' });
    setShowModal(true);
  }
  function confirmAdd() {
    if (!editData.dataset || !editData.user || !editData.content) {
      setToast({message: 'Preencha todos os campos obrigatórios.', type: 'error'});
      return;
    }
    setComments([{...editData, id: Date.now().toString()}, ...comments]);
    setShowModal(false);
    setToast({message: 'Comentário adicionado com sucesso!', type: 'success'});
  }
  function handleSort(key: keyof typeof initialComments[0]) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }
  const filteredComments = comments.filter(c =>
    (statusFilter ? c.status === statusFilter : true) &&
    (c.dataset.toLowerCase().includes(search.toLowerCase()) ||
      c.user.toLowerCase().includes(search.toLowerCase()) ||
      c.content.toLowerCase().includes(search.toLowerCase()) ||
      c.status.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedComments = sortArray(filteredComments, sortKey, sortDir);
  const pageCount = getPageCount(sortedComments.length, pageSize);
  const paginatedComments = paginate(sortedComments, page, pageSize);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Moderar Comentários</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => {setSearch(e.target.value); setPage(1);}}
          placeholder="Buscar por dataset, usuário, conteúdo ou status..."
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
          {[...new Set(comments.map(c => c.status))].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {/* Exportação CSV */}
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={() => exportToCsv(filteredComments, `comments_${Date.now()}.csv`)}
        >Exportar CSV</button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleAdd}>Adicionar Comentário</button>
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("dataset")}>Dataset {sortKey==="dataset" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("user")}>Usuário {sortKey==="user" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("content")}>Comentário {sortKey==="content" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("status")}>Status {sortKey==="status" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedComments.map(c => (
            <tr key={c.id} className="border-b">
              {editingId === c.id ? (
                <>
                  <td className="p-2 border">{c.dataset}</td>
                  <td className="p-2 border">{c.user}</td>
                  <td className="p-2 border"><textarea name="content" value={editData.content} onChange={handleChange} className="w-full border px-2" placeholder="Comentário" /></td>
                  <td className="p-2 border">
                    <select name="status" value={editData.status} onChange={handleChange} className="w-full border px-2">
                      <option value="aprovado">Aprovado</option>
                      <option value="pendente">Pendente</option>
                      <option value="rejeitado">Rejeitado</option>
                    </select>
                  </td>
                  <td className="p-2 border">
                    <button className="text-green-700 mr-2" onClick={handleSave}>Salvar</button>
                    <button className="text-gray-500" onClick={() => setEditingId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{c.dataset}</td>
                  <td className="p-2 border">{c.user}</td>
                  <td className="p-2 border">{c.content}</td>
                  <td className="p-2 border">{c.status}</td>
                  <td className="p-2 border">
                    <button className="text-blue-700 mr-2" onClick={() => handleEdit(c.id)}>Editar</button>
                    <button className="text-red-700" onClick={() => handleDelete(c.id)}>Excluir</button>
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
        <p>Tem certeza que deseja excluir este comentário?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={confirmDelete}>Excluir</button>
        </div>
      </AdminModal>
      <AdminModal open={showModal && modalType==='add'} title="Adicionar Comentário" onClose={()=>setShowModal(false)}>
        <form onSubmit={e => {e.preventDefault(); confirmAdd();}} className="flex flex-col gap-3">
          <input name="dataset" value={editData.dataset} onChange={handleChange} placeholder="Dataset" className="border px-2 py-1 rounded" required />
          <input name="user" value={editData.user} onChange={handleChange} placeholder="Usuário" className="border px-2 py-1 rounded" required />
          <textarea name="content" value={editData.content} onChange={handleChange} placeholder="Comentário" className="border px-2 py-1 rounded" required />
          <select name="status" value={editData.status} onChange={handleChange} className="border px-2 py-1 rounded">
            <option value="aprovado">Aprovado</option>
            <option value="pendente">Pendente</option>
            <option value="rejeitado">Rejeitado</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Adicionar</button>
        </form>
      </AdminModal>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
    </div>
  );
}
