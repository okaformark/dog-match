import { useMutation } from '@tanstack/react-query';

interface Match {
	match: string;
}

export function useMatch() {

	return useMutation({
		mutationFn: async (dogIds: string[]): Promise<Match> => {
			const response = await fetch('/dogs/match', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(dogIds),
			});

			if (!response.ok) {
				throw new Error('Failed to find match');
			}

			return response.json();
		},
	});
}
