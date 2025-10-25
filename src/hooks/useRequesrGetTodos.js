import { useState, useEffect } from 'react';
export const useRequestGetTodos = (TODO_URL) => {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(TODO_URL)
			.then((response) => response.json())
			.then((loadedTodos) => setTodos(loadedTodos))
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	}, [TODO_URL]);

	return { todos, error, isLoading, setTodos };
};
