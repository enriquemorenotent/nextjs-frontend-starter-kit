import React from 'react';

const Input = ({
	id,
	name,
	type,
	autoComplete,
	required,
	placeholder,
	value,
	onChange,
	error,
}) => {
	return (
		<div>
			<label htmlFor={id} className="sr-only">
				{placeholder}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				autoComplete={autoComplete}
				required={required}
				className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
				placeholder={placeholder}
				value={value === null ? '' : value}
				onChange={onChange}
			/>
			{error && <p className="text-red-500 text-xs italic">{error}</p>}
		</div>
	);
};

export default Input;
