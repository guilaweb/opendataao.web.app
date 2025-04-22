import { BarChart2, Users, Globe, Award, Sparkles, Database, Mail, Github, Twitter } from "lucide-react";

export default function AboutInfographic() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8" aria-label="Resumo visual da missão do OpenDataAngola">
      <div className="flex flex-col items-center text-center">
        <Globe className="text-angola-accent mb-2" size={36} aria-hidden="true" />
        <span className="font-bold">Dados de Angola</span>
        <span className="text-xs text-muted-foreground">Cobertura nacional</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <BarChart2 className="text-angola-accent mb-2" size={36} aria-hidden="true" />
        <span className="font-bold">Análise Fácil</span>
        <span className="text-xs text-muted-foreground">Ferramentas e visualizações</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Users className="text-angola-accent mb-2" size={36} aria-hidden="true" />
        <span className="font-bold">Para Todos</span>
        <span className="text-xs text-muted-foreground">Cidadãos, jornalistas, pesquisadores</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <Award className="text-angola-accent mb-2" size={36} aria-hidden="true" />
        <span className="font-bold">Transparência</span>
        <span className="text-xs text-muted-foreground">Promovendo inovação</span>
      </div>
    </div>
  );
}
