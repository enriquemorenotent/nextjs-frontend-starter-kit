'use client';

import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState(null);
	const [email, setEmail] = useState(null);
	const [userRole, setUserRole] = useState(null);

	// Login function
	const login = async (email, password) => {
		setIsLoggedIn(true);
		setUserId(/* Extracted user ID */);
		setEmail(email);
	};

	// Register function
	const register = async (email, password) => {
		setIsLoggedIn(true);
		setUserId(/* Extracted user ID */);
		setEmail(email);
	};

	const logout = () => {
		setIsLoggedIn(false);
		setUserId(null);
		setEmail(null);
		setUserRole(null);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				userId,
				email,
				userRole,
				login,
				register,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
