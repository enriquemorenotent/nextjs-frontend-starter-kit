import { useEffect, useState } from 'react';
import DeleteTaskButton from './DeleteTaskButton';

const Task = ({ task }) => {
	const deadline = new Date(task.deadline);
	const formattedDeadline = `${deadline.getDate()}-${
		deadline.getMonth() + 1
	}-${deadline.getFullYear()}`;

	return (
		<div className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
			<div className="flex justify-between items-start">
				<h2 className="text-xl font-bold text-gray-800">
					{task.title}
				</h2>
				<span
					className={`px-3 py-1 text-xs font-semibold text-white rounded-full ${
						task.completed ? 'bg-green-500' : 'bg-red-500'
					}`}
				>
					{task.completed ? 'Completed' : 'Pending'}
				</span>
			</div>
			<p className="text-gray-600 mt-2">
				Deadline:{' '}
				<span className="font-medium">{formattedDeadline}</span>
			</p>
			<DeleteTaskButton taskId={task.id} />
		</div>
	);
};

export default Task;
