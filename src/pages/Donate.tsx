import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from "@/components/ui/button";

const data = [
  { name: 'Projetos Sociais', value: 50 },
  { name: 'Manutenção da Plataforma', value: 30 },
  { name: 'Transparência e Auditoria', value: 20 },
];
const COLORS = ['#fbbf24', '#2563eb', '#059669'];

export default function Donate() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground bg-gradient-to-br from-angola-dark to-angola-accent/10 p-4">
      <div className="bg-card text-card-foreground rounded-3xl shadow-2xl max-w-2xl w-full p-8 text-center border border-angola-accent/30">
        <h1 className="text-3xl font-bold text-angola-accent mb-2">Faça uma Doação</h1>
        <p className="text-lg text-gray-700 dark:text-gray-100 mb-6">Ajude a manter e expandir a plataforma OpenDataAngola.<br/>Sua contribuição faz a diferença para a transparência e o acesso a dados em Angola.</p>
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center mb-8">
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-xs mt-2 text-gray-500">Distribuição estimada dos recursos</div>
          </div>
          <div className="flex-1 text-left space-y-2">
            <div>
              <span className="font-semibold text-angola-accent">Empresa Desenvolvedora:</span><br/>
              <span>DIANGUILA EMPREENDIMENTOS, LDA.</span>
            </div>
            <div>
              <span className="font-semibold text-angola-accent">NIF:</span><br/>
              <span>5001706802</span>
            </div>
            <div>
              <span className="font-semibold text-angola-accent">IBAN:</span><br/>
              <span>AO06 0055 0000 1417 0893 1010 9</span>
            </div>
            <div>
              <span className="font-semibold text-angola-accent">Conta Bancária:</span><br/>
              <span>3143 7089 3100 01</span>
            </div>
            <div>
              <span className="font-semibold text-angola-accent">Banco:</span><br/>
              <span>Atlântico</span>
            </div>
            <div>
              <span className="font-semibold text-angola-accent">Unitel Money:</span><br/>
              <span>945 69 90 11</span>
            </div>
          </div>
        </div>
        <Button asChild className="bg-angola-accent text-angola-dark hover:bg-angola-accent/90">
          <Link to="/">Voltar para Home</Link>
        </Button>
      </div>
    </main>
  );
}
