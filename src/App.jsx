import { useState } from 'react';
import {
	useUpdateTodo,
	useCreateTodo,
	useDeleteTodo,
	useRequestGetTodos,
	useToggleCompleted,
	useSortTodos,
	useFilteredTodos,
	useDebounce,
} from './hooks';
import { CreateForm } from './components/CreateForm';
import { TodoItem } from './components/TodoItem';
import { ToggleTheme } from './components/ToggleTheme';
import styles from './App.module.css';

const TODO_URL = import.meta.env.VITE_TODO_URL;

export const App = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const { todos, error, isLoading, setTodos } = useRequestGetTodos(TODO_URL);
	const { title, setTitle, createTodoHandler } = useCreateTodo(TODO_URL, setTodos);
	const { editingId, setEditingId, editingTitle, setEditingTitle, updateTodoHandler } =
		useUpdateTodo(TODO_URL, setTodos);
	const { deleteTodoHandler } = useDeleteTodo(TODO_URL, setTodos);
	const { toggleCompleted } = useToggleCompleted(TODO_URL, setTodos);
	const { sortTodos } = useSortTodos(todos, setTodos);
	const debouncedQuery = useDebounce(searchQuery, 300);
	const { filteredTodos } = useFilteredTodos(todos, debouncedQuery);

	return (
		<div className={`${styles.app} ${isDarkMode ? styles.dark : ''}`}>
			<ToggleTheme isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
			<CreateForm
				title={title}
				setTitle={setTitle}
				createTodoHandler={createTodoHandler}
			/>
			<button className={styles.btn} onClick={sortTodos} type="button">
				Сортировать задачи
			</button>
			<input
				className={styles.input}
				type="text"
				value={searchQuery}
				onChange={({ target }) => setSearchQuery(target.value)}
				placeholder="Найти задачу"
			/>
			<h3 className={styles.title}>Список дел {isLoading && 'загружается'}:</h3>
			{error && <div className={styles.error}>{error}</div>}
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<ol>
					{(searchQuery.trim() ? filteredTodos : todos).map((todo) => (
						<TodoItem
							key={todo.id}
							{...todo}
							editingId={editingId}
							editingTitle={editingTitle}
							setEditingId={setEditingId}
							setEditingTitle={setEditingTitle}
							updateTodoHandler={updateTodoHandler}
							deleteTodoHandler={deleteTodoHandler}
							toggleCompleted={toggleCompleted}
						/>
					))}
				</ol>
			)}
		</div>
	);
};
