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
				</div>
			</div>
		</div>
	);
}
