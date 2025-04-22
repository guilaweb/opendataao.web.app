import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <div className="bg-card text-card-foreground max-w-2xl mx-auto rounded shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-angola-accent">Termos & Condições</h1>
        <p className="mb-4 text-muted-foreground">Bem-vindo ao OpenDataAngola! Leia atentamente os termos e condições abaixo antes de utilizar nosso site.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">1. Uso do Site</h2>
        <p className="mb-4">Ao acessar o OpenDataAngola, você concorda em utilizar as informações apenas para fins legais, educacionais ou de pesquisa, respeitando as leis vigentes.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Direitos Autorais</h2>
        <p className="mb-4">Os dados e conteúdos disponibilizados pertencem aos seus respectivos autores e fontes. Cite sempre a origem ao compartilhar ou utilizar informações.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Responsabilidade</h2>
        <p className="mb-4">Não garantimos a precisão, atualidade ou integridade dos dados. O uso das informações é de responsabilidade do usuário.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Privacidade</h2>
        <p className="mb-4">Não coletamos dados pessoais sem consentimento explícito. Consulte nossa Política de Privacidade para mais detalhes.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Alterações</h2>
        <p className="mb-4">Podemos atualizar estes termos periodicamente. Recomendamos revisá-los regularmente.</p>
        <div className="mt-10 text-sm text-muted-foreground">
          <Link to="/" className="underline hover:text-angola-accent">Voltar para o início</Link>
        </div>
      </div>
    </main>
  );
}
