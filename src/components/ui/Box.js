const Box = ({ children, heading }) => {
	return (
		<div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
			<div>
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					{heading}
				</h2>
			</div>
			{children}
		</div>
	);
};

export default Box;
