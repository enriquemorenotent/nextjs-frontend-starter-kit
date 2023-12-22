import Input from '../ui/Input';
import Button from '../ui/Button';
import { useState } from 'react';

const EditTaskForm = ({ task, onSave }) => {
	const [title, setTitle] = useState(task.title);
	const [deadline, setDeadline] = useState(task.deadline);
	const [error, setError] = useState(null); // Add this line

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:3001/v1/tasks/${task.id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({ title, deadline }),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to update task');
			}

			const updatedTask = await response.json();
			onSave(updatedTask);
		} catch (error) {
			console.error('Error updating task:', error);
			setError(error.message); // Update the error state
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-6 bg-white shadow-lg rounded-lg p-10"
		>
			<h2 className="text-3xl font-bold text-center text-gray-800">
				Edit Task
			</h2>{' '}
			{error && <p className="text-red-500">{error}</p>}{' '}
			{/* Display the error message */}
			<div>
				<label
					htmlFor="title"
					className="block text-md font-semibold text-gray-700 mb-2"
				>
					Title
				</label>
				<Input
					id="title"
					name="title"
					type="text"
					placeholder="Enter task title"
					value={title}
					className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>
			<div>
				<label
					htmlFor="deadline"
					className="block text-md font-semibold text-gray-700 mb-2"
				>
					Deadline
				</label>
				<Input
					id="deadline"
					name="deadline"
					type="date"
					value={deadline}
					className="w-full p-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
					onChange={(e) => setDeadline(e.target.value)}
				/>
			</div>
			<Button
				type="submit"
				className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline"
			>
				Save Changes
			</Button>
		</form>
	);
};

export default EditTaskForm;
