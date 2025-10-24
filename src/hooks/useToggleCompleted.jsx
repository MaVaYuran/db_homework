export const useToggleCompleted = (TODO_URL, setTodos) => {
	const toggleCompleted = (id, currentStatus) => {
		const completed = !currentStatus;

		fetch(`${TODO_URL}/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed,
			}),
		})
			.then((response) => response.json())
			.then((updatedTodo) => {
				setTodos((prevTodos) =>
					prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
				);
			})
			.catch((error) => console.error('Ошибка при обновлении статуса', error));
	};

	return { toggleCompleted };
};
