import AboutInfographic from "@/components/AboutInfographic";
import AboutTimeline from "@/components/AboutTimeline";
import AboutTeam from "@/components/AboutTeam";
import AboutVideo from "@/components/AboutVideo";
import AboutFAQ from "@/components/AboutFAQ";
import AboutPartners from "@/components/AboutPartners";
import AboutAwards from "@/components/AboutAwards";
import AboutTestimonials from "@/components/AboutTestimonials";
import { Sparkles, Mail, Github, Twitter } from "lucide-react";

const About = () => {
  return (
    <main className="container mx-auto px-4 py-8 flex-grow bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-angola-accent">
        Sobre o OpenDataAngola
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-angola-accent/10 text-angola-accent text-base font-bold ml-2">
          <Sparkles size={18} /> Plataforma aberta
        </span>
      </h1>
      <AboutInfographic />
      <AboutTimeline />
      <AboutTeam />
      <AboutVideo />
      <AboutFAQ />
      <AboutPartners />
      <AboutAwards />
      <AboutTestimonials />
      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          O <b>OpenDataAngola</b> é uma plataforma de dados abertos dedicada a disponibilizar 
          informações públicas sobre Angola de maneira acessível e utilizável para 
          cidadãos, pesquisadores, jornalistas e formuladores de políticas.
        </p>
        <div className="bg-angola-accent/10 rounded p-4 mb-6 text-angola-accent text-sm flex items-center gap-2">
          <Sparkles size={18} />
          <span>
            Novidade: agora com infográficos, linha do tempo, equipe, FAQ, prêmios, parceiros, depoimentos e visual moderno!
          </span>
        </div>
        {/* MISSÃO: agora com ilustração, infográfico e citação */}
        <section className="my-12 bg-angola-accent/5 rounded-xl p-6 shadow-md flex flex-col gap-8 items-center">
          <img src="https://cdn.pixabay.com/photo/2017/01/31/13/14/africa-2027466_1280.png" alt="Ilustração Angola" className="w-36 h-36 object-contain mx-auto drop-shadow" loading="lazy" />
          <div className="flex-1 w-full">
            <h2 className="text-2xl font-bold mb-4 text-angola-accent flex items-center gap-2">
              Nossa Missão
            </h2>
            <AboutInfographic />
            <p className="text-lg leading-relaxed mb-2 font-medium text-angola-dark flex flex-wrap gap-2">
              <span className="inline-block bg-angola-accent/10 px-3 py-1 rounded-full font-bold">Transparência</span>
              <span className="inline-block bg-angola-accent/10 px-3 py-1 rounded-full font-bold">Cidadania</span>
              <span className="inline-block bg-angola-accent/10 px-3 py-1 rounded-full font-bold">Inovação</span>
            </p>
            <blockquote className="italic text-angola-accent border-l-4 border-angola-accent pl-4 py-1 mb-2">
              “Promovemos uma Angola mais aberta, justa e inovadora ao facilitar o acesso a dados públicos de qualidade. Informação é a base do desenvolvimento social, econômico e democrático.”
            </blockquote>
          </div>
        </section>
        {/* OBJETIVOS: cards com ícones */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4 text-angola-accent">Nossos Objetivos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-angola-light/40 rounded-lg p-4 flex flex-col gap-2 items-center shadow">
              <span className="bg-angola-accent/10 rounded-full p-2 mb-2"><Mail className="text-angola-accent" size={22} /></span>
              <span className="font-semibold">Coletar, organizar e disponibilizar dados públicos</span>
            </div>
            <div className="bg-angola-light/40 rounded-lg p-4 flex flex-col gap-2 items-center shadow">
              <span className="bg-angola-accent/10 rounded-full p-2 mb-2"><Github className="text-angola-accent" size={22} /></span>
              <span className="font-semibold">Criar ferramentas para análise e compreensão</span>
            </div>
            <div className="bg-angola-light/40 rounded-lg p-4 flex flex-col gap-2 items-center shadow">
              <span className="bg-angola-accent/10 rounded-full p-2 mb-2"><Twitter className="text-angola-accent" size={22} /></span>
              <span className="font-semibold">Promover a cultura de dados abertos</span>
            </div>
            <div className="bg-angola-light/40 rounded-lg p-4 flex flex-col gap-2 items-center shadow">
              <span className="bg-angola-accent/10 rounded-full p-2 mb-2"><Mail className="text-angola-accent" size={22} /></span>
              <span className="font-semibold">Apoiar pesquisadores e jornalistas</span>
            </div>
            <div className="bg-angola-light/40 rounded-lg p-4 flex flex-col gap-2 items-center shadow">
              <span className="bg-angola-accent/10 rounded-full p-2 mb-2"><Github className="text-angola-accent" size={22} /></span>
              <span className="font-semibold">Fomentar soluções para desafios sociais</span>
            </div>
          </div>
        </section>
        {/* DADOS DISPONÍVEIS: badges e icons */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4 text-angola-accent">Dados Disponíveis</h2>
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Mail size={14} /> Economia e Finanças</span>
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Twitter size={14} /> Saúde e Bem-estar</span>
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Github size={14} /> Educação</span>
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Mail size={14} /> Demografia</span>
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Twitter size={14} /> Agricultura</span>
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Github size={14} /> Energia</span>
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Mail size={14} /> Infraestrutura</span>
            <span className="bg-angola-light text-angola-dark px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><Twitter size={14} /> Meio Ambiente</span>
          </div>
          <p className="text-sm text-muted-foreground">Nossa plataforma oferece dados em múltiplas áreas essenciais para o desenvolvimento de Angola.</p>
        </section>
        {/* COMO USAR: destaque visual */}
        <section className="my-12 bg-angola-accent/5 rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-angola-accent">Como Usar</h2>
          <p className="text-base text-angola-dark mb-2">
            <span className="inline-block bg-angola-accent/10 px-2 py-1 rounded text-xs font-semibold mr-2">Interface visual</span>
            <span className="inline-block bg-angola-accent/10 px-2 py-1 rounded text-xs font-semibold mr-2">API</span>
            <span className="inline-block bg-angola-accent/10 px-2 py-1 rounded text-xs font-semibold">CSV / JSON / XLSX</span>
          </p>
          <p className="text-sm text-muted-foreground">Explore os dados pela interface ou integre em seus projetos. Formatos abertos e acessíveis para todos!</p>
        </section>
        {/* COLABORE: chamada visual */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4 text-angola-accent">Colabore Conosco</h2>
          <div className="bg-angola-accent/10 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center">
            <img src="https://cdn.pixabay.com/photo/2016/12/06/18/27/teamwork-1888705_1280.png" alt="Colaboração" className="w-24 h-24 object-contain drop-shadow" loading="lazy" />
            <p className="text-base text-angola-dark font-medium">
              O <b>OpenDataAngola</b> é uma iniciativa aberta à participação! Se você possui dados relevantes ou deseja contribuir para o desenvolvimento da plataforma, entre em contato e faça parte dessa transformação.
            </p>
          </div>
        </section>
        {/* CONTATO: destaque visual */}
        <section className="my-12">
          <h2 className="text-2xl font-bold mb-4 text-angola-accent">Contato</h2>
          <ul className="list-none pl-0 space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="text-angola-accent" size={18} aria-hidden="true" />
              <span>Email: <a href="mailto:info@opendataangola.org" className="underline">info@opendataangola.org</a></span>
            </li>
            <li className="flex items-center gap-2">
              <Twitter className="text-angola-accent" size={18} aria-hidden="true" />
              <span>Twitter: <a href="https://twitter.com/OpenDataAngola" target="_blank" rel="noopener noreferrer" className="underline">@OpenDataAngola</a></span>
            </li>
            <li className="flex items-center gap-2">
              <Github className="text-angola-accent" size={18} aria-hidden="true" />
              <span>GitHub: <a href="https://github.com/opendataangola" target="_blank" rel="noopener noreferrer" className="underline">github.com/opendataangola</a></span>
            </li>
          </ul>
        </section>
      </div>
      <footer className="mt-10 border-t pt-6 text-center text-muted-foreground text-xs">
        Plataforma aberta, acessível e colaborativa. Última atualização: Abril/2025
      </footer>
    </main>
  );
};

export default About;
