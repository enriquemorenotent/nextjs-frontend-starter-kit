'use client';

import NewTaskForm from '@/components/tasks/NewTaskForm';
import TaskList from '@/components/tasks/TaskList';
import { useCallback, useEffect, useState } from 'react';

const Page = () => {
	const [tasks, setTasks] = useState([]);

	const fetchTasks = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:3001/v1/tasks', {
				credentials: 'include',
			});
			const data = await response.json();
			setTasks(data);
		} catch (error) {
			console.error('Failed to fetch tasks:', error);
		}
	}, []);

	useEffect(() => {
		fetchTasks();
	}, [fetchTasks]);

	return (
		<div className="p-6  flex flex-col gap-4">
			<h1 className="text-3xl font-bold mb-4">Tasks</h1>
			<TaskList tasks={tasks} onTaskChange={fetchTasks} />
			<NewTaskForm onSuccess={fetchTasks} />
		</div>
	);
};

export default Page;
