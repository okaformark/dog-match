import { useState } from 'react';
import { useAuth, SignInForm } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
	const [formData, setFormData] = useState<SignInForm>({
		name: '',
		email: '',
	});

	const { signInMutation } = useAuth();
	const navigate = useNavigate();

	console.log(signInMutation.data);
	console.log(signInMutation.error);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		console.log('Form update:', name, value);
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Submitting form data:', formData);
		signInMutation.mutate(formData, {
			onSuccess: () => navigate('/home'),
		});
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50'>
			<div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
				<div>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
						Sign in to your account
					</h2>
				</div>
				<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					<div className='rounded-md shadow-sm space-y-4'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700'
							>
								Name
							</label>
							<input
								id='name'
								name='name'
								type='text'
								required
								className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								value={formData.name}
								onChange={handleChange}
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Email address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								required
								className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div>
						<button
							type='submit'
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							disabled={signInMutation.isPending}
						>
							{signInMutation.isPending ? 'Signing in...' : 'Sign in'}
						</button>
					</div>

					{signInMutation.isError && (
						<div className='text-red-500 text-sm text-center'>
							Sign in failed. Please try again.
						</div>
					)}
				</form>
			</div>
		</div>
	);
}
