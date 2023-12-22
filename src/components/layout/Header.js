'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/components/context/AuthContext';

const Header = () => {
	const { isLoggedIn, logout } = useContext(AuthContext);

	return (
		<header className="bg-gray-800 text-white">
			<div className="container mx-auto flex justify-between items-center py-4">
				<div>
					<h1 className="text-2xl font-bold">Bootstrap Webapp FE</h1>
				</div>
				<div>
					{isLoggedIn ? (
						<>
							<Link href="/profile" className="text-white mr-4">
								Profile
							</Link>
							<button onClick={logout} className="text-white">
								Logout
							</button>
						</>
					) : (
						<>
							<Link href="/login" className="text-white mr-4">
								Login
							</Link>
							<Link href="/register" className="text-white">
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
