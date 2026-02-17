import { motion } from "framer-motion";
import { ExternalLinkIcon } from "@heroicons/react/outline";

interface ProjectProps {
  title: string;
  description: string;
  previewImage: string;
  projectUrl: string;
  githubUrl?: string;
  isGithubPrivate?: boolean;
}

const ProjectCard = ({ project }: { project: ProjectProps }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm overflow-hidden"
    >
      <div className="flex flex-col md:flex-row gap-5 p-5">
        {/* Preview */}
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex-shrink-0 md:w-[340px] w-full"
        >
          <div className="rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-gray-800 relative">
            {project.previewImage ? (
              <img
                src={project.previewImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 font-bold text-sm uppercase tracking-wider">
                Preview do sistema
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <ExternalLinkIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </div>
        </a>

        {/* Info */}
        <div className="flex flex-col justify-center items-center flex-1 min-w-0 py-2 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {project.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            {project.githubUrl && (
              <a
                href={project.isGithubPrivate ? undefined : project.githubUrl}
                target={project.isGithubPrivate ? undefined : "_blank"}
                rel="noreferrer"
                className={`group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300
                  ${project.isGithubPrivate
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 hover:shadow-lg hover:scale-105"
                  }`}
                onClick={project.isGithubPrivate ? (e) => e.preventDefault() : undefined}
                title={project.isGithubPrivate ? "Repositório privado" : "Ver repositório"}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Git repository
                {project.isGithubPrivate && (
                  <span className="text-[10px] opacity-50 ml-0.5">(privado)</span>
                )}
              </a>
            )}
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              Project URL
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
