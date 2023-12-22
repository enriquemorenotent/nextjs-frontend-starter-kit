import React from 'react';
import Task from './Task';

const TaskList = ({ tasks }) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{tasks.map((task, index) => (
			<Task key={index} task={task} />
		))}
	</div>
);

export default TaskList;
