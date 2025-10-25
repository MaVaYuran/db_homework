export const useSortTodos = (todos, setTodos) => {
	const sortTodos = () => {
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setTodos(sortedTodos);
		return todos;
	};
	return { sortTodos };
};
