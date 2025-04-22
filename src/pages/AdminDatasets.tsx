import { useState, useEffect } from "react";
import AdminModal from "@/components/AdminModal";
import AdminToast from "@/components/AdminToast";
import { paginate, getPageCount } from "@/utils/pagination";
import { sortArray, SortDirection } from "@/utils/sort";
import { exportToCsv } from "@/utils/exportCsv";
import { importDatasetsFromGoogleSheetsAdvanced, GoogleSheetImportOptions } from "@/utils/googleSheets";

// Mock para datasets
const initialDatasets = [
  { id: "1", name: "Censo Populacional 2024", description: "Dados do censo nacional.", status: "ativo" },
  { id: "2", name: "Instalações de Saúde", description: "Lista de hospitais e clínicas.", status: "inativo" },
];

// Simulação de API (mock/fetch)
async function fetchDatasets() {
  // Aqui você integraria com sua API real, ex: return fetch('/api/datasets').then(r => r.json());
  return initialDatasets;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  status: string;
}

// Função utilitária para importar do Google Sheets CSV
async function importDatasetsFromGoogleSheets(sheetUrl: string): Promise<Dataset[]> {
  // Extrai o ID da planilha do link
  const regex = /\/d\/([a-zA-Z0-9-_]+)/;
  const match = sheetUrl.match(regex);
  const sheetId = match ? match[1] : sheetUrl;
  // Monta a URL para CSV público
  const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
  const res = await fetch(csvUrl);
  const text = await res.text();
  // Parse CSV (espera cabeçalho: name, description, status)
  const [header, ...lines] = text.trim().split("\n");
  const keys = header.split(",").map(k => k.trim());
  return lines.map((line, i) => {
    const values = line.split(",");
    const obj: any = { id: Date.now().toString() + i };
    keys.forEach((k, idx) => obj[k] = values[idx]);
    return obj as Dataset;
  });
}

