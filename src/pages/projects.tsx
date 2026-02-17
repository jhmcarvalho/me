import NavBar from "@/components/NavBar";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";

// =============================================
// LISTA DE PROJETOS
// Para adicionar: copie um bloco { ... } e cole no final do array.
// Para remover: delete o bloco { ... } desejado.
// Para reordenar: mova o bloco { ... } para a posição desejada.
// =============================================
const projects = [
  {
    title: "Love Bilhete",
    description:
      "Aplicação para criar bilhetes de amor personalizados em poucos passos, com pré-visualização em tempo real e compartilhamento fácil.",
    previewImage: "/images/projects/lovebilhete.png",
    projectUrl: "https://lovebilhete.vercel.app",
    githubUrl: "https://github.com/jhmcarvalho/amor-digital-bilhete",
    isGithubPrivate: true,
    isSiteOff: true,
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "shadcn/ui"],
  },
  {
    title: "Controle de Contas",
    description:
      "Sistema de controle financeiro pessoal com autenticação de usuários, permitindo gerenciar receitas e despesas de forma organizada.",
    previewImage: "/images/projects/contas.png",
    projectUrl: "https://contas-jeff.vercel.app",
    githubUrl: "https://github.com/jhmcarvalho/controle_despesas",
    isGithubPrivate: true,
    isSiteOff: true,
    technologies: ["React", "JavaScript", "Vite", "Supabase", "Recharts"],
  },
  {
    title: "CrytCot — Cotações de Moedas",
    description:
      "Dashboard de cotações de moedas e criptomoedas em tempo real, com visualização atualizada de valores do mercado financeiro.",
    previewImage: "/images/projects/cotacao.png",
    projectUrl: "https://cotacao-jeff.vercel.app",
    githubUrl: "https://github.com/jhmcarvalho/cotacao",
    isGithubPrivate: true,
    isSiteOff: false,
    technologies: ["Next.js", "React", "JavaScript", "Supabase"],
  },
  {
    title: "Cha de Casa Nova",
    description:
    "Aplicação que fiz pro meu chá de casa nova, onde cada convidado escolheu o presente que queria entregar, ou ainda, opção em enviar PIX. Conectado com banco Supabase.",
    previewImage: "/images/projects/chadecasanova.png",
    projectUrl: "https://casanovajeferson.vercel.app",
    githubUrl: "https://github.com/jhmcarvalho/cha-de-casa-nova",
    isGithubPrivate: false,
    isSiteOff: true,
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
  },
];

export default function Projects() {
  return (
    <div className="flex flex-col m-5 font-nunito min-h-screen">
      <NavBar />
      <div className="mt-8 max-w-4xl mx-auto w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-full py-2 px-8 mb-6 mx-auto w-fit shadow-sm"
        >
          <h1 className="text-lg font-bold text-gray-700 dark:text-gray-200 tracking-wide">
            Projects
          </h1>
        </motion.div>
        <div className="flex flex-col gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
