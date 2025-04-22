import { useState, useEffect } from "react";
import AdminModal from "@/components/AdminModal";
import AdminToast from "@/components/AdminToast";
import { paginate, getPageCount } from "@/utils/pagination";
import { sortArray, SortDirection } from "@/utils/sort";
import { exportToCsv } from "@/utils/exportCsv";

// Usuários mock para demonstração
const initialUsers = [
  { id: "1", name: "Administrador", email: "admin@opendataangola.org", role: "admin" },
  { id: "2", name: "Usuário Exemplo", email: "user@exemplo.com", role: "user" },
];

// Simulação de API (mock/fetch)
async function fetchUsers() {
  // Aqui você integraria com sua API real, ex: return fetch('/api/users').then(r => r.json());
  return initialUsers;
}

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'delete' | null>(null);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string; type?: 'success'|'error'}|null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  // Paginação
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [sortKey, setSortKey] = useState<keyof typeof initialUsers[0]>("name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  // Simula fetch inicial (API)
  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  function handleDelete(id: string) {
    setModalType('delete');
    setToDeleteId(id);
    setShowModal(true);
  }
  function confirmDelete() {
    setUsers(users.filter(u => u.id !== toDeleteId));
    setShowModal(false);
    setToast({message: 'Usuário excluído com sucesso!', type: 'success'});
    setToDeleteId(null);
  }
  function handleEdit(id: string) {
    setEditingId(id);
    const user = users.find(u => u.id === id);
    setEditData(user ? { ...user } : {});
  }
  function handleSave() {
    setUsers(users.map(u => u.id === editingId ? { ...editData } : u));
    setEditingId(null);
    setToast({message: 'Usuário atualizado com sucesso!', type: 'success'});
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }
  function handleAdd() {
    setModalType('add');
    setEditData({ id: '', name: '', email: '', role: '' });
    setShowModal(true);
  }
  function confirmAdd() {
    if (!editData.name || !editData.email || !editData.role) {
      setToast({message: 'Preencha todos os campos obrigatórios.', type: 'error'});
      return;
    }
    setUsers([{...editData, id: Date.now().toString()}, ...users]);
    setShowModal(false);
    setToast({message: 'Usuário adicionado com sucesso!', type: 'success'});
  }
  function handleSort(key: keyof typeof initialUsers[0]) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }
  // Aplica filtro de perfil
  const filteredUsers = users.filter(u =>
    (roleFilter ? u.role === roleFilter : true) &&
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedUsers = sortArray(filteredUsers, sortKey, sortDir);
  const pageCount = getPageCount(sortedUsers.length, pageSize);
  const paginatedUsers = paginate(sortedUsers, page, pageSize);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gerenciar Usuários</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => {setSearch(e.target.value); setPage(1);}}
          placeholder="Buscar por nome, email ou perfil..."
          className="border px-2 py-1 rounded"
        />
        {/* Filtro de perfil */}
        <select
          value={roleFilter}
          onChange={e => {setRoleFilter(e.target.value); setPage(1);}}
          className="border px-2 py-1 rounded"
          title="Filtrar por perfil"
        >
          <option value="">Todos os perfis</option>
          {[...new Set(users.map(u => u.role))].map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        {/* Exportação CSV */}
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={() => exportToCsv(filteredUsers, `users_${Date.now()}.csv`)}
        >Exportar CSV</button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleAdd}>Adicionar Usuário</button>
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("name")}>Nome {sortKey==="name" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("email")}>Email {sortKey==="email" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("role")}>Perfil {sortKey==="role" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(user => (
            <tr key={user.id} className="border-b">
              {editingId === user.id ? (
                <>
                  <td className="p-2 border"><input name="name" value={editData.name} onChange={handleChange} className="w-full border px-2" placeholder="Nome" /></td>
                  <td className="p-2 border"><input name="email" value={editData.email} onChange={handleChange} className="w-full border px-2" placeholder="Email" /></td>
                  <td className="p-2 border"><input name="role" value={editData.role} onChange={handleChange} className="w-full border px-2" placeholder="Perfil" /></td>
                  <td className="p-2 border">
                    <button className="text-green-700 mr-2" onClick={handleSave}>Salvar</button>
                    <button className="text-gray-500" onClick={() => setEditingId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">
                    <button className="text-blue-700 mr-2" onClick={() => handleEdit(user.id)}>Editar</button>
                    <button className="text-red-700" onClick={() => handleDelete(user.id)}>Excluir</button>
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
        <p>Tem certeza que deseja excluir este usuário?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={confirmDelete}>Excluir</button>
        </div>
      </AdminModal>
      <AdminModal open={showModal && modalType==='add'} title="Adicionar Usuário" onClose={()=>setShowModal(false)}>
        <form onSubmit={e => {e.preventDefault(); confirmAdd();}} className="flex flex-col gap-3">
          <input name="name" value={editData.name} onChange={handleChange} placeholder="Nome" className="border px-2 py-1 rounded" required />
          <input name="email" value={editData.email} onChange={handleChange} placeholder="Email" className="border px-2 py-1 rounded" required />
          <input name="role" value={editData.role} onChange={handleChange} placeholder="Perfil" className="border px-2 py-1 rounded" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Adicionar</button>
        </form>
      </AdminModal>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
    </div>
  );
}
