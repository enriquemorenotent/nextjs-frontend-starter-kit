'use client';

import { AuthContext } from '@/components/context/AuthContext';
import Box from '@/components/ui/Box';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useContext, useState } from 'react';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({ email: '', password: '' });

	const { login } = useContext(AuthContext);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		let isValid = true;
		let errors = { email: '', password: '' };

		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			isValid = false;
			errors.email = 'Please enter a valid email.';
		}

		if (!password || password.length < 8) {
			isValid = false;
			errors.password = 'Password must be at least 8 characters.';
		}

		if (isValid) {
			login(email, password);
		} else {
			setErrors(errors);
		}
	};

	return (
		<div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<Box heading="Sign in to your account">
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<Input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								placeholder="Email address"
								value={email}
								onChange={handleEmailChange}
							/>
							{errors.email && (
								<p className="text-red-500 text-xs italic">
									{errors.email}
								</p>
							)}
						</div>
						<div>
							<Input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								placeholder="Password"
								value={password}
								onChange={handlePasswordChange}
							/>
							{errors.password && (
								<p className="text-red-500 text-xs italic">
									{errors.password}
								</p>
							)}
						</div>
					</div>

					<div>
						<Button type="submit">Sign in</Button>
					</div>
				</form>
			</Box>
		</div>
	);
};

export default Login;
