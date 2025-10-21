import { useState, useEffect } from 'react';
import styles from './App.module.css';

const TODO_URL = import.meta.env.VITE_TODO_URL;

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(TODO_URL)
			.then((response) => response.json())
			.then((loadedTodos) => setTodos(loadedTodos))
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className={`${styles.app} ${isDarkMode ? styles.dark : ''}`}>
			<button
				className={styles.modeBtn}
				type="button"
				onClick={() => setIsDarkMode(!isDarkMode)}
			>
				{isDarkMode ? 'Светлая тема' : 'Тёмная тема'}
			</button>
			<h3 className={styles.title}>Todos {isLoading && 'are loading'}:</h3>
			{error && <div className={styles.error}>{error}</div>}
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<ol>
					{todos.map(({ id, title, body }) => (
						<li className={styles.card} key={id}>
							<h4 className={styles.cardTitle}>{title}</h4>
							<p className={styles.cardText}>{body}</p>
						</li>
					))}
				</ol>
			)}
		</div>
	);
};
