import { useState } from 'react';

export const useCreateTodo = (TODO_URL, setTodos) => {
	const [completed] = useState(false);
	const [title, setTitle] = useState('');

	const createTodoHandler = (event) => {
		event.preventDefault();

		fetch(TODO_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title,
				completed,
			}),
		})
			.then((rowResponse) => rowResponse.json())
			.then((newTodo) => {
				setTodos((prevTodos) => [...prevTodos, newTodo]);
			})
			.finally(() => setTitle(''));
	};

	return { createTodoHandler, title, setTitle };
};
