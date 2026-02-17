import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar = ({ setSection = null }) => {
	const router = useRouter();
	const isHome = router.pathname === '/';

	const handleNavClick = (section: string) => {
		if (isHome && setSection) {
			setSection(section);
		} else {
			router.push('/');
		}
	};

	const btnClass = "hover:bg-gray-100 hover:rounded-3xl p-2 dark:hover:bg-gray-800 focus:outline-none";

	return (
		<nav className="flex w-full justify-center">
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center rounded-full bg-white dark:bg-gray-900 text-gray-500 font-semibold py-1 px-4 space-x-4 focus:outline-none">
					<button className={btnClass} onClick={() => handleNavClick('all')}>
						Home
					</button>
					<button className={btnClass} onClick={() => handleNavClick('about')}>
						About
					</button>
					<button className={btnClass} onClick={() => handleNavClick('contact')} id="Contact">
						Contact
					</button>
				</div>
				<div className="flex items-center justify-center rounded-full bg-white dark:bg-gray-900 text-gray-500 font-semibold py-1 px-4 space-x-4 focus:outline-none">
					<Link href="/projects">
						<a className={`rounded-3xl font-semibold p-2 focus:outline-none transition-colors duration-200
							${router.pathname === '/projects'
								? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
								: 'text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
							}`}
						>
							Projects
						</a>
					</Link>
				</div>
			</div>
		</nav>
	)
}
export default NavBar
