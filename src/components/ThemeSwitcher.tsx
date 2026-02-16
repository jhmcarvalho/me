import { useCallback, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/outline'

const ThemeSwitcher = ({ className = '' }) => {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Sync with next-themes and handle hydration
	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === "light" ? "dark" : "light");
	}, [resolvedTheme, setTheme]);

	if (!mounted) return null;

	return (
		<button
			onClick={toggleTheme}
			className={`${className} rounded-full p-1 border-2 border-gray-300 dark:border-gray-800 text-gray-500 dark:text-gray-400 focus:outline-none`}
		>
			{resolvedTheme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
		</button>
	);
}

export default ThemeSwitcher;
