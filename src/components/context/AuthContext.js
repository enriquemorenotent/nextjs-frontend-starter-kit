'use client';

import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true); // State to track loading status
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);
	const [email, setEmail] = useState(null);
	const [userRole, setUserRole] = useState(null);
	const [authError, setAuthError] = useState(null); // New state for handling auth errors

	const checkAuthStatus = async () => {
		try {
			const response = await fetch('http://localhost:3001/v1/auth/me', {
				method: 'GET',
				credentials: 'include', // Important to include HTTP-only cookies
			});

			if (!response.ok) {
				throw new Error('Not authenticated');
			}

			const userData = await response.json();
			setIsLoggedIn(true);
			setUserId(userData.userId);
			setEmail(userData.email);
			// Set other user data as needed
		} catch (error) {
			console.error('Auth check error:', error);
		} finally {
			setIsLoading(false); // Set loading to false after the check
		}
	};

	useEffect(() => {
		console.log('Checking auth status');
		checkAuthStatus();
	}, []);

	// Login function
	const login = async (email, password) => {
		try {
			const response = await fetch(
				'http://localhost:3001/v1/auth/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
					credentials: 'include', // Add this line
				}
			);

			if (!response.ok) {
				throw new Error('Login failed');
			}

			const data = await response.json();
			setIsLoggedIn(true);
			setUserId(data.userId);
			setEmail(email);
			// Additional user information can be set here if needed
			setAuthError(null); // Reset any previous errors
		} catch (error) {
			console.error('Login error:', error);
			setAuthError(error.message);
		}
	};

	// Register function
	const register = async (email, password) => {
		try {
			const response = await fetch(
				'http://localhost:3001/v1/auth/register',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
					credentials: 'include', // Add this line
				}
			);

			if (!response.ok) {
				throw new Error('Registration failed');
			}

			const data = await response.json();
			setIsLoggedIn(true);
			setUserId(data.userId);
			setEmail(email);
			// Additional user information can be set here if needed
			setAuthError(null); // Reset any previous errors
		} catch (error) {
			console.error('Registration error:', error);
			setAuthError(error.message);
		}
	};

	// Logout function
	// Logout function
	const logout = async () => {
		try {
			const response = await fetch(
				'http://localhost:3001/v1/auth/logout',
				{
					method: 'POST',
					credentials: 'include', // Important to include HTTP-only cookies
				}
			);

			if (!response.ok) {
				throw new Error('Logout failed');
			}

			setIsLoggedIn(false);
			setUserId(null);
			setEmail(null);
			setUserRole(null);
			setAuthError(null); // Reset any auth errors on logout
		} catch (error) {
			console.error('Logout error:', error);
			setAuthError(error.message);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				userId,
				email,
				userRole,
				authError, // Expose the auth error for use in components
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