export default function AdminDatasets() {
  const [datasets, setDatasets] = useState<Dataset[]>(initialDatasets);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Dataset>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'delete' | null>(null);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{message: string; type?: 'success'|'error'}|null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Paginação
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [sortKey, setSortKey] = useState<keyof Dataset>("name");
  const [sortDir, setSortDir] = useState<SortDirection>("asc");

  // Modal para importar Google Sheets
  const [showImportModal, setShowImportModal] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const [importSheetName, setImportSheetName] = useState("");
  const [importColumnMap, setImportColumnMap] = useState({ name: "", description: "", status: "" });
  const [importApiKey, setImportApiKey] = useState("");
  const [importLoading, setImportLoading] = useState(false);

  // Simula fetch inicial (API)
  useEffect(() => {
    fetchDatasets().then(setDatasets);
  }, []);

  function handleDelete(id: string) {
    setModalType('delete');
    setToDeleteId(id);
    setShowModal(true);
  }
  function confirmDelete() {
    setDatasets(datasets.filter(d => d.id !== toDeleteId));
    setShowModal(false);
    setToast({message: 'Dataset excluído com sucesso!', type: 'success'});
    setToDeleteId(null);
  }
  function handleEdit(id: string) {
    setEditingId(id);
    const d = datasets.find(d => d.id === id);
    setEditData(d ? { ...d } : {});
  }
  function handleSave() {
    setDatasets(datasets.map(d => d.id === editingId ? { ...d, ...editData } as Dataset : d));
    setEditingId(null);
    setToast({message: 'Dataset atualizado com sucesso!', type: 'success'});
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }
  function handleAdd() {
    setModalType('add');
    setEditData({ id: '', name: '', description: '', status: 'ativo' });
    setShowModal(true);
  }
  function confirmAdd() {
    if (!editData.name || !editData.description || !editData.status) {
      setToast({message: 'Preencha todos os campos obrigatórios.', type: 'error'});
      return;
    }
    setDatasets([{...editData, id: Date.now().toString()} as Dataset, ...datasets]);
    setShowModal(false);
    setToast({message: 'Dataset adicionado com sucesso!', type: 'success'});
  }
  function handleSort(key: keyof Dataset) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  }

  async function handleImportGoogleSheets() {
    setImportLoading(true);
    try {
      const options: GoogleSheetImportOptions = {
        sheetUrl: importUrl,
        sheetName: importSheetName || undefined,
        columnMap: Object.values(importColumnMap).some(Boolean) ? importColumnMap : undefined,
        apiKey: importApiKey || undefined,
      };
      const imported = await importDatasetsFromGoogleSheetsAdvanced(options);
      setDatasets(imported);
      setToast({ message: "Dados importados com sucesso do Google Sheets!", type: "success" });
      setShowImportModal(false);
    } catch (e) {
      setToast({ message: "Falha ao importar dados. Verifique o link, aba, colunas e tente novamente.", type: "error" });
    } finally {
      setImportLoading(false);
    }
  }

  const filteredDatasets = datasets.filter(d =>
    (statusFilter ? d.status === statusFilter : true) &&
    (d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.status.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedDatasets = sortArray(filteredDatasets, sortKey, sortDir);
  const pageCount = getPageCount(sortedDatasets.length, pageSize);
  const paginatedDatasets = paginate(sortedDatasets, page, pageSize);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gerenciar Datasets</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => {setSearch(e.target.value); setPage(1);}}
          placeholder="Buscar por nome, descrição ou status..."
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
          {[...new Set(datasets.map(d => d.status))].map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {/* Exportação CSV */}
        <button
          className="bg-green-600 text-white px-4 py-1 rounded"
          onClick={() => exportToCsv(filteredDatasets, `datasets_${Date.now()}.csv`)}
        >Exportar CSV</button>
        {/* Importar do Google Sheets */}
        <button
          className="bg-yellow-500 text-white px-4 py-1 rounded"
          onClick={() => setShowImportModal(true)}
        >Carregar do Google Sheets</button>
        <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleAdd}>Adicionar Dataset</button>
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("name")}>Nome {sortKey==="name" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("description")}>Descrição {sortKey==="description" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border cursor-pointer" onClick={() => handleSort("status")}>Status {sortKey==="status" && (sortDir==="asc"?"↑":"↓")}</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {paginatedDatasets.map(d => (
            <tr key={d.id} className="border-b">
              {editingId === d.id ? (
                <>
                  <td className="p-2 border"><input name="name" value={editData.name || ''} onChange={handleChange} className="w-full border px-2" placeholder="Nome" /></td>
                  <td className="p-2 border"><input name="description" value={editData.description || ''} onChange={handleChange} className="w-full border px-2" placeholder="Descrição" /></td>
                  <td className="p-2 border"><input name="status" value={editData.status || ''} onChange={handleChange} className="w-full border px-2" placeholder="Status" /></td>
                  <td className="p-2 border">
                    <button className="text-green-700 mr-2" onClick={handleSave}>Salvar</button>
                    <button className="text-gray-500" onClick={() => setEditingId(null)}>Cancelar</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{d.name}</td>
                  <td className="p-2 border">{d.description}</td>
                  <td className="p-2 border">{d.status}</td>
                  <td className="p-2 border">
                    <button className="text-blue-700 mr-2" onClick={() => handleEdit(d.id)}>Editar</button>
                    <button className="text-red-700" onClick={() => handleDelete(d.id)}>Excluir</button>
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
        <p>Tem certeza que deseja excluir este dataset?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-red-600 text-white px-4 py-1 rounded" onClick={confirmDelete}>Excluir</button>
        </div>
      </AdminModal>
      <AdminModal open={showModal && modalType==='add'} title="Adicionar Dataset" onClose={()=>setShowModal(false)}>
        <form onSubmit={e => {e.preventDefault(); confirmAdd();}} className="flex flex-col gap-3">
          <input name="name" value={editData.name || ''} onChange={handleChange} placeholder="Nome" className="border px-2 py-1 rounded" required />
          <input name="description" value={editData.description || ''} onChange={handleChange} placeholder="Descrição" className="border px-2 py-1 rounded" required />
          <input name="status" value={editData.status || ''} onChange={handleChange} placeholder="Status" className="border px-2 py-1 rounded" required />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Adicionar</button>
        </form>
      </AdminModal>
      {/* Modal de Importação Google Sheets */}
      <AdminModal open={showImportModal} title="Importar Datasets do Google Sheets" onClose={()=>setShowImportModal(false)}>
        <form onSubmit={e => {e.preventDefault(); handleImportGoogleSheets();}} className="flex flex-col gap-3">
          <label htmlFor="gsheet-url">Cole o link da planilha Google Sheets:</label>
          <input
            id="gsheet-url"
            type="text"
            value={importUrl}
            onChange={e => setImportUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/ID/edit..."
            className="border px-2 py-1 rounded"
            required
          />
          <label htmlFor="gsheet-sheet">Nome da aba (opcional):</label>
          <input
            id="gsheet-sheet"
            type="text"
            value={importSheetName}
            onChange={e => setImportSheetName(e.target.value)}
            placeholder="Ex: Dados2024"
            className="border px-2 py-1 rounded"
          />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">Mapeamento de colunas (opcional):</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={importColumnMap.name}
                onChange={e => setImportColumnMap(m => ({ ...m, name: e.target.value }))}
                placeholder="Coluna para 'name'"
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={importColumnMap.description}
                onChange={e => setImportColumnMap(m => ({ ...m, description: e.target.value }))}
                placeholder="Coluna para 'description'"
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                value={importColumnMap.status}
                onChange={e => setImportColumnMap(m => ({ ...m, status: e.target.value }))}
                placeholder="Coluna para 'status'"
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>
          <label htmlFor="gsheet-apikey">Google API Key (opcional, para sheets privadas):</label>
          <input
            id="gsheet-apikey"
            type="text"
            value={importApiKey}
            onChange={e => setImportApiKey(e.target.value)}
            placeholder="Chave da API Google (opcional)"
            className="border px-2 py-1 rounded"
          />
          <button type="submit" className="bg-yellow-500 text-white px-4 py-1 rounded" disabled={importLoading}>
            {importLoading ? "Importando..." : "Importar"}
          </button>
        </form>
      </AdminModal>
      {toast && <AdminToast message={toast.message} type={toast.type} onClose={()=>setToast(null)} />}
    </div>
  );
}
