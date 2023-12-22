import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

const NewTaskForm = ({ onSuccess }) => {
	const [title, setTitle] = useState('');
	const [deadline, setDeadline] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		setMessage(null);

		try {
			const response = await fetch('http://localhost:3001/v1/tasks', {
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title, deadline }),
			});
			const data = await response.json();
			console.log(data);
			setMessage('Task created successfully!');
			if (onSuccess) {
				onSuccess(data); // Call the onSuccess callback with the created task data
			}
		} catch (error) {
			console.error('Failed to create task:', error);
			setMessage('Failed to create task. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-4 bg-white shadow-md rounded p-8"
		>
			<h1 className="text-2xl font-bold mb-4">New Task</h1>
			<Input
				id="title"
				name="title"
				type="text"
				placeholder="Title"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<Input
				id="deadline"
				name="deadline"
				type="date"
				placeholder="Deadline"
				value={deadline}
				onChange={(event) => setDeadline(event.target.value)}
			/>
			<Button type="submit" disabled={isLoading}>
				{isLoading ? 'Creating...' : 'Create Task'}
			</Button>
			{message && (
				<p className="mt-4 text-green-500 font-bold">{message}</p>
			)}{' '}
		</form>
	);
};

export default NewTaskForm;
