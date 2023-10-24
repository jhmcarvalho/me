import { motion } from 'framer-motion';
import { ArrowCircleUpIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import gitDark from "@images/git_dark.png";
import gitLight from "@images/git_light.png";
import { useTheme } from 'next-themes';

const ArticleCard = ({ section }) => {
  const { resolvedTheme } = useTheme();

  // Determine a imagem com base no tema
  const imageSrc = resolvedTheme === 'dark' ? gitDark : gitLight;

  return (
    <motion.a
      whileHover="groupHver"
      href="https://github.com/jhmcarvalho"
      rel="noreferrer"
      animate={{ opacity: ['all', 'about'].includes(section) ? 1 : 0.3 }}
      target="_blank"
      variants={{
        groupHover: {
          scale: 1.01,
          transition: {
            duration: 0.1,
            ease: 'easeInOut',
          },
        },
      }}
      className="flex bg-white relative dark:bg-gray-900 rounded-3xl md:col-span-1 col-span-2 overflow-hidden"
    >
      <div className="rounded-3xl">
        <Image src={imageSrc} layout='fill' alt='' className="rounded-3xl" />
      </div>

      <div className="flex ml-4 flex-col w-full justify-center">
        <ArrowCircleUpIcon className="absolute stroke-gray-300 dark:stroke-gray-600 bottom-0 right-0 m-2 md:m-5 rotate-45 md:w-[60px] md:h-[60px] w-[30px] h-[30px]" />
      </div>
    </motion.a>
  );
};

export default ArticleCard;
