import styles from './CreateForm.module.css';

export const CreateForm = ({ createTodoHandler, title, setTitle }) => {
	return (
		<form className={styles.createForm} onSubmit={createTodoHandler}>
			<input
				className={styles.input}
				type="text"
				placeholder="Введите задачу"
				value={title}
				onChange={({ target }) => setTitle(target.value)}
			/>

			<button type="submit" className={styles.btn}>
				Cоздать
			</button>
		</form>
	);
};
