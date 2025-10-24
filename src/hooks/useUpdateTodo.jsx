import { useState } from 'react';
export const useUpdateTodo = (TODO_URL, setTodos) => {
	const [editingId, setEditingId] = useState(null);
	const [editingTitle, setEditingTitle] = useState('');

	const updateTodoHandler = (id) => {
		fetch(`${TODO_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editingTitle,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((updatedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
				);
				setEditingId(null);
				setEditingTitle('');
			});
	};
	return { updateTodoHandler, editingId, setEditingId, editingTitle, setEditingTitle };
};
