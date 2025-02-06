import { useQuery } from '@tanstack/react-query';

export function useBreeds() {
	return useQuery<string[]>({
		queryKey: ['breeds'],
		queryFn: async () => {
			const response = await fetch('/dogs/breeds', {
				credentials: 'include',
			});
			if (!response.ok) {
				throw new Error('Failed to fetch breeds');
			}
			return response.json();
		},
	});
}
