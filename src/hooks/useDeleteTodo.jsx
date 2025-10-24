export const useDeleteTodo = (TODO_URL, setTodos) => {
	const deleteTodoHandler = (id) => {
		fetch(`${TODO_URL}/${id}`, { method: 'DELETE' })
			.then((rowDta) => rowDta.json())
			.then(() => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)));
	};
	return { deleteTodoHandler };
};
