import styles from './ToggleTheme.module.css';

export const ToggleTheme = ({ isDarkMode, setIsDarkMode }) => {
	return (
		<button
			className={`${styles.modeBtn} ${styles.btn}`}
			type="button"
			onClick={() => setIsDarkMode(!isDarkMode)}
		>
			{isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
		</button>
	);
};
