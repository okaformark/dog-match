import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Welcome() {
	const navigate = useNavigate();
	const { logoutMutation } = useAuth();

	const handleLogout = () => {
		logoutMutation.mutate(undefined, {
			onSuccess: () => navigate('/signin'),
		});
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
				<div className='space-y-6'>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Welcome!
					</h2>
					<button
						onClick={handleLogout}
						className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
						disabled={logoutMutation.isPending}
					>
						{logoutMutation.isPending ? 'Logging out...' : 'Logout'}
					</button>
					{logoutMutation.isError && (
						<div className='text-red-500 text-sm text-center'>
							Logout failed. Please try again.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
