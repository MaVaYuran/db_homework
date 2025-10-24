import { FiEdit } from 'react-icons/fi';
import styles from './TodoItem.module.css';

export const TodoItem = ({
	id,
	completed,
	title,
	toggleCompleted,
	editingId,
	setEditingId,
	editingTitle,
	setEditingTitle,
	updateTodoHandler,
	deleteTodoHandler,
}) => {
	return (
		<li className={styles.card} key={id}>
			<div className={styles.cardContent}>
				<input
					type="checkbox"
					checked={completed}
					onChange={() => toggleCompleted(id, completed)}
				/>
				{editingId === id ? (
					<input
						type="text"
						value={editingTitle ?? ''}
						onChange={({ target }) => setEditingTitle(target.value)}
						onBlur={() => updateTodoHandler(id)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								updateTodoHandler(id);
							}
						}}
					/>
				) : (
					<p className={`${styles.cardTitle} ${completed ? styles.disabled : ''}`}>
						{title}
					</p>
				)}
			</div>
			<div>
				<button
					className={styles.updateBtn}
					onClick={() => {
						setEditingId(id);
						setEditingTitle(title);
					}}
				>
					<FiEdit />
				</button>
				<button onClick={() => deleteTodoHandler(id)} className={styles.btn}>
					Удалить
				</button>
			</div>
		</li>
	);
};
