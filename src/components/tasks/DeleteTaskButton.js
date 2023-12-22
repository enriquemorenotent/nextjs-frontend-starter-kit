const DeleteTaskButton = ({ taskId, onSuccess }) => {
	const deleteTask = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/v1/tasks/${taskId}`,
				{
					method: 'DELETE',
					credentials: 'include',
				}
			);
			if (!response.ok) {
				throw new Error('Error deleting task');
			}
			// Invoke the onSuccess callback after the task is successfully deleted
			if (typeof onSuccess === 'function') {
				onSuccess(taskId);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<button
			onClick={deleteTask}
			className="inline-flex items-center justify-center bg-red-200 text-red-700 rounded-md px-2 py-1 text-sm hover:bg-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
		>
			Delete
		</button>
	);
};

export default DeleteTaskButton;
