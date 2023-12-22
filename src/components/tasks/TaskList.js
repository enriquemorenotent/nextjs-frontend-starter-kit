import React, { useState } from 'react';
import Task from './Task';
import EditTaskForm from './EditTaskForm';

const TaskList = ({ tasks, onTaskChange }) => {
	const [editingTask, setEditingTask] = useState(null);

	const handleEdit = (task) => {
		console.log(task);
		setEditingTask(task);
	};

	const handleSave = (task) => {
		onTaskChange(task);
		setEditingTask(null);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{tasks.map((task, index) =>
				editingTask === task.id ? (
					<EditTaskForm key={index} task={task} onSave={handleSave} />
				) : (
					<Task
						key={index}
						task={task}
						onEdit={handleEdit}
						onChange={onTaskChange}
					/>
				)
			)}
		</div>
	);
};

export default TaskList;
