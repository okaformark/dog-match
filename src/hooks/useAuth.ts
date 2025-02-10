import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

interface SignInForm {
	name: string;
	email: string;
}

export function useAuth() {
	const navigate = useNavigate();

	const signInMutation = useMutation({
		mutationFn: async (data: SignInForm) => {
			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
				credentials: 'include',
			});

			if (!response.ok) {
				const errorData = (await response.headers
					.get('content-type')
					?.includes('application/json'))
					? await response.json()
					: null;
				throw new Error(errorData?.message || 'Sign in failed');
			}

			// Verify the auth cookie is set
			const cookies = document.cookie.split(';');
			console.log(cookies);
			return response.ok;
		},
		onSuccess: () => {
			navigate('/home');
		},
	});

	const logoutMutation = useMutation({
		mutationFn: async () => {
			const response = await fetch('/auth/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Logout failed');
			}

			// Clear the auth cookie if it exists
			document.cookie = 'fetch-access-token=; max-age=0; path=/;';

			return response;
		},
		onSuccess: () => {
			navigate('/signin');
		},
	});

	return {
		signInMutation,
		logoutMutation,
	};
}

export type { SignInForm };
